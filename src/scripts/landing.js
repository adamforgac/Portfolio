// EARTH ANIMATION

const earth = document.getElementById('earth');
let initialScroll = null; // na uschování původní pozice

document.addEventListener('scroll', () => {
  const rect = earth.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    if (initialScroll === null) {
      initialScroll = window.scrollY;
    }
    const relativeScroll = window.scrollY - initialScroll;

    const rotation = relativeScroll * 0.02;

    earth.style.transform = `rotate(${rotation}deg)`;
  }
});

// MOVING IMAGE EFFECT V1 (works with .slider-image-wrapper class)

document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.slider-image-wrapper img');

  function updateParallax() {
    images.forEach((img) => {
      const rect = img.closest('.slider-image-wrapper').getBoundingClientRect();
      const scrollSpeed = 0.05; //speed
      const maxMove = 30; //aby nejelo moc daleko a nedostalo se mimo rámeček

      let movement = rect.top * scrollSpeed;

      movement = Math.max(-maxMove, Math.min(maxMove, movement));

      img.style.transform = `translate(-50%, calc(-50% + ${movement}px))`;
    });
  }

  window.addEventListener('scroll', updateParallax);
});

// MOVING IMAGE EFFECT V2 (works with .slider-image-wrapper-v2)

document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll(
    '.slider-image-wrapper-v2 img'
  );

  function updateParallax() {
    images.forEach((img, index) => {
      const rect = img
        .closest('.slider-image-wrapper-v2')
        .getBoundingClientRect();
      const scrollSpeed = 0.05; // Speed of movement
      const maxMove = 88; // Limit movement distance
      const rotationFactor = 8; // Max rotation in degrees

      let movement = rect.top * scrollSpeed;
      movement = Math.max(-maxMove, Math.min(maxMove, movement));

      // Synchronizing rotation with movement
      let rotation =
        (movement / maxMove) * rotationFactor * (index % 2 === 0 ? 1 : -1);

      img.style.transform = `translate(-50%, calc(-50% + ${movement}px)) rotate(${rotation}deg)`;
    });
  }

  updateParallax();

  window.addEventListener('scroll', updateParallax);
});

// MOVING IMAGE EFFECT V3 (works with .slider-image-wrapper-v3 class)

document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll(
    '.slider-image-wrapper-v3 img'
  );

  function updateParallax() {
    images.forEach((img, index) => {
      const rect = img
        .closest('.slider-image-wrapper-v3')
        .getBoundingClientRect();
      const scrollSpeed = 0.05; // Speed of movement
      const maxMove = 15; // Limit movement distance
      const rotationFactor = 2; // Max rotation in degrees

      let movement = rect.top * scrollSpeed;
      movement = Math.max(-maxMove, Math.min(maxMove, movement));

      // Synchronizing rotation with movement
      let rotation =
        (movement / maxMove) * rotationFactor * (index % 2 === 0 ? 1 : -1);

      img.style.transform = `translate(-50%, calc(-50% + ${movement}px)) rotate(${rotation}deg)`;
    });
  }

  updateParallax();

  window.addEventListener('scroll', updateParallax);
});


