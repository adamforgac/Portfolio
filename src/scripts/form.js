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


const form = document.getElementById('contact-form');
const inputs = form.querySelectorAll('input, textarea');
const loader = document.getElementById('loaderProgress');

let submitted = false;

function updateLoader() {
  const filled = Array.from(inputs).filter(
    (input) => input.value.trim() !== ''
  ).length;
  const total = inputs.length;

  if (submitted) {
    loader.style.width = '100%';
  } else if (filled === total) {
    loader.style.width = '66.6%';
  } else {
    loader.style.width = '33.3%';
  }
}

// Animate to 33.3% on page load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    loader.style.width = '33.3%';
  }, 300); // smooth entrance
});

inputs.forEach((input) => {
  input.addEventListener('input', updateLoader);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitted = true;
  updateLoader();
  console.log('Form submitted!');
  // handle real submission here
});
