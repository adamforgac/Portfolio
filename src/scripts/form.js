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
let isKeyboardVisible = false;

// Show loader when scrolling down a bit
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  
  // Only apply scroll-based visibility when keyboard is not active
  if (!isKeyboardVisible) {
    if (scrollTop > 80) {
      mobileLoaderWrapper.classList.add('visible');
    } else {
      mobileLoaderWrapper.classList.remove('visible');
    }
  }
});

// Detect keyboard visibility through input focus/blur
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    // Only on mobile devices
    if (window.innerWidth <= 768) {
      isKeyboardVisible = true;
      mobileLoaderWrapper.classList.remove('visible');
      mobileLoaderWrapper.classList.add('keyboard-active');
    }
  });
  
  input.addEventListener('blur', () => {
    if (window.innerWidth <= 768) {
      isKeyboardVisible = false;
      mobileLoaderWrapper.classList.remove('keyboard-active');
      
      // Re-check scroll position to decide if normal visible class should be applied
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 80) {
        mobileLoaderWrapper.classList.add('visible');
      }
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
    const progress = (filled / (total + 1)) * 100;
    loader.style.width = `${progress}%`;
    mobileLoader.style.width = `${progress}%`;
  }
}

// Show initial loader state
window.addEventListener('DOMContentLoaded', () => {
  // Make sure mobile loader is properly displayed on mobile
  if (window.innerWidth <= 768) {
    mobileLoaderWrapper.style.display = 'block';
  }
  
  setTimeout(() => {
    loader.style.width = '10%';
    mobileLoader.style.width = '10%';
  }, 300);
});

// Add resize listener to handle orientation changes
window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    mobileLoaderWrapper.style.display = 'block';
  } else {
    mobileLoaderWrapper.style.display = 'none';
  }
});

inputs.forEach((input) => {
  input.addEventListener('input', updateLoader);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitted = true;
  updateLoader();
});