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

// WORK SECTION IMAGE EFFECT


document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.work-image img');

  function updateParallax() {
    images.forEach((img) => {
      const rect = img.closest('.work-image').getBoundingClientRect();
      const scrollSpeed = 0.05; //rychlost
      const maxMove = 30; //aby nejelo moc daleko a nedostalo se mimo rámeček

      let movement = rect.top * scrollSpeed;

      movement = Math.max(-maxMove, Math.min(maxMove, movement));

      img.style.transform = `translate(-50%, calc(-50% + ${movement}px))`;
    });
  }

  window.addEventListener('scroll', updateParallax);
});

// Parallax arrow scrolling effect (contact me section)

document.addEventListener('DOMContentLoaded', function () {
  const icons = document.querySelectorAll('.icon-banner');
  const section = document.querySelector('.final-cta'); 

  function updateParallax() {
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = sectionRect.top;
    const sectionHeight = sectionRect.height;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
      // spočítá progres v té dané sekci
      const progress = 1 - Math.max(0, sectionTop / windowHeight);

      icons.forEach((icon, index) => {
        const speed = (index + 1) * 50;
        const movement = progress * speed; // posunuje šipky vzhledem k ke scrollu a jejich pořadí

        icon.style.transform = `translateY(-${movement}px)`;
      });
    }
  }

  window.addEventListener('scroll', updateParallax);
});
