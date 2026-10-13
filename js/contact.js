/**
 * MIRACLE WEDDINGS PHOTOGRAPHY — BOOKING & INQUIRY CONTROLLER (contact.js)
 * Form validation, date logic, accessibility alerts, and demo submission flow
 * with direct WhatsApp handoff.
 */

class MiracleContact {
  constructor() {
    this.form = document.getElementById('wedding-inquiry-form');
    this.modal = document.getElementById('success-modal');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.modalRefCode = document.getElementById('modal-ref-code');
    this.modalWhatsappBtn = document.getElementById('modal-whatsapp-link');
    
    this.init();
  }

  init() {
    if (!this.form) return;

    // Set min date to today
    const dateInput = document.getElementById('wedding-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    this.bindFormEvents();
    this.bindModalEvents();
  }

  bindFormEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        this.handleSubmission();
      }
    });

    // Realtime error removal on input
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
      input.addEventListener('change', () => {
        this.clearFieldError(input);
      });
    });
  }

  bindModalEvents() {
    if (this.modalCloseBtn && this.modal) {
      this.modalCloseBtn.addEventListener('click', () => {
        this.closeModal();
      });
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.classList.contains('active')) {
          this.closeModal();
        }
      });
    }
  }

  validateForm() {
    let isValid = true;

    // 1. Full Name
    const nameField = document.getElementById('client-name');
    if (!nameField || nameField.value.trim().length < 2) {
      this.setFieldError(nameField, 'Please enter your full name (minimum 2 characters).');
      isValid = false;
    }

    // 2. Email Address
    const emailField = document.getElementById('client-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField || !emailRegex.test(emailField.value.trim())) {
      this.setFieldError(emailField, 'Please enter a valid email address.');
      isValid = false;
    }

    // 3. Phone / WhatsApp
    const phoneField = document.getElementById('client-phone');
    const digitsOnly = phoneField ? phoneField.value.replace(/\D/g, '') : '';
    if (!phoneField || digitsOnly.length < 10) {
      this.setFieldError(phoneField, 'Please enter a valid 10-digit phone/WhatsApp number.');
      isValid = false;
    }

    // 4. Wedding Date
    const dateField = document.getElementById('wedding-date');
    if (!dateField || !dateField.value) {
      this.setFieldError(dateField, 'Please select your wedding date.');
      isValid = false;
    }

    // 5. Wedding Location
    const locationField = document.getElementById('wedding-location');
    if (!locationField || locationField.value.trim().length < 2) {
      this.setFieldError(locationField, 'Please specify the wedding city or venue location.');
      isValid = false;
    }

    // 6. Event Type
    const eventField = document.getElementById('event-type');
    if (!eventField || !eventField.value) {
      this.setFieldError(eventField, 'Please select your event celebration type.');
      isValid = false;
    }

    // 7. Services
    const serviceField = document.getElementById('required-services');
    if (!serviceField || !serviceField.value) {
      this.setFieldError(serviceField, 'Please select your primary requested service.');
      isValid = false;
    }

    if (!isValid) {
      // Focus first error field
      const firstInvalid = this.form.querySelector('.invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }

    return isValid;
  }

  setFieldError(input, message) {
    if (!input) return;
    input.classList.add('invalid');
    const group = input.closest('.form-group');
    if (group) {
      let errorEl = group.querySelector('.form-error-msg');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
      }
    }
  }

  clearFieldError(input) {
    if (!input) return;
    input.classList.remove('invalid');
    const group = input.closest('.form-group');
    if (group) {
      const errorEl = group.querySelector('.form-error-msg');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
    }
  }

  handleSubmission() {
    const submitBtn = this.form.querySelector('.form-submit-btn');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Inquiry';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        Securing Date...
      `;
    }

    // Extract values for WhatsApp link
    const name = document.getElementById('client-name').value.trim();
    const date = document.getElementById('wedding-date').value.trim();
    const location = document.getElementById('wedding-location').value.trim();
    const eventType = document.getElementById('event-type').value;
    const services = document.getElementById('required-services').value;
    const notes = document.getElementById('client-message') ? document.getElementById('client-message').value.trim() : '';

    // Generate unique inquiry ref ID
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const refCode = `MW-2026-${randomCode}`;

    // Prepare WhatsApp message
    const waText = encodeURIComponent(
      `Hello Miracle Weddings Photography!\n\n` +
      `I have just submitted a wedding inquiry via your website (Ref: ${refCode}).\n` +
      `• Name: ${name}\n` +
      `• Date: ${date}\n` +
      `• City/Venue: ${location}\n` +
      `• Event: ${eventType}\n` +
      `• Services: ${services}\n` +
      (notes ? `• Note: ${notes}\n` : '') +
      `\nCould you please check availability for our wedding? Thank you!`
    );

    const waUrl = `https://wa.me/919025052520?text=${waText}`;

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      if (this.modalRefCode) {
        this.modalRefCode.textContent = `INQUIRY REF: ${refCode}`;
      }

      if (this.modalWhatsappBtn) {
        this.modalWhatsappBtn.href = waUrl;
      }

      this.openModal();
      this.form.reset();
    }, 700);
  }

  openModal() {
    if (!this.modal) return;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Add CSS keyframe for spinner
const styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleEl);

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.miracleContact = new MiracleContact();
});
