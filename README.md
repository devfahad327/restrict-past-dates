# Restrict Past Dates for Forms

**Contributors:** Sheikh Abdul Fahad  
**Tags:** date picker, restrict dates, form validation, flatpickr, WPForms, custom forms  
**Requires at least:** 5.0  
**Tested up to:** 6.5  
**Requires PHP:** 7.2  
**Stable tag:** 2.1  
**License:** GPLv2 or later  
**License URI:** https://www.gnu.org/licenses/gpl-2.0.html  

A WordPress plugin that disables selection of past dates in all types of forms using dropdowns, native date inputs, or Flatpickr.

---

## 🎯 Features

- Automatically disables past:
  - Years, months, and days in `<select>` dropdowns
  - Native HTML5 date inputs (`<input type="date">`)
  - Flatpickr-enabled fields
- Works with:
  - WPForms date dropdowns
  - Custom form fields (with `data-day`, `data-month`, `data-year`)
  - Dynamically loaded forms (via AJAX or builders)
- Lightweight and dependency-free (except jQuery for compatibility)

---

## 🛠 How It Works

The script detects date fields and removes any past options based on the current date. It uses MutationObserver to support dynamically added forms.

### Supported Field Types:

- `select`-based date fields (day, month, year)
- Native date inputs (`<input type="date">`)
- Flatpickr (`<input class="flatpickr-input">`)

---

## 📦 Installation

1. Download or clone the plugin.
2. Upload the folder to `/wp-content/plugins/restrict-past-dates/`
3. Activate via **Plugins > Installed Plugins** in WordPress.
4. The script runs automatically on all forms.

---

## 📂 File Structure


---

## 📌 Notes

- Flatpickr must be initialized with a specific class or `data-flatpickr` attribute for detection.
- Forms using non-standard field names should use:
  ```html
  <select data-date-field="true" data-day></select>
  <select data-date-field="true" data-month></select>
  <select data-date-field="true" data-year></select>



Let me know if you'd like to include installation screenshots or GitHub usage instructions.
