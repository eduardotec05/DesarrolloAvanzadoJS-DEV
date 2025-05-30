document.addEventListener('DOMContentLoaded', function() {
    const { z } = window.Zod;
    const form = document.getElementById('registerForm');
  
    // Esquema de validación con Zod
    const registerSchema = z.object({
      name: z.string()
        .min(1, { message: "El nombre es requerido" })
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
        .max(50, { message: "El nombre no puede exceder 50 caracteres" })
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { 
          message: "El nombre solo puede contener letras y espacios" 
        }),
      
      email: z.string()
        .min(1, { message: "El correo electrónico es requerido" })
        .email({ message: "Correo electrónico no válido" }),
      
      password: z.string()
        .min(1, { message: "La contraseña es requerida" })
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(20, { message: "La contraseña no puede exceder 20 caracteres" })
        .regex(/[A-Z]/, { 
          message: "La contraseña debe contener al menos una mayúscula" 
        })
        .regex(/[0-9]/, { 
          message: "La contraseña debe contener al menos un número" 
        })
    });
  
    // Validación en tiempo real
    document.getElementById('name').addEventListener('input', validateField);
    document.getElementById('email').addEventListener('input', validateField);
    document.getElementById('password').addEventListener('input', validateField);
  
    // Envío del formulario
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value
      };
  
      // Validar todos los campos
      const result = registerSchema.safeParse(formData);
      
      if (result.success) {
        // Simular envío exitoso
        alert('¡Registro exitoso!\n\n' + 
              `Nombre: ${formData.name}\n` +
              `Email: ${formData.email}`);
        form.reset();
        clearErrors();
      } else {
        // Mostrar errores
        displayErrors(result.error);
      }
    });
  
    // Función para validación en tiempo real
    function validateField(event) {
      const field = event.target;
      const fieldName = field.id;
      const value = field.value.trim();
      
      // Crear objeto temporal para validar solo este campo
      const tempData = { 
        name: fieldName === 'name' ? value : 'temp', 
        email: fieldName === 'email' ? value : 'temp@test.com', 
        password: fieldName === 'password' ? value : 'Temp123' 
      };
      
      const result = registerSchema.safeParse(tempData);
      
      if (fieldName === 'name' || fieldName === 'email' || fieldName === 'password') {
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (!result.success) {
          // Encontrar el error específico para este campo
          const fieldError = result.error.errors.find(e => e.path[0] === fieldName);
          if (fieldError) {
            errorElement.textContent = fieldError.message;
            field.classList.add('invalid');
          }
        } else {
          errorElement.textContent = '';
          field.classList.remove('invalid');
        }
      }
    }
  
    // Función para mostrar errores
    function displayErrors(error) {
      // Limpiar errores previos
      clearErrors();
      
      // Agrupar errores por campo
      const errorsByField = {};
      error.errors.forEach(err => {
        const field = err.path[0];
        errorsByField[field] = err.message;
      });
      
      // Mostrar errores en los campos correspondientes
      for (const field in errorsByField) {
        const errorElement = document.getElementById(`${field}-error`);
        const inputElement = document.getElementById(field);
        
        if (errorElement && inputElement) {
          errorElement.textContent = errorsByField[field];
          inputElement.classList.add('invalid');
        }
      }
    }
  
    // Función para limpiar errores
    function clearErrors() {
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(el => el.textContent = '');
      
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => input.classList.remove('invalid'));
    }
  });