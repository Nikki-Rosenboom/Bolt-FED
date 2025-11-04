openButton = document.querySelector(".openKnop");
sluitButton = document.querySelector(".sluitKnop");
menuZelf = document.querySelector("div");

openButton.addEventListener("click", openMenu);
sluitButton.addEventListener("click", sluitMenu);

function openMenu(){
  menuZelf.classList.add("open");
}

function sluitMenu(){
  menuZelf.classList.remove("open");
}

//timer
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // na 5 seconden loader starten
  setTimeout(() => {
    loader.classList.add("hidden");

    // Wacht en maak klikbaar
    setTimeout(() => {
      loader.style.pointerEvents = "none";
    }, 1000); // overeenkomend met CSS transition duration
  }, 1800);
});

//Lettergrootte
const fontButtons = document.querySelectorAll('.font-btn');

// Lettergrootte aanpassen bij klikken
fontButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const size = btn.dataset.size;
        document.body.className = 'font-' + size;
        
        fontButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        localStorage.setItem('fontSize', size);
    });
});



//Prompt: CLAUDE - maak een slider in de style van BOLT waarbij er navigatieknoppen zichtbaar zijn aan de linker en rechter kant van de pagina op de img. Deze img bewegen naar links en rechts in het carousel/slider.

// Opgeslagen lettergrootte laden
const saved = localStorage.getItem('fontSize') || 'medium';
document.body.className = 'font-' + saved;
document.querySelector('[data-size="' + saved + '"]').classList.add('active');
// Carousel functionaliteit voor Bolt ritten pagina
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slidesContainer = carousel.querySelector('.slides');
  const slides = carousel.querySelectorAll('.slides > div');
  
  if (slides.length === 0) return;

  let currentIndex = 0;

  // Maak navigatie knoppen
  const navDiv = document.createElement('div');
  navDiv.className = 'carousel-nav';
  
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-btn prev-btn';
  prevBtn.innerHTML = '‹';
  prevBtn.setAttribute('aria-label', 'Vorige slide');
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-btn next-btn';
  nextBtn.innerHTML = '›';
  nextBtn.setAttribute('aria-label', 'Volgende slide');
  
  navDiv.appendChild(prevBtn);
  navDiv.appendChild(nextBtn);
  carousel.appendChild(navDiv);

  // Maak dots voor indicatie
  const dotsDiv = document.createElement('div');
  dotsDiv.className = 'carousel-dots';
  
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Ga naar slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsDiv.appendChild(dot);
  });
  
  carousel.appendChild(dotsDiv);

  // Update slide positie
  function updateSlidePosition() {
    const offset = -currentIndex * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    const dots = carousel.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Ga naar specifieke slide
  function goToSlide(index) {
    currentIndex = index;
    updateSlidePosition();
  }

  // Volgende slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  }

  // Vorige slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Touch/swipe support voor mobiel
  let touchStartX = 0;
  let touchEndX = 0;

  slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slidesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) nextSlide();
    if (touchEndX - touchStartX > 50) prevSlide();
  }
});

