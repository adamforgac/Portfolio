document.addEventListener('DOMContentLoaded', function () {
  // Select all elements with Lottie animations
  const animationElements = document.querySelectorAll('.lottie-animation');

  animationElements.forEach((element) => {
    const fallback = element.dataset.fallback; // Get the fallback image path
    const animationPath = element.dataset.animationPath; // Get the animation JSON path

    // First, check if the animation file exists before loading Lottie
    fetch(animationPath)
      .then((response) => {
        if (!response.ok) {
          // If the file is missing or inaccessible (404, 500, etc.)
          throw new Error('Lottie JSON file not found');
        }
        return response.json(); // Read the JSON data
      })
      .then((data) => {
        let anim = lottie.loadAnimation({
          container: element,
          renderer: 'svg',
          loop: true,
          autoplay: false,
          animationData: data, // Use the fetched JSON data
        });

        // IntersectionObserver: Play animation only when visible
        let observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                anim.play();
              } else {
                anim.pause();
              }
            });
          },
          { threshold: 0.3 }
        );

        observer.observe(element);
      })
      .catch((error) => {
        console.error('Lottie animation failed:', animationPath, error);

        // If the animation fails, replace it with an <img> element
        element.innerHTML = ''; // Remove any existing content

        let fallbackImg = document.createElement('img');
        fallbackImg.src = fallback;
        fallbackImg.alt = 'Fallback Animation';
        fallbackImg.style.width = '100%';
        fallbackImg.style.height = 'auto';

        element.appendChild(fallbackImg);
      });
  });
});
