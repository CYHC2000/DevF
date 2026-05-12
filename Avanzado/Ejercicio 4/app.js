// ===============================
// Mesas disponibles en restaurante
// ===============================

let mesasDisponibles = 5;


// ===============================
// Verificar disponibilidad
// ===============================

function verificarDisponibilidad(
  mesasSolicitadas
) {

  return new Promise((resolve, reject) => {

    console.log(
      "Verificando disponibilidad..."
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
          `No hay suficientes mesas disponibles`
        );

      }

    }, 2000);

  });

}


// ===============================
// Simular envío de correo
// ===============================

function enviarConfirmacionReserva(
  nombreCliente
) {

  return new Promise((resolve, reject) => {

    console.log(
      "Enviando correo de confirmación..."
    );

    setTimeout(() => {

      // Simulación aleatoria
      const envioExitoso =
        Math.random() > 0.3;

      if (envioExitoso) {

        resolve(
          `Correo enviado correctamente a ${nombreCliente}`
        );

      } else {

        reject(
          `Error al enviar el correo`
        );

      }

    }, 1500);

  });

}


// ===============================
// Función principal
// ===============================

async function hacerReserva(
  nombreCliente,
  mesasSolicitadas
) {

  try {

    console.log(`
========================
Nueva reserva
Cliente: ${nombreCliente}
========================
    `);

    // 1. Verificar mesas
    const disponibilidad =
      await verificarDisponibilidad(
        mesasSolicitadas
      );

    console.log(disponibilidad);

    // Descontar mesas
    mesasDisponibles -= mesasSolicitadas;

    console.log(
      `Reserva confirmada para ${nombreCliente}`
    );

    console.log(
      `Mesas restantes: ${mesasDisponibles}`
    );

    // 2. Enviar correo
    const correo =
      await enviarConfirmacionReserva(
        nombreCliente
      );

    console.log(correo);

  } catch (error) {

    console.error(`
ERROR:
${error}
    `);

  }

}


// ===============================
// Pruebas
// ===============================

// Reserva válida
hacerReserva("Carlos", 2);

// Reserva válida
hacerReserva("Ana", 1);

// Reserva inválida
hacerReserva("Luis", 10);