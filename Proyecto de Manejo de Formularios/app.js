document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroEvento');
    
    // Establecer fecha mínima como hoy
    const fechaInput = document.getElementById('fecha');
    const today = new Date().toISOString().split('T')[0];
    fechaInput.min = today;
  
    // Validaciones personalizadas
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      let isValid = true;
  
      // Limpiar mensajes de error previos
      clearErrors();
  
      // Validar nombre (mínimo 2 palabras)
      const nombre = document.getElementById('nombre').value.trim();
      if (!nombre || nombre.split(' ').length < 2) {
        showError('nombre-error', 'Por favor ingresa tu nombre completo (al menos nombre y apellido)');
        isValid = false;
      }
  
      // Validar correo (formato básico + dominio válido)
      const correo = document.getElementById('correo').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correo)) {
        showError('correo-error', 'Por favor ingresa un correo electrónico válido');
        isValid = false;
      }
  
      // Validar teléfono (formato mexicano: 10 dígitos)
      const telefono = document.getElementById('telefono').value.trim();
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(telefono)) {
        showError('telefono-error', 'Por favor ingresa un número de teléfono válido (10 dígitos)');
        isValid = false;
      }
  
      // Validar intereses (al menos uno seleccionado)
      const intereses = document.querySelectorAll('input[name="intereses"]:checked');
      if (intereses.length === 0) {
        showError('intereses-error', 'Por favor selecciona al menos un interés');
        isValid = false;
      }
  
      // Validar horario (seleccionado)
      const horario = document.querySelector('input[name="horario"]:checked');
      if (!horario) {
        showError('horario-error', 'Por favor selecciona un horario');
        isValid = false;
      }
  
      // Validar fecha (no anterior a hoy)
      const fecha = document.getElementById('fecha').value;
      if (new Date(fecha) < new Date(today)) {
        showError('fecha-error', 'La fecha no puede ser anterior a hoy');
        isValid = false;
      }
  
      // Validar archivo (si se subió)
      const archivo = document.getElementById('archivo').files[0];
      if (archivo) {
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        const maxSize = 2 * 1024 * 1024; // 2MB
        
        if (!validTypes.includes(archivo.type)) {
          showError('archivo-error', 'Solo se permiten archivos JPG, PNG o PDF');
          isValid = false;
        }
        
        if (archivo.size > maxSize) {
          showError('archivo-error', 'El archivo no debe exceder 2MB');
          isValid = false;
        }
      }
  
      // Si todo es válido, enviar formulario
      if (isValid) {
        // Simular envío
        alert('Registro exitoso. ¡Gracias por registrarte!');
        form.reset();
      }
    });
  
    // Función para mostrar errores
    function showError(id, message) {
      const errorElement = document.getElementById(id);
      errorElement.textContent = message;
      const inputId = id.replace('-error', '');
      const inputElement = document.getElementById(inputId);
      if (inputElement) {
        inputElement.classList.add('invalid');
      }
    }
  
    // Función para limpiar errores
    function clearErrors() {
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(el => el.textContent = '');
      
      const invalidInputs = document.querySelectorAll('.invalid');
      invalidInputs.forEach(el => el.classList.remove('invalid'));
    }
  
    // Validación en tiempo real
    document.getElementById('nombre').addEventListener('input', function() {
      if (this.value.trim().split(' ').length >= 2) {
        this.classList.remove('invalid');
        document.getElementById('nombre-error').textContent = '';
      }
    });
  
    document.getElementById('telefono').addEventListener('input', function() {
      if (/^[0-9]{0,10}$/.test(this.value)) {
        this.classList.remove('invalid');
        document.getElementById('telefono-error').textContent = '';
      }
    });
  });