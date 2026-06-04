document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const flipArrow = document.getElementById("flip-arrow");
  const acceptCheckbox = document.getElementById("acceptTerms");
  const btnContinuar = document.getElementById("btnContinuar");
  const btnDescargarPDF = document.getElementById("btnDescargarPDF");
  
  // Modal elements
  const modal = document.getElementById("termsModal");
  const modalBody = document.getElementById("modal-body");
  const modalDownloadContainer = document.getElementById("modal-download-container");
  const btnDescargarDesdeModal = document.getElementById("btnDescargarDesdeModal");
  const closeModal = document.querySelector(".close-modal");

  // ==================== FLIP DE LA TARJETA ====================
  if (flipArrow) {
    flipArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.toggle("flipped");
    });
  }

  // ==================== CHECKBOX TÉRMINOS ====================
  acceptCheckbox.addEventListener("change", () => {
    if (acceptCheckbox.checked) {
      btnContinuar.classList.add("enabled");
      btnContinuar.disabled = false;
    } else {
      btnContinuar.classList.remove("enabled");
      btnContinuar.disabled = true;
    }
  });

  // ==================== CONTINUAR + ENVIAR A FASTAPI ====================
  btnContinuar.addEventListener("click", async (e) => {
    e.preventDefault();

    const datosMembresia = {
      empresa: document.getElementById("empresa").value.trim(),
      empleado: document.getElementById("empleado").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      correo: document.getElementById("correo").value.trim()
    };

    const urlBackend = "https://frown-uneven-uptake.ngrok-free.dev/membresia/registro";

    try {
      const respuesta = await fetch(urlBackend, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(datosMembresia)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        console.log("Registro exitoso:", resultado);
        btnDescargarPDF.disabled = false;
        btnDescargarPDF.classList.add("enabled");
        alert("¡Registro guardado correctamente en la base de datos!\n\nYa puedes descargar tu tarjeta.");
      } else {
        console.error("Error del servidor:", resultado);
        alert("Error: " + (resultado.detail || "No se pudo registrar el usuario."));
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión con el servidor.\nVerifica que Ngrok esté activo.");
    }
  });

  // ==================== MODAL (TÉRMINOS + TARJETA EMPRESARIAL) ====================

  // Abrir Aviso de Privacidad o Términos
  document.querySelectorAll("#openTerms, #openPrivacy, #footerTerms, #footerPrivacy").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      modalBody.innerHTML = '<iframe src="aviso.html" width="100%" height="520px" style="border:none;"></iframe>';
      modalDownloadContainer.style.display = "none";
      modal.style.display = "block";
    });
  });

  // NUEVO: Abrir Tarjeta Empresarial en Popup
  const btnVerTarjeta = document.getElementById("btnVerTarjeta");
  if (btnVerTarjeta) {
    btnVerTarjeta.addEventListener("click", () => {
      const empresa = document.getElementById("empresa").value.trim() || "Nombre de la Empresa";
      const empleado = document.getElementById("empleado").value.trim() || "Nombre del Empleado";

      modalBody.innerHTML = `
        <iframe id="tarjetaFrame" 
                src="tme.html?empresa=${encodeURIComponent(empresa)}&empleado=${encodeURIComponent(empleado)}" 
                width="100%" 
                height="580px" 
                style="border:none; border-radius: 12px;">
        </iframe>
      `;

      modalDownloadContainer.style.display = "block";
      modal.style.display = "block";
    });
  }

  // Descargar como JPG desde el modal
  btnDescargarDesdeModal.addEventListener("click", () => {
  const iframe = document.getElementById("tarjetaFrame");
  if (iframe && iframe.contentWindow && typeof iframe.contentWindow.descargarComoJPG === "function") {
    iframe.contentWindow.descargarComoJPG();
  } else {
    alert("La tarjeta aún se está cargando. Inténtalo de nuevo en unos segundos.");
  }
});

  // Cerrar modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // ==================== BOTÓN DESCARGAR PDF ORIGINAL (opcional) ====================
  btnDescargarPDF.addEventListener("click", () => {
    // Opción 1: Imprimir directamente (comportamiento anterior)
    // window.print();

    // Opción 2: Abrir en popup (recomendado)
    const btnVerTarjeta = document.getElementById("btnVerTarjeta");
    if (btnVerTarjeta) btnVerTarjeta.click();
  });
});
