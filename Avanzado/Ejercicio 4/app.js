let mesasDisponibles = Math.floor(Math.random() * 20 + 1);

const formReserva =
  document.getElementById(
    "formReserva"
  );

const resultado =
  document.getElementById(
    "resultado"
  );

const mesasHTML =
  document.getElementById(
    "mesasDisponibles"
  );


function mostrarMensaje(
  mensaje,
  tipo = "info"
) {

  const div =
    document.createElement("div");

  div.classList.add(
    "log",
    tipo
  );

  div.textContent = mensaje;

  resultado.prepend(div);

}


function verificarDisponibilidad(
  mesasSolicitadas
) {

  return new Promise((resolve, reject) => {

    mostrarMensaje(
      "Verificando disponibilidad...",
      "info"
    );

    setTimeout(() => {

      if (
        mesasSolicitadas <= mesasDisponibles
      ) {

        resolve(
          `Mesas disponibles para ${mesasSolicitadas} personas`
        );

      } else {

        reject(
          "No hay suficientes mesas disponibles"
        );

      }

    }, 2000);

  });

}

function enviarConfirmacionReserva(
  nombreCliente
) {

  return new Promise((resolve, reject) => {

    mostrarMensaje(
      "Enviando correo de confirmación...",
      "info"
    );

    setTimeout(() => {

      const envioExitoso =
        Math.random() > 0.3;

      if (envioExitoso) {

        resolve(
          `Correo enviado correctamente a ${nombreCliente}`
        );

      } else {

        reject(
          "Error al enviar el correo"
        );

      }

    }, 1500);

  });

}

async function hacerReserva(
  nombreCliente,
  mesasSolicitadas
) {

  try {

    mostrarMensaje(
      `Nueva reserva para ${nombreCliente}`,
      "info"
    );

    // Verificar mesas
    const disponibilidad =
      await verificarDisponibilidad(
        mesasSolicitadas
      );

    mostrarMensaje(
      disponibilidad,
      "success"
    );

    mesasDisponibles -=
      mesasSolicitadas;

    mostrarMensaje(
      `Reserva confirmada para ${nombreCliente}`,
      "success"
    );

    mostrarMensaje(
      `Mesas restantes: ${mesasDisponibles}`,
      "info"
    );

    const correo =
      await enviarConfirmacionReserva(
        nombreCliente
      );

    mostrarMensaje(
      correo,
      "success"
    );

  } catch (error) {

    mostrarMensaje(
      error,
      "error"
    );

  }

}


formReserva.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const nombre =
      document.getElementById(
        "nombre"
      ).value;

    const correo =
      Number(
        document.getElementById(
          "correo"
        ).value
      );

    const mesas =
      Number(
        document.getElementById(
          "mesas"
        ).value
      );

    await hacerReserva(
      nombre,
      correo,
      mesas
    );

    formReserva.reset();

  }
);

actualizarMesas();