import { z } from "https://cdn.skypack.dev/zod";

const form =
  document.getElementById("registerForm");

const errorsContainer =
  document.getElementById("errors");

const userSchema = z.object({

  name: z
    .string()
    .min(3, {
      message:
        "El nombre debe tener mínimo 3 caracteres"
    }),

  email: z
    .string()
    .email({
      message:
        "Correo electrónico inválido"
    }),

  password: z
    .string()
    .min(8, {
      message:
        "La contraseña debe tener mínimo 8 caracteres"
    })
    .regex(/[A-Z]/, {
      message:
        "La contraseña debe contener al menos una mayúscula"
    })
    .regex(/[0-9]/, {
      message:
        "La contraseña debe contener al menos un número"
    })

});


form.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

/*     // Limpiar errores
    errorsContainer.innerHTML = ""; */

    // Obtener datos
    const formData = {

      name:
        document.getElementById("name")
          .value,

      email:
        document.getElementById("email")
          .value,

      password:
        document.getElementById("password")
          .value

    };

    // Validación
    const result =
      userSchema.safeParse(formData);

    // Si hay errores
    if (!result.success) {

      result.error.issues.forEach(error => {

        const errorMessage =
          document.createElement("p");

        errorMessage.classList.add(
          "error-message"
        );

        errorMessage.textContent =
          error.message;

        errorsContainer.appendChild(
          errorMessage
        );

      });

      return;
    }

    // Éxito
    alert(
      "Formulario validado correctamente"
    );

    form.reset();

  }
);