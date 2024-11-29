window.loadExercise8 = function(value) { 
    const iframe = document.getElementById('exercise-frame-8');
    if (value) {
        iframe.src = value; 
    } else {
        iframe.src = ''; 
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');

    const updateActiveLink = () => {
        const fromTop = window.scrollY + 100;

        navLinks.forEach(link => {
            const section = document.querySelector(link.hash);
            
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                navLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.hash);
            section.scrollIntoView({ behavior: 'smooth' });
            
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const proyectoItems = document.querySelectorAll('.proyecto-item');
    const proyectoPreviews = document.querySelectorAll('.proyecto-preview');

    proyectoItems.forEach(item => {
        item.addEventListener('click', () => {
            proyectoItems.forEach(i => i.classList.remove('active'));
            proyectoPreviews.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            
            const proyectoId = item.getAttribute('data-proyecto');
            const previewActivo = document.getElementById(`proyecto-${proyectoId}`);
            previewActivo.classList.add('active');
        });
    });

    function handleSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitBtn = form.querySelector('#submitBtn');
        const mensajeExito = form.querySelector('#mensajeExito');
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Enviando...</span> <i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            mensajeExito.style.display = 'block';
            
            form.reset();
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Enviar mensaje</span> <i class="fas fa-paper-plane"></i>';
                
                setTimeout(() => {
                    mensajeExito.style.display = 'none';
                }, 5000);
            }, 2000);
            
        }, 2000);
        
        return false;
    }

    const track = document.querySelector('.skills-track');
    const cards = document.querySelectorAll('.skill-card');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    const dotsContainer = document.querySelector('.slider-dots');


    const cardsToShow = window.innerWidth < 768 ? 2 : 4;
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(track).gap); // Obtener el gap real del CSS
    let currentPosition = 0;
    const totalCards = cards.length;
    const totalGroups = Math.ceil(totalCards / cardsToShow);

    // Crear dots
    for (let i = 0; i < totalGroups; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Grupo ${i + 1}`);
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    // Función para mover el carrusel
    function moveCarousel(position) {
        const offset = -(position * (cardWidth + gap));
        
        track.style.transform = `translateX(${offset}px)`;
        
        // Actualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === position);
        });

        // Actualizar estado de los botones
        prevButton.disabled = position === 0;
        nextButton.disabled = position >= totalCards - cardsToShow;

        currentPosition = position;
    }

    // Event Listeners
    prevButton.addEventListener('click', () => {
        if (currentPosition > 0) {
            moveCarousel(currentPosition - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPosition < totalCards - cardsToShow) {
            moveCarousel(currentPosition + 1);
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveCarousel(index * cardsToShow);
        });
    });

    // Inicializar
    moveCarousel(0);

    // Opcional: Auto-play
    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            if (currentPosition < totalCards - cardsToShow) {
                moveCarousel(currentPosition + 1);
            } else {
                moveCarousel(0);
            }
        }, 3000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Iniciar autoplay
    startAutoplay();

    // Detener autoplay al interactuar
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
    prevButton.addEventListener('mouseenter', stopAutoplay);
    nextButton.addEventListener('mouseenter', stopAutoplay);
    dotsContainer.addEventListener('mouseenter', stopAutoplay);

    // Nuevo código para los demás selectores
    const selectors = document.querySelectorAll('.styled-select');
    
    selectors.forEach(select => {
        // Solo procesar los selectores que NO son del ejercicio 8
        if (select.id !== 'exercise-selector-8') {
            select.addEventListener('change', function() {
                const proyectoPreview = this.closest('.proyecto-preview');
                if (!proyectoPreview) return;

                const iframes = proyectoPreview.querySelectorAll('.proyecto-contenido iframe');
                const selectedUrl = this.value;

                iframes.forEach(iframe => {
                    // Verificar si el iframe pertenece al ejercicio 8
                    if (iframe.id === 'exercise-frame-8') return;
                    
                    if (iframe.src.includes(selectedUrl)) {
                        iframe.style.display = 'block';
                    } else {
                        iframe.style.display = 'none';
                    }
                });
            });

            // Mostrar el primer iframe por defecto (excepto para ejercicio 8)
            const proyectoPreview = select.closest('.proyecto-preview');
            if (proyectoPreview && !proyectoPreview.id.includes('proyecto-8')) {
                const firstOption = select.querySelector('option');
                if (firstOption) {
                    select.value = firstOption.value;
                    const event = new Event('change');
                    select.dispatchEvent(event);
                }
            }
        }
    });

});