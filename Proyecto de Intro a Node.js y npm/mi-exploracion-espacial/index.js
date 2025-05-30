// index.js
const planetas = require('./planetas');
const { formatoTabla, formatoLista } = require('./utils/formatos');
const cowsay = require('cowsay');

// Mostrar planetas en formato tabla
console.log("\n📡 Reporte de Planetas (Formato Tabla)");
console.log(formatoTabla(planetas));

// Mostrar planetas en formato lista
console.log("\n📡 Reporte de Planetas (Formato Lista)");
console.log(formatoLista(planetas));

// Mostrar con cowsay
console.log("\n🐮 Reporte Especial con Cowsay");
console.log(cowsay.say({
  text: `¡Exploración completada!\nDescubrimos ${planetas.length} cuerpos celestes.`,
  e: "oO",
  T: "U "
}));

// Exportar para posibles tests
module.exports = {
  mostrarPlanetas: () => {
    console.log(formatoTabla(planetas));
  }
};