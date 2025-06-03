window.onload = function() {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  document.getElementById('currentDate').textContent = formattedDate;
};



// ...existing code...

document.addEventListener('DOMContentLoaded', function() {
  const images = Array.from(document.querySelectorAll('.lightbox img'));
  const imageLinks = Array.from(document.querySelectorAll('.lightbox'));
  let currentIndex = 0;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="close-btn" title="Close">&times;</button>
    <button class="arrow left">&#8592;</button>
    <img src="" alt="Lightbox Image">
    <button class="arrow right">&#8594;</button>
  `;
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.close-btn');
  const leftArrow = overlay.querySelector('.arrow.left');
  const rightArrow = overlay.querySelector('.arrow.right');

  function showLightbox(index) {
    currentIndex = index;
    overlayImg.src = imageLinks[currentIndex].href;
    overlay.style.display = 'flex';
  }

  function hideLightbox() {
    overlay.style.display = 'none';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + imageLinks.length) % imageLinks.length;
    overlayImg.src = imageLinks[currentIndex].href;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % imageLinks.length;
    overlayImg.src = imageLinks[currentIndex].href;
  }

  imageLinks.forEach((link, idx) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showLightbox(idx);
    });
  });

  closeBtn.addEventListener('click', hideLightbox);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) hideLightbox();
  });
  leftArrow.addEventListener('click', function(e) {
    e.stopPropagation();
    showPrev();
  });
  rightArrow.addEventListener('click', function(e) {
    e.stopPropagation();
    showNext();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (overlay.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') hideLightbox();
    }
  });
});