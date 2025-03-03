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