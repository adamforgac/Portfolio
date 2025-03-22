// Program na puštění lottie animací

document.addEventListener('DOMContentLoaded', function () {
  
  const animationElements = document.querySelectorAll('.lottie-animation');

  animationElements.forEach((element) => {
    const fallback = element.dataset.fallback; 
    const animationPath = element.dataset.animationPath; 

    fetch(animationPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Lottie soubor nenalezen');
        }
        return response.json();
      })
      .then((data) => {
        let anim = lottie.loadAnimation({
          container: element,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: data,
        });

        let observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                anim.goToAndPlay(0, true); // začne hrát od začátku vždy, když na to člověk najede
              }
            });
          },
          { threshold: 1 }
        );

        observer.observe(element);
      })
      .catch((error) => {
        console.error('Lottie animation failed:', animationPath, error);

        // pokud se něco pokazí, dá se místo toho img
        element.innerHTML = '';

        let fallbackImg = document.createElement('img');
        fallbackImg.src = fallback;
        fallbackImg.alt = 'Fallback Animation';
        fallbackImg.style.width = '100%';
        fallbackImg.style.height = 'auto';

        element.appendChild(fallbackImg);
      });
  });
});


// DECORATIVE TEXT ANIMATION

const decorativeTexts = document.querySelectorAll('.decorative-animation');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.3 }
);

decorativeTexts.forEach((text) => observer.observe(text));


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