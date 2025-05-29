// Configuración inicial
const MESAS_DISPONIBLES = 10; // Total de mesas en el restaurante
const mesasReservadas = 6; // Mesas ya reservadas (simuladas)
const mesasDisponibles = MESAS_DISPONIBLES - mesasReservadas;

// Función para verificar disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mesasSolicitadas <= mesasDisponibles) {
        resolve(`¡Disponibilidad confirmada! Mesas reservadas: ${mesasSolicitadas}`);
      } else {
        reject(new Error(`Lo sentimos, solo tenemos ${mesasDisponibles} mesas disponibles.`));
      }
    }, 1000); 
  });
}

// Función para enviar confirmación por correo
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.3; // 70% de probabilidad de éxito
      
      if (exito) {
        resolve(`Correo de confirmación enviado a ${nombreCliente}`);
      } else {
        reject(new Error("Error al enviar el correo de confirmación. Por favor intente nuevamente."));
      }
    }, 1500); // Simulamos un retraso de 1.5 segundos
  });
}

// 3. Función principal para hacer reserva con async/await
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  try {
    console.log(`Procesando reserva para ${nombreCliente}...`);
    
    // Verificar disponibilidad
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
    console.log(disponibilidad);
    
    // Enviar confirmación
    const confirmacion = await enviarConfirmacionReserva(nombreCliente);
    console.log(confirmacion);
    
    console.log(`Reserva completada con éxito para ${nombreCliente}`);
    return { success: true, message: "Reserva exitosa" };
    
  } catch (error) {
    console.error(`Error en la reserva: ${error.message}`);
    return { success: false, message: error.message };
  }
}

// 4. Pruebas del sistema
async function probarSistema() {
  console.log("--- Prueba 1: Reserva exitosa ---");
  await hacerReserva("Juan Pérez", 3);
  
  console.log("\n--- Prueba 2: Mesas insuficientes ---");
  await hacerReserva("María García", 5);
  
  console.log("\n--- Prueba 3: Error en envío de correo ---");
  // Hacemos múltiples intentos para forzar un error en el correo
  for (let i = 0; i < 3; i++) {
    const resultado = await hacerReserva("Carlos López", 2);
    if (resultado.success) break;
  }
}

// Ejecutar pruebas
probarSistema();