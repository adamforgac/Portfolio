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


// Replace your JavaScript with this improved version:
const form = document.getElementById('contact-form');
const inputs = form.querySelectorAll('input, textarea');
const loader = document.getElementById('loaderProgress');
const mobileLoader = document.getElementById('loaderProgressMobile');
const mobileLoaderWrapper = document.querySelector('.mobile-loader-wrapper');
let submitted = false;
let activeInput = null;
let isKeyboardVisible = false;
let visualViewportHeight = window.innerHeight;

// Initialize mobile loader display
if (window.innerWidth <= 768) {
  mobileLoaderWrapper.style.display = 'block';
}

// Visual Viewport API to detect keyboard height
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    // The keyboard is likely shown when visual viewport height is significantly less than window inner height
    const newViewportHeight = window.visualViewport.height;
    const heightDifference = window.innerHeight - newViewportHeight;
    
    if (heightDifference > 150 && activeInput) {
      // Keyboard is visible - position the tracker just above the keyboard
      isKeyboardVisible = true;
      mobileLoaderWrapper.classList.remove('visible');
      mobileLoaderWrapper.classList.add('keyboard-active');
      
      // Position just above the keyboard
      const keyboardHeight = heightDifference;
      mobileLoaderWrapper.style.bottom = `${keyboardHeight + 8}px`; // 8px gap above keyboard
      
      // Make sure the active input is visible
      ensureInputVisible(activeInput);
    } else {
      // Keyboard is hidden
      isKeyboardVisible = false;
      mobileLoaderWrapper.classList.remove('keyboard-active');
      mobileLoaderWrapper.style.bottom = '16px'; // Reset to default position
      
      // Check scroll position to decide if normal visible class should be applied
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 80) {
        mobileLoaderWrapper.classList.add('visible');
      }
    }
    
    visualViewportHeight = newViewportHeight;
  });
}

// Show loader when scrolling down a bit (only when keyboard is not visible)
window.addEventListener('scroll', () => {
  if (!isKeyboardVisible) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 80) {
      mobileLoaderWrapper.classList.add('visible');
    } else {
      mobileLoaderWrapper.classList.remove('visible');
    }
  }
});

// Track active input
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    activeInput = input;
    
    // Only apply keyboard behavior on mobile
    if (window.innerWidth <= 768) {
      // Check if keyboard is likely visible (using visualViewport height difference)
      if (window.visualViewport && (window.innerHeight - window.visualViewport.height > 150)) {
        isKeyboardVisible = true;
        mobileLoaderWrapper.classList.remove('visible');
        mobileLoaderWrapper.classList.add('keyboard-active');
        
        // Position just above the keyboard
        const keyboardHeight = window.innerHeight - window.visualViewport.height;
        mobileLoaderWrapper.style.bottom = `${keyboardHeight + 8}px`; // 8px gap
        
        // Make sure the input is visible
        ensureInputVisible(input);
      }
    }
  });
  
  input.addEventListener('blur', () => {
    activeInput = null;
    
    // Don't immediately remove keyboard-active - the visualViewport handler will do that
    // when the keyboard actually closes
    
    // Small delay to allow visualViewport to update first
    setTimeout(() => {
      if (!activeInput) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > 80) {
          mobileLoaderWrapper.classList.add('visible');
        }
      }
    }, 100);
  });
});

// Helper function to ensure the input is visible when keyboard is shown
function ensureInputVisible(input) {
  if (!input) return;
  
  // Get input position relative to viewport
  const rect = input.getBoundingClientRect();
  const inputBottom = rect.bottom;
  
  // Calculate visible area (accounting for keyboard)
  const visibleAreaHeight = visualViewportHeight - mobileLoaderWrapper.offsetHeight - 16;
  
  // If input is below the visible area, scroll to make it visible
  if (inputBottom > visibleAreaHeight) {
    const scrollNeeded = inputBottom - visibleAreaHeight + 16; // 16px buffer
    window.scrollBy(0, scrollNeeded);
  }
}

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

// Handle orientation changes and resizing
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