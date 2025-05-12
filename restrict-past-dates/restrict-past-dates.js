document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // Function to handle select fields (day, month, year)
    function restrictSelectFields(dayField, monthField, yearField) {
        if (!dayField || !monthField || !yearField) return;

        // Remove past years
        Array.from(yearField.options).forEach(option => {
            if (option.value && parseInt(option.value) < currentYear) {
                option.remove();
            }
        });

        function updateDays() {
            const selectedYear = parseInt(yearField.value);
            const selectedMonth = parseInt(monthField.value);

            Array.from(dayField.options).forEach(option => {
                if (!option.value) return;
                let optionDay = parseInt(option.value);

                if (selectedYear === currentYear && selectedMonth === currentMonth && optionDay < currentDay) {
                    option.remove();
                }
            });
        }

        yearField.addEventListener('change', function() {
            // When year changes, remove past months
            let months = Array.from(monthField.options);
            months.forEach(option => {
                if (!option.value) return;
                let optionMonth = parseInt(option.value);

                if (parseInt(yearField.value) === currentYear && optionMonth < currentMonth) {
                    option.remove();
                }
            });

            updateDays();
        });

        monthField.addEventListener('change', updateDays);
        
        // Initial update
        updateDays();
    }

    // Function to handle Flatpickr inputs
    function restrictFlatpickrInputs() {
        if (typeof flatpickr !== "undefined") {
            document.querySelectorAll('input[type="text"].flatpickr-input, input[data-flatpickr]').forEach(function(input) {
                // Only initialize if not already initialized
                if (!input._flatpickr) {
                    flatpickr(input, {
                        minDate: today,
                        dateFormat: input.dataset.dateFormat || "Y-m-d",
                        disableMobile: true
                    });
                }
            });
        }
    }

    // Function to handle native date inputs
    function restrictNativeDateInputs() {
        document.querySelectorAll('input[type="date"]').forEach(function(input) {
            input.min = today.toISOString().split('T')[0];
        });
    }

    // Function to handle WPForms date dropdowns
    function handleWPFormsDateDropdowns() {
        // Find all WPForms date dropdown containers
        document.querySelectorAll('.wpforms-field-date-dropdown-wrap').forEach(function(wrap) {
            const dayField = wrap.querySelector('.wpforms-field-date-time-date-day');
            const monthField = wrap.querySelector('.wpforms-field-date-time-date-month');
            const yearField = wrap.querySelector('.wpforms-field-date-time-date-year');

            if (dayField && monthField && yearField) {
                restrictSelectFields(dayField, monthField, yearField);
            }
        });
    }

    // Function to find other date dropdown groups
    function findOtherDateDropdownGroups() {
        // Find all select elements
        const allSelects = document.querySelectorAll('select:not(.wpforms-field-date-time-date-day):not(.wpforms-field-date-time-date-month):not(.wpforms-field-date-time-date-year)');
        
        // Group selects that are likely part of a date dropdown
        const dateGroups = new Map();
        
        allSelects.forEach(select => {
            const parent = select.parentElement;
            if (!parent) return;
            
            // Check if this select is part of a date group
            const siblings = Array.from(parent.querySelectorAll('select'));
            if (siblings.length >= 3) { // At least 3 selects (day, month, year)
                // Create a unique key for this group
                const key = parent.id || parent.className || parent.tagName + Math.random();
                if (!dateGroups.has(key)) {
                    dateGroups.set(key, siblings);
                }
            }
        });
        
        // Process each group
        dateGroups.forEach(selects => {
            // Try to identify which select is for day, month, year
            const dayField = selects.find(s => 
                s.id.toLowerCase().includes('day') || 
                s.className.toLowerCase().includes('day') ||
                s.name.toLowerCase().includes('day')
            );
            
            const monthField = selects.find(s => 
                s.id.toLowerCase().includes('month') || 
                s.className.toLowerCase().includes('month') ||
                s.name.toLowerCase().includes('month')
            );
            
            const yearField = selects.find(s => 
                s.id.toLowerCase().includes('year') || 
                s.className.toLowerCase().includes('year') ||
                s.name.toLowerCase().includes('year')
            );
            
            if (dayField && monthField && yearField) {
                restrictSelectFields(dayField, monthField, yearField);
            }
        });
    }

    // Function to process all forms
    function processAllForms() {
        // Handle WPForms date dropdowns first
        handleWPFormsDateDropdowns();

        // Handle other date dropdowns
        findOtherDateDropdownGroups();

        // Handle custom date fields
        document.querySelectorAll('form').forEach(form => {
            const customDateFields = form.querySelectorAll('[data-date-field="true"]');
            if (customDateFields.length >= 3) {
                const dayField = form.querySelector('[data-day][data-date-field="true"]');
                const monthField = form.querySelector('[data-month][data-date-field="true"]');
                const yearField = form.querySelector('[data-year][data-date-field="true"]');

                if (dayField && monthField && yearField) {
                    restrictSelectFields(dayField, monthField, yearField);
                }
            }
        });
    }

    // Initial processing
    processAllForms();

    // Handle Flatpickr inputs
    restrictFlatpickrInputs();

    // Handle native date inputs
    restrictNativeDateInputs();

    // Add mutation observer to handle dynamically added forms
    const observer = new MutationObserver(function(mutations) {
        let shouldProcessForms = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                shouldProcessForms = true;
            }
        });

        if (shouldProcessForms) {
            // Process all forms again to catch any new date fields
            processAllForms();
            
            // Handle new date inputs
            restrictFlatpickrInputs();
            restrictNativeDateInputs();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
