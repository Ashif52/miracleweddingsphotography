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

    this.initCustomSelects();
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
        if (firstInvalid.classList.contains('custom-select-native')) {
          const trig = firstInvalid.closest('.form-group')?.querySelector('.custom-select-trigger');
          if (trig) trig.focus();
        } else {
          firstInvalid.focus();
        }
      }
    }

    return isValid;
  }

  setFieldError(input, message) {
    if (!input) return;
    input.classList.add('invalid');
    const group = input.closest('.form-group');
    if (group) {
      const trigger = group.querySelector('.custom-select-trigger');
      if (trigger) trigger.classList.add('invalid');
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
      const trigger = group.querySelector('.custom-select-trigger');
      if (trigger) trigger.classList.remove('invalid');
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
      this.resetCustomSelects();
    }, 700);
  }

  initCustomSelects() {
    const nativeSelects = this.form.querySelectorAll('select.form-select');
    nativeSelects.forEach(select => {
      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'custom-select-wrapper';
      wrapper.setAttribute('data-select-id', select.id);

      // Trigger button
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'custom-select-trigger form-input';
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');

      const selectedOption = select.options[select.selectedIndex] || select.options[0];
      const initialText = selectedOption ? selectedOption.text : 'Select Option';
      const isPlaceholder = !select.value;

      trigger.innerHTML = `
        <span class="custom-select-label ${isPlaceholder ? 'is-placeholder' : ''}">${this.escapeHtml(initialText)}</span>
        <span class="custom-select-chevron" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      `;

      // Menu container
      const menu = document.createElement('div');
      menu.className = 'custom-select-menu';
      menu.setAttribute('role', 'listbox');

      Array.from(select.options).forEach(opt => {
        const optionEl = document.createElement('div');
        optionEl.className = 'custom-select-option';
        optionEl.setAttribute('role', 'option');
        optionEl.setAttribute('data-value', opt.value);
        if (opt.value === select.value) {
          optionEl.classList.add('is-selected');
        }
        if (!opt.value) {
          optionEl.classList.add('is-placeholder');
        }

        let optionText = opt.text;
        let badgeHtml = '';
        if (optionText.includes('(Recommended)')) {
          optionText = optionText.replace('(Recommended)', '').trim();
          badgeHtml = '<span class="option-pill-badge">Recommended</span>';
        }

        optionEl.innerHTML = `
          <span class="option-text">${this.escapeHtml(optionText)}</span>
          ${badgeHtml}
          <span class="option-checkmark" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        `;

        optionEl.addEventListener('click', (e) => {
          e.stopPropagation();
          select.value = opt.value;
          
          // Update trigger label
          const labelEl = trigger.querySelector('.custom-select-label');
          if (labelEl) {
            labelEl.textContent = opt.text;
            labelEl.classList.toggle('is-placeholder', !opt.value);
          }

          // Update active option styling
          menu.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('is-selected'));
          optionEl.classList.add('is-selected');

          // Close dropdown
          closeDropdown();

          // Dispatch change event to validate & clear any error
          select.dispatchEvent(new Event('change', { bubbles: true }));
          select.dispatchEvent(new Event('input', { bubbles: true }));
          trigger.classList.remove('invalid');
        });

        menu.appendChild(optionEl);
      });

      const openDropdown = () => {
        // Close all other dropdowns first
        document.querySelectorAll('.custom-select-wrapper.is-open').forEach(w => {
          if (w !== wrapper) {
            w.classList.remove('is-open');
            const otherTrig = w.querySelector('.custom-select-trigger');
            if (otherTrig) otherTrig.setAttribute('aria-expanded', 'false');
          }
        });

        wrapper.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      };

      const closeDropdown = () => {
        wrapper.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      };

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (wrapper.classList.contains('is-open')) {
          closeDropdown();
        } else {
          openDropdown();
        }
      });

      // Insert wrapper and hide native select visually
      select.classList.add('custom-select-native');
      select.parentNode.insertBefore(wrapper, select.nextSibling);
      wrapper.appendChild(trigger);
      wrapper.appendChild(menu);
      wrapper.appendChild(select);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-wrapper.is-open').forEach(w => {
          w.classList.remove('is-open');
          const t = w.querySelector('.custom-select-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.custom-select-wrapper.is-open').forEach(w => {
          w.classList.remove('is-open');
          const t = w.querySelector('.custom-select-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  resetCustomSelects() {
    this.form.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
      const select = wrapper.querySelector('select');
      const trigger = wrapper.querySelector('.custom-select-trigger');
      const labelEl = trigger ? trigger.querySelector('.custom-select-label') : null;
      const menu = wrapper.querySelector('.custom-select-menu');
      if (select && labelEl) {
        const firstOpt = select.options[0];
        labelEl.textContent = firstOpt ? firstOpt.text : 'Select Option';
        labelEl.classList.add('is-placeholder');
      }
      if (menu) {
        menu.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('is-selected'));
      }
      if (trigger) trigger.classList.remove('invalid');
      wrapper.classList.remove('is-open');
    });
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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
