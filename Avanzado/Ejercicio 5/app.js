const form =
  document.getElementById("eventForm");

form.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();
    clearErrors();

    let isValid = true;
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

    if (name.length < 3) {

      showError(
        "nameError",
        "El nombre debe tener mínimo 3 caracteres"
      );

      isValid = false;
    }
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      showError(
        "emailError",
        "Ingresa un correo válido"
      );

      isValid = false;
    }

    if (age < 18 || age > 100) {

      showError(
        "ageError",
        "La edad debe estar entre 18 y 100 años"
      );

      isValid = false;
    }

    if (interests.length === 0) {

      showError(
        "interestError",
        "Selecciona al menos un interés"
      );

      isValid = false;
    }

    if (schedule === "") {

      showError(
        "scheduleError",
        "Selecciona un horario"
      );

      isValid = false;
    }

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

    if (isValid) {

      alert(
        "Registro enviado correctamente"
      );

      form.reset();
    }

  }
);

function showError(id, message) {

  document.getElementById(id).textContent =
    message;
}

function clearErrors() {

  const errors =
    document.querySelectorAll(".error");

  errors.forEach(error => {
    error.textContent = "";
  });

}