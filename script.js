const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const langSelect = document.getElementById('lang-switcher');
const DEFAULT_LANG = localStorage.getItem('lang') || 'en';

async function loadTranslations(lang) {
  try {
    const res = await fetch(`./lang/${lang}.json`);
    const dict = await res.json();
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.documentElement.lang = lang;
  } catch (e) {
    console.error('Translations failed', e);
  }
}

langSelect.value = DEFAULT_LANG;
loadTranslations(DEFAULT_LANG);

langSelect.addEventListener('change', (e) => {
  const lang = e.target.value;
  localStorage.setItem('lang', lang);
  loadTranslations(lang);
});

// Voor nu: stuur het contactformulier nergens heen (we koppelen later).
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Bedankt! (We koppelen dit formulier straks zodat berichten echt aankomen.)');
});
