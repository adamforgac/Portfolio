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


