
function formatoTabla(planetas) {
    let tabla = "+----------------+--------------------------------+----------------+----------------+\n";
    tabla += "| Nombre         | Descripción                     | Tipo           | Distancia      |\n";
    tabla += "+----------------+--------------------------------+----------------+----------------+\n";
    
    planetas.forEach(planeta => {
      tabla += `| ${planeta.nombre.padEnd(14)} | ${planeta.descripcion.substring(0, 30).padEnd(30)} | ${planeta.tipo.padEnd(14)} | ${planeta.distanciaTierra.padEnd(14)} |\n`;
    });
    
    tabla += "+----------------+--------------------------------+----------------+----------------+";
    return tabla;
  }
  
  function formatoLista(planetas) {
    return planetas.map(planeta => {
      return `${planeta.imagen} ${planeta.nombre} (${planeta.tipo})
     📅 Descubierto en: ${planeta.descubiertoEn}
     📏 Distancia de la Tierra: ${planeta.distanciaTierra}
     📝 ${planeta.descripcion}`;
    }).join('\n\n');
  }
  
  module.exports = {
    formatoTabla,
    formatoLista
  };