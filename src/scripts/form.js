const form = document.getElementById('contact-form');

// Pre-fill device field from URL query (?device=iPhone+15+Pro)
(() => {
  const params = new URLSearchParams(window.location.search);
  const device = params.get('device');
  if (!device) return;
  const field = document.getElementById('device');
  if (field) {
    field.value = device;
    setTimeout(() => {
      field.scrollIntoView({ behavior: 'smooth', block: 'center' });
      field.focus();
    }, 400);
  }
})();

if (form) {
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');
  const formErrorGlobal = document.getElementById('form-error-global');

  // Accept various Czech phone formats: +420 123 456 789, 00420123456789,
  // 123 456 789, 123456789, with/without spaces/dashes/parens.
  const isValidPhone = (raw) => {
    const cleaned = raw.replace(/[\s\-().]/g, '');
    return /^(\+420|00420)?\d{9}$/.test(cleaned);
  };

  const validate = () => {
    let isValid = true;
    form.querySelectorAll('[required]').forEach((field) => {
      const errorEl = field.closest('.form-group')?.querySelector('.form-error');
      const value = field.type === 'checkbox' ? field.checked : field.value.trim();
      if (!value) {
        field.classList.add('error');
        if (errorEl) errorEl.textContent = 'Toto pole je povinné.';
        isValid = false;
      } else if (field.type === 'email' && !/\S+@\S+\.\S+/.test(field.value)) {
        field.classList.add('error');
        if (errorEl) errorEl.textContent = 'Zadejte platný e-mail.';
        isValid = false;
      } else if (field.type === 'tel' && !isValidPhone(field.value)) {
        field.classList.add('error');
        if (errorEl) errorEl.textContent = 'Zadejte platné telefonní číslo (9 číslic, +420 volitelné).';
        isValid = false;
      } else {
        field.classList.remove('error');
        if (errorEl) errorEl.textContent = '';
      }
    });

    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value && !emailField.hasAttribute('required')) {
      const errorEl = emailField.closest('.form-group')?.querySelector('.form-error');
      if (!/\S+@\S+\.\S+/.test(emailField.value)) {
        emailField.classList.add('error');
        if (errorEl) errorEl.textContent = 'Zadejte platný e-mail.';
        isValid = false;
      }
    }

    return isValid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const btnText = submitBtn?.querySelector('.btn-text');
    const spinner = submitBtn?.querySelector('.btn-spinner');

    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Odesílám...';
    spinner?.removeAttribute('hidden');
    if (formSuccess) formSuccess.hidden = true;
    if (formErrorGlobal) formErrorGlobal.hidden = true;

    try {
      // Web3Forms (https://web3forms.com) — POST FormData, očekává JSON response.
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        form.reset();
        if (formSuccess) {
          formSuccess.hidden = false;
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        throw new Error(data.message || 'Server error');
      }
    } catch {
      if (formErrorGlobal) formErrorGlobal.hidden = false;
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Odeslat poptávku';
      spinner?.setAttribute('hidden', '');
    }
  });

  form.querySelectorAll('input, textarea, select').forEach((field) => {
    field.addEventListener('blur', () => {
      const value = field.type === 'checkbox' ? field.checked : field.value.trim();
      if (value) validate();
    });
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        field.classList.remove('error');
        const errorEl = field.closest('.form-group')?.querySelector('.form-error');
        if (errorEl) errorEl.textContent = '';
      }
    });
  });
}
