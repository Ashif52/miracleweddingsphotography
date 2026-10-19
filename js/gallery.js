/**
 * MIRACLE WEDDINGS PHOTOGRAPHY — GALLERY & PORTFOLIO ENGINE
 * Handles authentic asset registry, category filtering, accessible lightbox,
 * and wedding story details.
 */

// --- 1. AUTHENTIC ASSET REGISTRY ---
// Built strictly from verified, authorized Sony A7R IV photographs
const PORTFOLIO_ASSETS = [
  {
    id: 'thali-dharanam',
    title: 'Thaali Dharanam & Sacred Vows',
    category: 'weddings',
    categoryLabel: 'Traditional Wedding',
    image: 'assets/images/dsc09924_3_copy.jpg',
    thumb: 'assets/thumbnails/dsc09924_3_copy.jpg',
    description: 'The sacred, unscripted moment of the Mangalya Dharanam as the groom ties the sacred knot, surrounded by joyous family and a shower of fragrant rose petals.',
    orientation: 'landscape',
    couple: 'Swathi & Bharath',
    location: 'Chennai, Tamil Nadu'
  },
  {
    id: 'golden-silk-embrace',
    title: 'Intimacy in Kanchipuram Gold',
    category: 'weddings',
    categoryLabel: 'Traditional Wedding',
    image: 'assets/images/dsc00775_copy.jpg',
    thumb: 'assets/thumbnails/dsc00775_copy.jpg',
    description: 'South Indian bride in hand-woven copper-gold Kanchipuram silk gently holding her groom’s cheek under the warm glow of an illuminated floral arch.',
    orientation: 'landscape',
    couple: 'Swathi & Bharath',
    location: 'Chennai'
  },
  {
    id: 'maalai-maatral-joy',
    title: 'The High Spirits of Maalai Maatral',
    category: 'candid',
    categoryLabel: 'Candid Joy',
    image: 'assets/images/dsc02736_copy.jpg',
    thumb: 'assets/thumbnails/dsc02736_copy.jpg',
    description: 'Pure spontaneous ecstasy as the bride is hoisted high upon family shoulders, laughing radiantly while exchanging fragrant jasmine and red rose garlands.',
    orientation: 'landscape',
    couple: 'Priya & Ashwin',
    location: 'Coimbatore, Tamil Nadu'
  },
  {
    id: 'cathedral-flying-veil',
    title: 'Cathedral Vows & Flowing Silk',
    category: 'weddings',
    categoryLabel: 'Church Wedding',
    image: 'assets/images/19.jpg',
    thumb: 'assets/thumbnails/19.jpg',
    description: 'A grand church ceremony portrait with the bride’s cathedral veil sweeping dramatically through the coastal breeze against historic white colonnades.',
    orientation: 'landscape',
    couple: 'Klinton & Dorathy',
    location: 'St. Mary’s Cathedral, Chennai'
  },
  {
    id: 'bokeh-golden-hour',
    title: 'Tender Whispers & Golden Bokeh',
    category: 'prewedding',
    categoryLabel: 'Pre-Wedding',
    image: 'assets/images/dsc00828_copy.jpg',
    thumb: 'assets/thumbnails/dsc00828_copy.jpg',
    description: 'An intimate portrait enveloped in dreamy golden foreground bokeh, capturing the quiet warmth between the couple in festive silk attire.',
    orientation: 'portrait',
    couple: 'Swathi & Bharath',
    location: 'Chennai'
  },
  {
    id: 'lotus-reception-stage',
    title: 'Opulence Under the Lotus Mandap',
    category: 'receptions',
    categoryLabel: 'Grand Reception',
    image: 'assets/images/dsc00479_copy.jpg',
    thumb: 'assets/thumbnails/dsc00479_copy.jpg',
    description: 'A breathtaking royal reception stage featuring a tiered golden lotus installation, cascading ceiling greens, and contemporary royal styling.',
    orientation: 'landscape',
    couple: 'Ananya & Siddharth',
    location: 'ITC Grand Chola, Chennai'
  },
  {
    id: 'starry-night-romance',
    title: 'Under the Starlit Canopy',
    category: 'receptions',
    categoryLabel: 'Evening Reception',
    image: 'assets/images/dsc01751_copy.jpg',
    thumb: 'assets/thumbnails/dsc01751_copy.jpg',
    description: 'Dramatic outdoor night portrait with warm backlight rim glow framing the couple holding hands under an open starlit sky and glowing lantern pathway.',
    orientation: 'landscape',
    couple: 'Ananya & Siddharth',
    location: 'Mahabalipuram'
  },
  {
    id: 'moonlit-chandelier-silhouette',
    title: 'Fine Art Moonlit Silhouette',
    category: 'receptions',
    categoryLabel: 'Grand Reception',
    image: 'assets/images/dsc02153_copy.jpg',
    thumb: 'assets/thumbnails/dsc02153_copy.jpg',
    description: 'An evocative cinematic silhouette set against an illuminated lunar disc beneath an opulent crystal chandelier and candlelit stage.',
    orientation: 'landscape',
    couple: 'Editorial Showcase',
    location: 'Chennai'
  },
  {
    id: 'cathedral-veil-intimacy',
    title: 'Enveloped in Cathedral Lace',
    category: 'weddings',
    categoryLabel: 'Church Wedding',
    image: 'assets/images/m17.jpg',
    thumb: 'assets/thumbnails/m17.jpg',
    description: 'Intimate portrait of the bride and groom cocooned together under a delicate hand-embroidered veil outside palatial architectural arches.',
    orientation: 'landscape',
    couple: 'Klinton & Dorathy',
    location: 'Chennai'
  },
  {
    id: 'veil-radiance-close',
    title: 'Radiance Behind the Sheer Veil',
    category: 'bridal',
    categoryLabel: 'Bridal Portrait',
    image: 'assets/images/m19.jpg',
    thumb: 'assets/thumbnails/m19.jpg',
    description: 'A luminous close-up of uninhibited bride smiles and tender gazes beneath the veil, epitomizing high-fashion editorial wedding portraiture.',
    orientation: 'landscape',
    couple: 'Klinton & Dorathy',
    location: 'Chennai'
  },
  {
    id: 'palace-stone-walk',
    title: 'Palatial Steps & Togetherness',
    category: 'prewedding',
    categoryLabel: 'Pre-Wedding',
    image: 'assets/images/m8.jpg',
    thumb: 'assets/thumbnails/m8.jpg',
    description: 'The couple walking hand-in-hand down wet palace stone stairs with reflections and laughter, blending timeless European architecture with Indian grace.',
    orientation: 'portrait',
    couple: 'Klinton & Dorathy',
    location: 'Chennai'
  },
  {
    id: 'groomsmen-editorial',
    title: 'The Brotherhood in Ivory & Tuxedo',
    category: 'candid',
    categoryLabel: 'Candid Moments',
    image: 'assets/images/m21.jpg',
    thumb: 'assets/thumbnails/m21.jpg',
    description: 'Slick editorial portrait of the groom in tailored ivory tuxedo and dark shades surrounded by his closest groomsmen in classic black bowties.',
    orientation: 'landscape',
    couple: 'Klinton & Groomsmen',
    location: 'Chennai'
  },
  {
    id: 'groom-preparation',
    title: 'Cufflinks & Brotherhood',
    category: 'candid',
    categoryLabel: 'Candid Moments',
    image: 'assets/images/m9.jpg',
    thumb: 'assets/thumbnails/m9.jpg',
    description: 'Groomsmen assisting the groom with cufflinks in the hotel suite before the ceremony, capturing candid pre-wedding camaraderie.',
    orientation: 'landscape',
    couple: 'Groom Getting Ready',
    location: 'Chennai'
  },
  {
    id: 'ring-drop-minimalism',
    title: 'The Gravity of Forever: The Rings',
    category: 'candid',
    categoryLabel: 'Fine Art Details',
    image: 'assets/images/15.jpg',
    thumb: 'assets/thumbnails/15.jpg',
    description: 'Fine art minimalist silhouette of the bride and groom’s hands suspending wedding bands mid-air in high-key monochrome elegance.',
    orientation: 'portrait',
    couple: 'Ring Ceremony',
    location: 'Studio Session'
  },
  {
    id: 'monochrome-silhouette',
    title: 'Profile in Sacred Monochrome',
    category: 'bridal',
    categoryLabel: 'Bridal Portrait',
    image: 'assets/images/dsc03955_copy.jpg',
    thumb: 'assets/thumbnails/dsc03955_copy.jpg',
    description: 'Timeless black-and-white rim-lit profile portrait showcasing intricate traditional temple hair ornaments and quiet devotion.',
    orientation: 'landscape',
    couple: 'Editorial Fine Art',
    location: 'Chennai'
  }
];

