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

  // Flip solo con flecha
  if (flipArrow) {
    flipArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.toggle("flipped");
    });
  }

  // Checkbox
  acceptCheckbox.addEventListener("change", () => {
    if (acceptCheckbox.checked) {
      btnContinuar.classList.add("enabled");
      btnContinuar.disabled = false;
    } else {
      btnContinuar.classList.remove("enabled");
      btnContinuar.disabled = true;
    }
  });

  // Continuar
  btnContinuar.addEventListener("click", () => {
    btnDescargarPDF.disabled = false;
    btnDescargarPDF.classList.add("enabled");
  });

  // Modal
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

  // Descargar PDF
  btnDescargarPDF.addEventListener("click", () => {
    window.print();
  });
});