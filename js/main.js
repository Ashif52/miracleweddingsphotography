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
    this.initHeroSlideshow();
    this.initHeaderScroll();
    this.initMobileNav();
    this.initScrollReveal();
    this.initTestimonialCarousel();
    this.initVideoShowreel();
    this.initAccordions();
    this.initBackToTop();
  }

  // --- 0. HERO CINEMATIC SLIDESHOW ---
  initHeroSlideshow() {
    const slideshow = document.getElementById('hero-slideshow');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    const indicators = document.querySelectorAll('.hero-indicator-item');
    const captionNum = document.getElementById('hero-caption-num');
    const captionTitle = document.getElementById('hero-caption-title');

    if (!slides.length) return;

    let currentIndex = 0;
    let autoplayTimer = null;
    const duration = 3200; // Faster cinematic slideshow cadence

    const showSlide = (index) => {
      currentIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });

      if (indicators && indicators.length > 0) {
        indicators.forEach((indicator, i) => {
          const isActive = i === currentIndex;
          indicator.classList.toggle('active', isActive);
          indicator.setAttribute('aria-current', isActive ? 'true' : 'false');

          const bar = indicator.querySelector('.indicator-progress');
          if (bar) {
            bar.style.transition = 'none';
            bar.style.width = '0%';
            if (isActive) {
              void bar.offsetWidth; // Force reflow
              bar.style.transition = `width ${duration}ms linear`;
              bar.style.width = '100%';
            }
          }
        });
      }

      const currentSlide = slides[currentIndex];
      if (currentSlide && captionNum && captionTitle) {
        captionNum.textContent = `0${currentIndex + 1} / 0${slides.length}`;
        captionTitle.textContent = currentSlide.getAttribute('data-title') || '';
      }
    };

    const nextSlide = () => {
      showSlide(currentIndex + 1);
    };

    const prevSlide = () => {
      showSlide(currentIndex - 1);
    };

    const startAutoplay = () => {
      stopAutoplay();
      showSlide(currentIndex);
      autoplayTimer = setInterval(nextSlide, duration);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
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

    if (indicators && indicators.length > 0) {
      indicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => {
          showSlide(idx);
          resetAutoplay();
        });
      });
    }

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopAutoplay);
      heroSection.addEventListener('mouseleave', startAutoplay);
    }

    // Touch swipe support
    let touchStartX = 0;
    slideshow.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    slideshow.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        nextSlide();
      } else if (touchEndX - touchStartX > 45) {
        prevSlide();
      }
      startAutoplay();
    }, { passive: true });

    // Keyboard navigation when near top of page
    document.addEventListener('keydown', (e) => {
      if (window.scrollY < 600) {
        if (e.key === 'ArrowRight') {
          nextSlide();
          resetAutoplay();
        } else if (e.key === 'ArrowLeft') {
          prevSlide();
          resetAutoplay();
        }
      }
    });

    // Start slideshow
    startAutoplay();
  }

  // --- 1. HEADER SCROLL INTERACTION ---
  initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    const progressBar = document.getElementById('scroll-progress');

    const updateHeader = () => {
      const currentScrollY = window.scrollY;

      // 1. Frosted glass elevated state
      if (currentScrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // 2. Hide on scroll down, reveal on scroll up
      const scrollDiff = currentScrollY - lastScrollY;

      if (currentScrollY > 120) {
        if (scrollDiff > 6) {
          // Scrolling down - hide nav to let visual content shine
          header.classList.add('nav-hidden');
        } else if (scrollDiff < -4) {
          // Scrolling up - smoothly bring nav back
          header.classList.remove('nav-hidden');
        }
      } else {
        // At the top - always show
        header.classList.remove('nav-hidden');
      }

      // 3. Hairline scroll progress indicator
      if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const progress = Math.min(100, Math.max(0, (currentScrollY / docHeight) * 100));
          progressBar.style.width = `${progress}%`;
        }
      }

      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    updateHeader();
  }

  // --- 2. MOBILE NAVIGATION DRAWER ---
  initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const navLinks = document.querySelectorAll('.mobile-nav-link');
    const closeBtns = document.querySelectorAll('.mobile-nav-close, #mobile-drawer-close');

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

    closeBtns.forEach(btn => {
      btn.addEventListener('click', closeDrawer);
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
