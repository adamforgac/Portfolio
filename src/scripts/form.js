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
const mobileLoaderWrapper = document.querySelector('.mobile-loader-wrapper');

let submitted = false;
let initialViewportHeight = window.innerHeight;

// Show/hide loader on scroll
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop > 80) {
    mobileLoaderWrapper.classList.add('visible');
  } else {
    mobileLoaderWrapper.classList.remove('visible');
  }
});

// Show loader when focusing an input (fix for keyboard overlay issue)
inputs.forEach((input) => {
  input.addEventListener('focus', () => {
    mobileLoaderWrapper.classList.add('visible');
  });

  input.addEventListener('blur', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop < 80) {
      mobileLoaderWrapper.classList.remove('visible');
    }
  });
});

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

// Animate to 10% on page load
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

// Submit form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitted = true;
  updateLoader();
});