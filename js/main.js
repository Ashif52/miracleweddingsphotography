/**
 * MIRACLE WEDDINGS PHOTOGRAPHY — CORE SITE CONTROLLER (main.js)
 * High-performance Vanilla JavaScript interactions:
 * - Scroll-reactive navigation
 * - Mobile drawer & focus trap
 * - IntersectionObserver reveal animations
 * - Testimonials slider
 * - Video showreel playback
 * - FAQ accordions & back-to-top
 */

class MiracleApp {
  constructor() {
    this.initHeaderScroll();
    this.initMobileNav();
    this.initScrollReveal();
    this.initTestimonialCarousel();
    this.initVideoShowreel();
    this.initAccordions();
    this.initBackToTop();
  }

  // --- 1. HEADER SCROLL INTERACTION ---
  initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    // Check on initial load
    const handleScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- 2. MOBILE NAVIGATION DRAWER ---
  initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !drawer) return;

    const openDrawer = () => {
      toggleBtn.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) closeDrawer();
      else openDrawer();
    });

    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    navLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // --- 3. SCROLL REVEAL ANIMATIONS (IntersectionObserver) ---
  initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-fade-up').forEach(el => el.classList.add('revealed'));
      return;
    }

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    this.refreshObserver();
  }

  refreshObserver() {
    if (!this.observer) return;
    const elements = document.querySelectorAll('.reveal-fade-up:not(.revealed)');
    elements.forEach(el => this.observer.observe(el));
  }

  // --- 4. TESTIMONIALS CAROUSEL ---
  initTestimonialCarousel() {
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoplayTimer = null;

    // Create dot indicators
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
        dot.addEventListener('click', () => goToSlide(idx));
        indicatorsContainer.appendChild(dot);
      });
    }

    const dots = document.querySelectorAll('.carousel-dot');

    const updateSlide = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlide();
    };

    const goToSlide = (index) => {
      currentIndex = index;
      updateSlide();
      resetAutoplay();
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    // Autoplay
    const startAutoplay = () => {
      autoplayTimer = setInterval(nextSlide, 6500);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    const wrapper = document.querySelector('.testimonials-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', stopAutoplay);
      wrapper.addEventListener('mouseleave', startAutoplay);
    }

    // Touch swipe for testimonials
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        nextSlide();
      } else if (touchEndX - touchStartX > 45) {
        prevSlide();
      }
      startAutoplay();
    }, { passive: true });

    startAutoplay();
  }

  // --- 5. CINEMATIC VIDEO SHOWREEL ---
  initVideoShowreel() {
    const playBtn = document.querySelector('.film-play-btn');
    const overlay = document.querySelector('.film-poster-overlay');
    const video = document.getElementById('featured-film-video');

    if (!playBtn || !video) return;

    playBtn.addEventListener('click', () => {
      if (overlay) overlay.classList.add('hidden');
      video.setAttribute('controls', 'true');
      video.play().catch(err => {
        console.log('Video autoplay prevented or source loading:', err);
      });
    });

    // If user pauses and finishes
    video.addEventListener('ended', () => {
      if (overlay) overlay.classList.remove('hidden');
      video.removeAttribute('controls');
    });
  }

  // --- 6. ACCORDIONS (FAQ) ---
  initAccordions() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const content = item.querySelector('.accordion-content');
        const isActive = item.classList.contains('active');

        // Close all other items in same accordion
        const parentAccordion = item.closest('.accordion');
        if (parentAccordion) {
          parentAccordion.querySelectorAll('.accordion-item').forEach(other => {
            if (other !== item) {
              other.classList.remove('active');
              const otherContent = other.querySelector('.accordion-content');
              if (otherContent) otherContent.style.maxHeight = null;
            }
          });
        }

        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  // --- 7. BACK TO TOP BUTTON ---
  initBackToTop() {
    const btn = document.querySelector('.back-to-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.miracleApp = new MiracleApp();
});
