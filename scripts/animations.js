/**
 * Scroll Reveal Animation System
 * Uses Intersection Observer API for performance-optimized scroll reveals
 * Supports staggered animations with data-animate-delay attribute
 */

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}

function initScrollReveal() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Make all elements immediately visible for accessibility
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Configure Intersection Observer
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px 0px -100px 0px', // Trigger 100px before element enters viewport
    threshold: 0.15 // Trigger when 15% of element is visible
  };

  // Callback when elements intersect
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Get animation delay from data attribute (in milliseconds)
        const delay = parseInt(element.dataset.animateDelay) || 0;

        // Apply animation after delay
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);

        // Stop observing this element (animate once)
        observer.unobserve(element);
      }
    });
  };

  // Create observer instance
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all elements with data-animate attribute
  const animatedElements = document.querySelectorAll('[data-animate]');

  animatedElements.forEach(element => {
    // Add initial hidden state
    element.classList.add('animate-hidden');

    // Start observing
    observer.observe(element);
  });
}

/**
 * Usage in HTML:
 *
 * Basic scroll reveal:
 * <div data-animate>Content here</div>
 *
 * With stagger delay (200ms):
 * <div data-animate data-animate-delay="200">Content here</div>
 *
 * The CSS classes .animate-hidden and .is-visible control the animation states
 */