// --- 2. GALLERY CONTROLLER & LIGHTBOX ---
class MiracleGallery {
  constructor() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const initialCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'weddings';
    this.currentCategory = initialCategory;
    if (initialCategory === 'all') {
      this.filteredAssets = [...PORTFOLIO_ASSETS];
    } else {
      this.filteredAssets = PORTFOLIO_ASSETS.filter(item => item.category === initialCategory);
    }
    this.currentLightboxIndex = 0;
    
    // DOM Elements
    this.gridElement = document.getElementById('masonry-grid');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.lightboxModal = document.getElementById('lightbox-modal');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxCounter = document.getElementById('lightbox-counter');
    this.lightboxTitle = document.getElementById('lightbox-caption-title');
    this.lightboxDesc = document.getElementById('lightbox-caption-desc');
    this.lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    this.lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
    this.lightboxNextBtn = document.getElementById('lightbox-next-btn');

    this.init();
  }

  init() {
    if (this.gridElement) {
      this.renderGrid();
      this.bindFilters();
    }
    this.bindLightboxEvents();
  }

  renderGrid() {
    if (!this.gridElement) return;
    this.gridElement.innerHTML = '';

    this.filteredAssets.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `masonry-item reveal-fade-up ${item.orientation === 'portrait' ? 'item-portrait' : 'item-landscape'}`;
      card.setAttribute('data-id', item.id);
      card.setAttribute('data-category', item.category);

      card.innerHTML = `
        <img class="masonry-img" 
             src="${item.thumb}" 
             alt="${item.title} — Miracle Weddings Photography" 
             loading="lazy" 
             width="${item.orientation === 'portrait' ? '640' : '800'}" 
             height="${item.orientation === 'portrait' ? '800' : '533'}">
        <div class="masonry-overlay">
          <div class="masonry-glass-badge">
            <span class="masonry-category">${item.categoryLabel}</span>
            <h3 class="masonry-title">${item.title}</h3>
            ${item.couple ? `<span class="masonry-meta">${item.couple}${item.location ? ` · ${item.location}` : ''}</span>` : ''}
          </div>
        </div>
        <div class="masonry-zoom-icon" aria-label="View photo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </div>
      `;

      card.addEventListener('click', () => {
        this.openLightbox(index);
      });

      this.gridElement.appendChild(card);
    });

    // Re-trigger scroll reveal if window.miracleApp exists
    if (window.miracleApp && typeof window.miracleApp.refreshObserver === 'function') {
      window.miracleApp.refreshObserver();
    }
  }

  bindFilters() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetCategory = e.currentTarget.getAttribute('data-filter');
        this.filterButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        this.currentCategory = targetCategory;
        if (targetCategory === 'all') {
          this.filteredAssets = [...PORTFOLIO_ASSETS];
        } else {
          this.filteredAssets = PORTFOLIO_ASSETS.filter(item => item.category === targetCategory);
        }

        // Fade transition
        if (this.gridElement) {
          this.gridElement.style.opacity = '0';
          setTimeout(() => {
            this.renderGrid();
            this.gridElement.style.opacity = '1';
          }, 180);
        }
      });
    });
  }

  bindLightboxEvents() {
    if (!this.lightboxModal) return;

    if (this.lightboxCloseBtn) {
      this.lightboxCloseBtn.addEventListener('click', () => this.closeLightbox());
    }

    if (this.lightboxPrevBtn) {
      this.lightboxPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prevImage();
      });
    }

    if (this.lightboxNextBtn) {
      this.lightboxNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextImage();
      });
    }

    // Backdrop click close
    this.lightboxModal.addEventListener('click', (e) => {
      if (e.target === this.lightboxModal || e.target.classList.contains('lightbox-body')) {
        this.closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowRight') this.nextImage();
      if (e.key === 'ArrowLeft') this.prevImage();
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    this.lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        this.nextImage(); // Swipe left -> next
      } else if (touchEndX - touchStartX > 50) {
        this.prevImage(); // Swipe right -> prev
      }
    }, { passive: true });
  }

  openLightbox(index) {
    if (!this.lightboxModal) return;
    this.currentLightboxIndex = index;
    this.updateLightboxContent();
    this.lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    if (!this.lightboxModal) return;
    this.lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  updateLightboxContent() {
    const item = this.filteredAssets[this.currentLightboxIndex];
    if (!item) return;

    if (this.lightboxImg) {
      this.lightboxImg.style.opacity = '0';
      this.lightboxImg.src = item.image;
      this.lightboxImg.alt = `${item.title} — Miracle Weddings Photography`;
      this.lightboxImg.onload = () => {
        this.lightboxImg.style.opacity = '1';
      };
    }

    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${this.currentLightboxIndex + 1} / ${this.filteredAssets.length}`;
    }

    if (this.lightboxTitle) {
      this.lightboxTitle.textContent = item.title;
    }

    if (this.lightboxDesc) {
      this.lightboxDesc.textContent = `${item.couple} • ${item.location} — ${item.description}`;
    }

    // Preload adjacent images
    this.preloadAdjacent();
  }

  prevImage() {
    if (this.filteredAssets.length <= 1) return;
    this.currentLightboxIndex = (this.currentLightboxIndex - 1 + this.filteredAssets.length) % this.filteredAssets.length;
    this.updateLightboxContent();
  }

  nextImage() {
    if (this.filteredAssets.length <= 1) return;
    this.currentLightboxIndex = (this.currentLightboxIndex + 1) % this.filteredAssets.length;
    this.updateLightboxContent();
  }

  preloadAdjacent() {
    const nextIdx = (this.currentLightboxIndex + 1) % this.filteredAssets.length;
    const prevIdx = (this.currentLightboxIndex - 1 + this.filteredAssets.length) % this.filteredAssets.length;
    
    const imgNext = new Image();
    imgNext.src = this.filteredAssets[nextIdx].image;
    
    const imgPrev = new Image();
    imgPrev.src = this.filteredAssets[prevIdx].image;
  }
}

// Global export
window.MiracleGallery = MiracleGallery;
window.PORTFOLIO_ASSETS = PORTFOLIO_ASSETS;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.miracleGalleryInstance = new MiracleGallery();
});
