/**
 * Storybook Studio - Interactive Landing Page
 * Inspired by The Night Gardener by The Fan Brothers
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initParticles();
  initNavigation();
  initEnterButton();
  initAboutModal();
  initStoryPage();
});

/**
 * PARTICLES / FIREFLIES
 * Creates floating magical particles that drift around the scene
 */
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer, i);
  }
}

function createParticle(container, index) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  // Random positioning
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${50 + Math.random() * 40}%`;

  // Random animation delay and duration
  const delay = Math.random() * 8;
  const duration = 6 + Math.random() * 4;
  particle.style.animationDelay = `${delay}s`;
  particle.style.animationDuration = `${duration}s`;

  // Random size variation
  const size = 2 + Math.random() * 4;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  container.appendChild(particle);
}

/**
 * NAVIGATION
 * Handles the About link behavior
 */
function initNavigation() {
  const aboutLink = document.getElementById('aboutLink');
  if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      openAboutModal();
    });
  }
}

/**
 * ENTER BUTTON
 * Handles the main CTA - "Enter the Garden"
 */
function initEnterButton() {
  const enterButton = document.getElementById('enterButton');
  const transitionOverlay = document.getElementById('transitionOverlay');
  const storyPage = document.getElementById('storyPage');

  if (!enterButton || !transitionOverlay || !storyPage) return;

  enterButton.addEventListener('click', () => {
    // Start the transition sequence
    startGardenTransition(transitionOverlay, storyPage);
  });

  // Keyboard accessibility
  enterButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startGardenTransition(transitionOverlay, storyPage);
    }
  });
}

function startGardenTransition(overlay, storyPage) {
  // Phase 1: Show overlay
  overlay.classList.add('active');

  // Phase 2: Open the gates (after overlay is visible)
  setTimeout(() => {
    overlay.classList.add('opening');
  }, 500);

  // Phase 3: Show welcome text
  setTimeout(() => {
    overlay.classList.add('showing-text');
  }, 1500);

  // Phase 4: Fade to story page
  setTimeout(() => {
    storyPage.classList.add('active');
    overlay.classList.remove('active', 'opening', 'showing-text');
  }, 4000);
}

/**
 * ABOUT MODAL
 * Handles the about modal open/close
 */
function initAboutModal() {
  const modal = document.getElementById('aboutModal');
  const closeButton = document.getElementById('modalClose');

  if (!modal) return;

  // Close button
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closeAboutModal();
    });
  }

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeAboutModal();
    }
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeAboutModal();
    }
  });
}

function openAboutModal() {
  const modal = document.getElementById('aboutModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus the close button for accessibility
    const closeButton = document.getElementById('modalClose');
    if (closeButton) {
      setTimeout(() => closeButton.focus(), 100);
    }
  }
}

function closeAboutModal() {
  const modal = document.getElementById('aboutModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * STORY PAGE
 * Handles the interactive story creation flow
 */
function initStoryPage() {
  const storyPage = document.getElementById('storyPage');
  const backLink = document.getElementById('backLink');

  if (!storyPage) return;

  // Back to landing page
  if (backLink) {
    backLink.addEventListener('click', (e) => {
      e.preventDefault();
      storyPage.classList.remove('active');
    });
  }

  // Character selection
  initCharacterSelection();
}

function initCharacterSelection() {
  const characterButtons = document.querySelectorAll('.character-btn');
  const customInput = document.getElementById('customAnimal');

  characterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove selection from all buttons
      characterButtons.forEach((b) => b.classList.remove('selected'));
      // Add selection to clicked button
      btn.classList.add('selected');
      // Clear custom input
      if (customInput) {
        customInput.value = '';
      }

      // Visual feedback
      animateSelection(btn);
    });
  });

  // Custom input handling
  if (customInput) {
    customInput.addEventListener('input', () => {
      if (customInput.value.trim()) {
        // Clear button selections when typing
        characterButtons.forEach((b) => b.classList.remove('selected'));
      }
    });
  }
}

function animateSelection(element) {
  // Add a brief scale animation
  element.style.transform = 'scale(1.1)';
  setTimeout(() => {
    element.style.transform = '';
  }, 150);
}

/**
 * UTILITY FUNCTIONS
 */

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Check for reduced motion preference
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * ADDITIONAL AMBIENT EFFECTS
 */

// Owl eye tracking (subtle effect following mouse)
function initOwlEyeTracking() {
  const owl = document.querySelector('.owl-container');
  if (!owl || prefersReducedMotion()) return;

  document.addEventListener(
    'mousemove',
    debounce((e) => {
      const owlRect = owl.getBoundingClientRect();
      const owlCenterX = owlRect.left + owlRect.width / 2;
      const owlCenterY = owlRect.top + owlRect.height / 3;

      const deltaX = e.clientX - owlCenterX;
      const deltaY = e.clientY - owlCenterY;

      // Limit the movement range
      const maxMove = 3;
      const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX / 100));
      const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY / 100));

      // Apply subtle transform to pupils
      const pupils = owl.querySelectorAll('.face circle:nth-child(3), .face circle:nth-child(4)');
      pupils.forEach((pupil) => {
        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }, 50)
  );
}

// Initialize eye tracking after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  // Delay to ensure owl is rendered
  setTimeout(initOwlEyeTracking, 2000);
});

/**
 * LAMP GLOW EFFECT
 * Adds subtle flickering to street lamps
 */
function initLampGlow() {
  if (prefersReducedMotion()) return;

  const lamps = document.querySelectorAll('.street-lamps ellipse');
  lamps.forEach((lamp, index) => {
    setInterval(
      () => {
        const baseOpacity = 0.6;
        const flicker = (Math.random() - 0.5) * 0.2;
        lamp.style.opacity = baseOpacity + flicker;
      },
      100 + index * 50
    );
  });
}

// Initialize lamp effect
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initLampGlow, 1000);
});
