const thumbs = Array.from(document.querySelectorAll('.thumb img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

// Abrir modal con fade-in
function openModal(index){
  currentIndex = index;
  lightbox.classList.add('show');
  loadImage(thumbs[currentIndex].dataset.full);
  preloadNext();
}

// Cargar imagen con fade-in
function loadImage(src){
  lightboxImg.classList.remove('loaded');
  lightboxImg.src = src;
  lightboxImg.onload = () => {
    lightboxImg.classList.add('loaded');
  }
}

// Preload siguiente imagen
function preloadNext() {
  const nextIndex = (currentIndex + 1) % thumbs.length;
  const img = new Image();
  img.src = thumbs[nextIndex].dataset.full;
}

// Navegación
function showNext() {
  currentIndex = (currentIndex + 1) % thumbs.length;
  loadImage(thumbs[currentIndex].dataset.full);
  preloadNext();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
  loadImage(thumbs[currentIndex].dataset.full);
  preloadNext();
}

// Event listeners
thumbs.forEach((img, index) => {
  img.addEventListener('click', () => openModal(index));
});

closeBtn.addEventListener('click', () => lightbox.classList.remove('show'));
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) lightbox.classList.remove('show');
});

// Teclado
document.addEventListener('keydown', (e) => {
  if(e.key === "Escape") lightbox.classList.remove('show');
  if(e.key === "ArrowRight") showNext();
  if(e.key === "ArrowLeft") showPrev();
});

// Swipe táctil
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
lightbox.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  if(touchEndX < touchStartX - 50) showNext();
  if(touchEndX > touchStartX + 50) showPrev();
});

// Cerrar modal
closeBtn.addEventListener('click', () => lightbox.classList.remove('show'));
lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) lightbox.classList.remove('show');
});
document.addEventListener('keydown', (e) => {
  if(e.key === "Escape") lightbox.classList.remove('show');
});