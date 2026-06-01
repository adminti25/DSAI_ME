document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const flipArrow = document.getElementById("flip-arrow");
  const acceptCheckbox = document.getElementById("acceptTerms");
  const btnContinuar = document.getElementById("btnContinuar");
  const btnDescargarPDF = document.getElementById("btnDescargarPDF");

  // Flip solo con flecha
  if (flipArrow) {
    flipArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.toggle("flipped");
    });
  }

  // Checkbox → habilita Continuar
  acceptCheckbox.addEventListener("change", () => {
    btnContinuar.disabled = !acceptCheckbox.checked;
    btnContinuar.classList.toggle("enabled", acceptCheckbox.checked);
  });

  // Continuar → habilita Descargar PDF
  btnContinuar.addEventListener("click", () => {
    btnDescargarPDF.disabled = false;
    btnDescargarPDF.classList.add("enabled");
  });

  // ==================== DESCARGAR PDF CORREGIDO ====================
  btnDescargarPDF.addEventListener("click", () => {
    const empleado = document.getElementById("empleado").value.trim() || "Empleado";

    // Cambiar título temporalmente
    const originalTitle = document.title;
    document.title = `Membresía Empresarial - ${empleado}`;

    // Preparar la vista para impresión
    const front = document.querySelector('.card-front');
    const back = document.querySelector('.card-back');

    // Forzar visibilidad y estilos
    front.style.visibility = "visible";
    back.style.visibility = "visible";

    // Ocultar elementos no deseados
    document.querySelectorAll('.flip-arrow, .footer, #btnContinuar, #btnDescargarPDF, .accept-terms, .qr-container').forEach(el => {
      el.style.display = 'none';
    });

    // Ejecutar impresión
    setTimeout(() => {
      window.print();
    }, 300);

    // Restaurar después de imprimir
    setTimeout(() => {
      document.title = originalTitle;
      document.querySelectorAll('.flip-arrow, .footer, #btnContinuar, #btnDescargarPDF, .accept-terms, .qr-container').forEach(el => {
        el.style.display = '';
      });
    }, 1500);
  });
});