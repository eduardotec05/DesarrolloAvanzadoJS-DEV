// agregarPlaneta.js
const fs = require('fs');
const path = require('path');
const planetas = require('./planetas');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const preguntas = [
  "Nombre del planeta: ",
  "Descripción: ",
  "Año de descubrimiento: ",
  "Tipo (Planeta/Luna/Exoplaneta): ",
  "Distancia de la Tierra: ",
  "Emoji representativo: "
];

function hacerPregunta(i, respuestas = []) {
  if (i < preguntas.length) {
    readline.question(preguntas[i], (respuesta) => {
      respuestas.push(respuesta);
      hacerPregunta(i + 1, respuestas);
    });
  } else {
    const nuevoPlaneta = {
      nombre: respuestas[0],
      descripcion: respuestas[1],
      descubiertoEn: respuestas[2],
      tipo: respuestas[3],
      distanciaTierra: respuestas[4],
      imagen: respuestas[5]
    };

    planetas.push(nuevoPlaneta);
    
    fs.writeFileSync(
      path.join(__dirname, 'planetas.js'),
      `const planetas = ${JSON.stringify(planetas, null, 2)};\n\nmodule.exports = planetas;`
    );
    
    console.log("\n¡Planeta agregado con éxito! 🎉");
    console.log("Total de planetas registrados:", planetas.length);
    readline.close();
  }
}

console.log("🪐 Registro de Nuevo Planeta 🪐");
hacerPregunta(0);