// JavaScript para interactividad dinámica

document.addEventListener('DOMContentLoaded', function() {
    // Función para el botón de alerta
    const alertButton = document.getElementById('alertButton');
    alertButton.addEventListener('click', function() {
        showCustomAlert();
    });

    // Función para mostrar alerta personalizada
    function showCustomAlert() {
        // Crear modal personalizado
        const modalHtml = `
            <div class="modal fade" id="customAlertModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title">
                                <i class="bi bi-gift-fill me-2"></i>¡Sorpresa Especial!
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center py-4">
                            <div class="mb-3">
                                <i class="bi bi-star-fill text-warning fs-1"></i>
                            </div>
                            <h4 class="mb-3">¡Felicidades!</h4>
                            <p class="lead">Has ganado un <strong>20% de descuento</strong> en tu próxima compra.</p>
                            <p class="text-muted">Usa el código: <strong>SURPRESA2024</strong></p>
                            <div class="alert alert-info mt-3">
                                <i class="bi bi-info-circle me-2"></i>
                                Este código es válido por 24 horas.
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-success" onclick="copyDiscountCode()">
                                <i class="bi bi-clipboard me-2"></i>Copiar Código
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Eliminar modal existente si hay uno
        const existingModal = document.getElementById('customAlertModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Agregar el nuevo modal al body
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('customAlertModal'));
        modal.show();

        // Eliminar el modal cuando se cierre
        document.getElementById('customAlertModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    // Función para copiar código de descuento
    window.copyDiscountCode = function() {
        const code = 'SURPRESA2024';
        navigator.clipboard.writeText(code).then(function() {
            showToast('¡Código copiado al portapapeles!', 'success');
        }).catch(function() {
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('¡Código copiado al portapapeles!', 'success');
        });
    };

    // Función para mostrar toast notifications
    function showToast(message, type = 'info') {
        const toastHtml = `
            <div class="toast align-items-center text-white bg-${type === 'success' ? 'success' : 'info'} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;

        // Crear container para toasts si no existe
        let toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }

        // Agregar toast y mostrarlo
        toastContainer.insertAdjacentHTML('beforeend', toastHtml);
        const toastElement = toastContainer.lastElementChild;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        // Eliminar toast cuando se oculte
        toastElement.addEventListener('hidden.bs.toast', function() {
            this.remove();
        });
    }

    // Validación del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Función de validación del formulario
    function validateForm() {
        let isValid = true;
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const mensaje = document.getElementById('mensaje');

        // Resetear estados de validación
        [nombre, email, mensaje].forEach(field => {
            field.classList.remove('is-invalid', 'is-valid');
        });

        // Validar nombre
        if (nombre.value.trim().length < 3) {
            nombre.classList.add('is-invalid');
            isValid = false;
        } else {
            nombre.classList.add('is-valid');
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.add('is-valid');
        }

        // Validar mensaje
        if (mensaje.value.trim().length < 10) {
            mensaje.classList.add('is-invalid');
            isValid = false;
        } else {
            mensaje.classList.add('is-valid');
        }

        return isValid;
    }

    // Función para enviar formulario
    function submitForm() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar estado de carga
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading me-2"></span>Enviando...';

        // Simular envío de formulario
        setTimeout(() => {
            // Obtener datos del formulario
            const formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                mensaje: document.getElementById('mensaje').value
            };

            console.log('Datos del formulario:', formData);

            // Mostrar mensaje de éxito
            showToast('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');

            // Resetear formulario
            contactForm.reset();
            [document.getElementById('nombre'), document.getElementById('email'), document.getElementById('mensaje')]
                .forEach(field => field.classList.remove('is-valid', 'is-invalid'));

            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // Mostrar modal de confirmación
            showConfirmationModal(formData.nombre);
        }, 2000);
    }

    // Función para mostrar modal de confirmación
    function showConfirmationModal(nombre) {
        const modalHtml = `
            <div class="modal fade" id="confirmationModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="bi bi-check-circle-fill me-2"></i>Confirmación
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center py-4">
                            <div class="mb-3">
                                <i class="bi bi-envelope-check-fill text-success fs-1"></i>
                            </div>
                            <h4 class="mb-3">¡Gracias, ${nombre}!</h4>
                            <p class="lead">Tu mensaje ha sido recibido exitosamente.</p>
                            <p class="text-muted">Nos contactaremos contigo en las próximas 24 horas.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Eliminar modal existente si hay uno
        const existingModal = document.getElementById('confirmationModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Agregar el nuevo modal al body
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        modal.show();

        // Eliminar el modal cuando se cierre
        document.getElementById('confirmationModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    // Validación en tiempo real
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                validateField(this);
            }
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });

    // Función para validar campo individual
    function validateField(field) {
        field.classList.remove('is-invalid', 'is-valid');

        switch(field.id) {
            case 'nombre':
                if (field.value.trim().length >= 3) {
                    field.classList.add('is-valid');
                } else {
                    field.classList.add('is-invalid');
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(field.value)) {
                    field.classList.add('is-valid');
                } else {
                    field.classList.add('is-invalid');
                }
                break;
            case 'mensaje':
                if (field.value.trim().length >= 10) {
                    field.classList.add('is-valid');
                } else {
                    field.classList.add('is-invalid');
                }
                break;
        }
    }

    // Animación de scroll para navegación
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Ajustar por altura del navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto parallax suave en el carrusel
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const carousel = document.querySelector('.carousel');
        if (carousel && scrolled < 500) {
            carousel.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    console.log('🚀 Página web interactiva cargada exitosamente');
});
