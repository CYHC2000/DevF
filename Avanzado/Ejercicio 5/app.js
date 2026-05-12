const form =
  document.getElementById("eventForm");

form.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    // Limpiar errores
    clearErrors();

    let isValid = true;

    // =========================
    // Obtener valores
    // =========================

    const name =
      document.getElementById("name").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const age =
      document.getElementById("age").value.trim();

    const schedule =
      document.getElementById("schedule").value;

    const documentFile =
      document.getElementById("document").files[0];

    const interests =
      document.querySelectorAll(
        'input[name="interest"]:checked'
      );

    // =========================
    // VALIDACIÓN 1
    // Nombre mínimo 3 letras
    // =========================

    if (name.length < 3) {

      showError(
        "nameError",
        "El nombre debe tener mínimo 3 caracteres"
      );

      isValid = false;
    }

    // =========================
    // VALIDACIÓN 2
    // Email válido
    // =========================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      showError(
        "emailError",
        "Ingresa un correo válido"
      );

      isValid = false;
    }

    // =========================
    // VALIDACIÓN 3
    // Edad mínima
    // =========================

    if (age < 18 || age > 100) {

      showError(
        "ageError",
        "La edad debe estar entre 18 y 100 años"
      );

      isValid = false;
    }

    // =========================
    // VALIDACIÓN 4
    // Seleccionar intereses
    // =========================

    if (interests.length === 0) {

      showError(
        "interestError",
        "Selecciona al menos un interés"
      );

      isValid = false;
    }

    // =========================
    // VALIDACIÓN 5
    // Seleccionar horario
    // =========================

    if (schedule === "") {

      showError(
        "scheduleError",
        "Selecciona un horario"
      );

      isValid = false;
    }

    // =========================
    // VALIDACIÓN 6
    // Validar archivo
    // =========================

    if (documentFile) {

      const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg"
      ];

      if (
        !allowedTypes.includes(
          documentFile.type
        )
      ) {

        showError(
          "documentError",
          "Solo se permiten PDF, PNG o JPG"
        );

        isValid = false;
      }

    }

    // =========================
    // Resultado final
    // =========================

    if (isValid) {

      alert(
        "Registro enviado correctamente"
      );

      form.reset();
    }

  }
);


// =============================
// Mostrar errores
// =============================

function showError(id, message) {

  document.getElementById(id).textContent =
    message;
}


// =============================
// Limpiar errores
// =============================

function clearErrors() {

  const errors =
    document.querySelectorAll(".error");

  errors.forEach(error => {
    error.textContent = "";
  });

}