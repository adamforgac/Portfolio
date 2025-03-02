// Core scripts

// Přidá na telefonních zařízeních lazy load obrázkům, které mají classu lazy-load

document.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth <= 768) {
    // Adjust the breakpoint for mobile
    document.querySelectorAll('img.lazy-load').forEach((img) => {
      img.setAttribute('loading', 'lazy');
    });
  }
});