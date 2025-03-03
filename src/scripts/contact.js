// Questions opener

document.querySelectorAll('.question').forEach((question) => {
  question.addEventListener('click', () => {
    const isActive = question.classList.contains('active');

    // Všechny preventivně zavřít
    document.querySelectorAll('.question').forEach((q) => {
      q.classList.remove('active');
      q.querySelector('.answer-container').style.maxHeight = '0px';
      q.querySelector('.answer').style.opacity = '0';
      q.querySelector('.answer').style.transform = 'translateY(-10px)';
    });

    // Pokud už není aktivní, tak to otevři
    if (!isActive) {
      question.classList.add('active');
      const answerContainer = question.querySelector('.answer-container');

      // Expand the container before revealing the text
      answerContainer.style.maxHeight = answerContainer.scrollHeight + 'px';

      setTimeout(() => {
        question.querySelector('.answer').style.opacity = '1';
        question.querySelector('.answer').style.transform = 'translateY(0)';
      }, 300);
    }
  });
});

// Final cta parallax

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