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