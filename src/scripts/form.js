document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.pole input, .pole textarea').forEach((input) => {
    if (input.value.trim() !== '') {
      input.classList.add('filled');
    }
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.classList.add('filled');
      } else {
        input.classList.remove('filled');
      }
    });
  });
});

document
  .getElementById('contact-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    emailjs.sendForm('service_7vih0p5', 'template_o58erpl', this).then(
      function () {
        alert('Zpráva byla úspěšně odeslána');
        document.getElementById('contact-form').reset();
      },
      function (error) {
        alert('Něco se pokazilo. Zkuste to prosím znovu.');
      }
    );
});


// FORM PROGRESS TRACKER (Zeigarnik effect)


const form = document.getElementById('contact-form');
const inputs = form.querySelectorAll('input, textarea');
const loader = document.getElementById('loaderProgress');
const mobileLoader = document.getElementById('loaderProgressMobile');

let submitted = false;

function updateLoader() {
  const filled = Array.from(inputs).filter(
    (input) => input.value.trim() !== ''
  ).length;
  const total = inputs.length;

  if (submitted) {
    loader.style.width = '100%';
    mobileLoader.style.width = '100%';
  } else {
    const progress = (filled / (total + 1)) * 90 + 10;
    const clampedProgress = Math.max(progress, 10);
    loader.style.width = `${clampedProgress}%`;
    mobileLoader.style.width = `${clampedProgress}%`;
  }
}

// Initial animation to 10% on load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    loader.style.width = '10%';
    mobileLoader.style.width = '10%';
  }, 300);
});

// Track input changes
inputs.forEach((input) => {
  input.addEventListener('input', updateLoader);
});

// Handle submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitted = true;
  updateLoader();
});