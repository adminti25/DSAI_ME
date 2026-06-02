document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const flipArrow = document.getElementById("flip-arrow");
  const acceptCheckbox = document.getElementById("acceptTerms");
  const btnContinuar = document.getElementById("btnContinuar");
  const btnDescargarPDF = document.getElementById("btnDescargarPDF");
  const modal = document.getElementById("termsModal");
  const modalBody = document.getElementById("modal-body");
  const btnAceptar = document.getElementById("btnAceptar");
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

    // ←←← CAMBIA ESTA URL CUANDO TENGAS TU NGROK ACTIVO ←←←
    const urlBackend = "https://frown-uneven-uptake.ngrok-free.dev/membresia/registro";

    try {
      const respuesta = await fetch(urlBackend, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
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

  // ==================== MODAL (AVISO.HTML) ====================
  document.querySelectorAll("#openTerms, #openPrivacy, #footerTerms, #footerPrivacy").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      modalBody.innerHTML = '<iframe src="aviso.html" width="100%" height="500px" style="border:none;"></iframe>';
      modal.style.display = "block";
    });
  });

  btnAceptar.addEventListener("click", () => {
    modal.style.display = "none";
    acceptCheckbox.checked = true;
    btnContinuar.classList.add("enabled");
    btnContinuar.disabled = false;
  });

  closeModal.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // ==================== DESCARGAR PDF ====================
  btnDescargarPDF.addEventListener("click", () => {
    window.print();
  });
});