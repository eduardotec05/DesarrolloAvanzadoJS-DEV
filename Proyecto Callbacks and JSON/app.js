// Datos iniciales de libros en formato JSON
let biblioteca = {
    libros: [
      {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        genero: "Realismo mágico",
        disponible: true,
      },
      {
        titulo: "1984",
        autor: "George Orwell",
        genero: "Distopía",
        disponible: true,
      },
    ],
  };
  
  // Función para simular la lectura de datos
  function leerDatos(callback) {
    setTimeout(() => {
      callback(null, biblioteca);
    }, 1000);
  }
  
  // Función para simular la escritura de datos
  function escribirDatos(nuevosDatos, callback) {
    setTimeout(() => {
      biblioteca = nuevosDatos;
      callback(null);
    }, 1000);
  }
  
  // Función para mostrar todos los libros en consola
  function mostrarLibros() {
    leerDatos((error, datos) => {
      if (error) {
        console.error("Error al leer los datos:", error);
        return;
      }
      console.log("\nInventario de libros:");
      datos.libros.forEach((libro, index) => {
        console.log(
          `${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.genero}) [${
            libro.disponible ? "Disponible" : "Prestado"
          }]`
        );
      });
      console.log(""); 
    });
  }
  
  // Función para agregar un nuevo libro
  function agregarLibro(titulo, autor, genero, disponible, callback) {
    leerDatos((error, datos) => {
      if (error) {
        callback(error);
        return;
      }
  
      // Validar si el libro ya existe
      const libroExistente = datos.libros.find(
        (libro) => libro.titulo.toLowerCase() === titulo.toLowerCase()
      );
      if (libroExistente) {
        callback(new Error(`El libro "${titulo}" ya existe en la biblioteca.`));
        return;
      }
  
      const nuevoLibro = { titulo, autor, genero, disponible };
      const nuevosDatos = {
        libros: [...datos.libros, nuevoLibro],
      };
  
      escribirDatos(nuevosDatos, (error) => {
        if (error) {
          callback(error);
          return;
        }
        console.log(`Libro agregado: ${titulo} - ${autor}`);
        callback(null);
      });
    });
  }
  
  // Función para cambiar la disponibilidad de un libro
  function actualizarDisponibilidad(titulo, nuevoEstado, callback) {
    leerDatos((error, datos) => {
      if (error) {
        callback(error);
        return;
      }
  
      const libroIndex = datos.libros.findIndex(
        (libro) => libro.titulo.toLowerCase() === titulo.toLowerCase()
      );
  
      if (libroIndex === -1) {
        callback(new Error(`Libro "${titulo}" no encontrado.`));
        return;
      }
  
      const nuevosDatos = JSON.parse(JSON.stringify(datos)); 
      nuevosDatos.libros[libroIndex].disponible = nuevoEstado;
  
      escribirDatos(nuevosDatos, (error) => {
        if (error) {
          callback(error);
          return;
        }
        console.log(
          `Disponibilidad de "${titulo}" actualizada a: ${
            nuevoEstado ? "Disponible" : "Prestado"
          }`
        );
        callback(null);
      });
    });
  }
  
  // Ejemplo de uso
  function ejecutarEjemplo() {
    mostrarLibros();
  
    agregarLibro(
      "El principito",
      "Antoine de Saint-Exupéry",
      "Fábula",
      true,
      (error) => {
        if (error) {
          console.error(error.message);
          return;
        }
        mostrarLibros();
      }
    );
  
    agregarLibro(
      "El gran Gatsby",
      "F. Scott Fitzgerald",
      "Novela",
      true,
      (error) => {
        if (error) {
          console.error(error.message);
          return;
        }
        mostrarLibros();
  
        actualizarDisponibilidad("1984", false, (error) => {
          if (error) {
            console.error(error.message);
            return;
          }
          mostrarLibros();
        });
      }
    );
  }
  
  ejecutarEjemplo();