
// ===== Faq 
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');

    button.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all open items first (remove this block if you want multiple open at once)
        faqItems.forEach((otherItem) => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Toggle the clicked item
        if (!isOpen) {
            item.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
        }
    });
});

// ===== Form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const statusMsg = document.getElementById('form-status');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError(input, errorId, text) {
        const errorEl = document.getElementById(errorId);
        input.classList.add('input-error');
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = text;
    }

    function clearError(input, errorId) {
        const errorEl = document.getElementById(errorId);
        input.classList.remove('input-error');
        input.removeAttribute('aria-invalid');
        errorEl.textContent = '';
    }

    function validateField(input) {
        const val = input.value.trim();

        if (input === firstName) {
        if (!val) {
            setError(firstName, 'first-name-error', 'First name is required.');
            return false;
        }
        if (val.length < 2) {
            setError(firstName, 'first-name-error', 'Must be at least 2 characters.');
            return false;
        }
        clearError(firstName, 'first-name-error');
        return true;
        }

        if (input === lastName) {
        if (!val) {
            setError(lastName, 'last-name-error', 'Last name is required.');
            return false;
        }
        clearError(lastName, 'last-name-error');
        return true;
        }

        if (input === email) {
        if (!val) {
            setError(email, 'email-error', 'Email address is required.');
            return false;
        }
        if (!emailRegex.test(val)) {
            setError(email, 'email-error', 'Please enter a valid email address.');
            return false;
        }
        clearError(email, 'email-error');
        return true;
        }

        if (input === message) {
        if (!val) {
            setError(message, 'message-error', 'Please enter your message.');
            return false;
        }
        if (val.length < 10) {
            setError(message, 'message-error', 'Message must be at least 10 characters.');
            return false;
        }
        clearError(message, 'message-error');
        return true;
        }

        return true;
    }

    // Real-time validation on blur and typing
    [firstName, lastName, email, message].forEach((input) => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
        if (input.classList.contains('input-error')) {
            validateField(input);
        }
        });
    });

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        statusMsg.textContent = '';

        const isFirstValid = validateField(firstName);
        const isLastValid = validateField(lastName);
        const isEmailValid = validateField(email);
        const isMessageValid = validateField(message);

        if (isFirstValid && isLastValid && isEmailValid && isMessageValid) {
        // Replace this block with fetch() if submitting to a backend/API
        statusMsg.textContent = 'Pesan berhasil terkirim! Terima kasih.';
        form.reset();
        } else {
        // Focus the first invalid field
        const firstInvalid = form.querySelector('.input-error');
        if (firstInvalid) firstInvalid.focus();
        }
    });
});

// ===== Hiding Menu
const navActionMenu = document.querySelector(".nav-action");
const navToggle = document.querySelector(".nav-toggle");
let navIsToggled = false;

navToggle.addEventListener("click", () => {
    navIsToggled = !navIsToggled;
    navActionMenu.classList.toggle('hidden');

    navToggle.innerHTML = navIsToggled ? "&times;" : "&#9776;";
})

// ===== Sign-in/Sign-up Pop Up
const authDialog = document.getElementById('authDialog');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');

// Open Dialog
document.getElementById("sign-in-btn").addEventListener("click", () => {
    authDialog.showModal();
    signInForm.hidden = false;
    signUpForm.hidden = true;
})

document.getElementById("sign-up-btn").addEventListener("click", () => {
    authDialog.showModal();
    signInForm.hidden = true;
    signUpForm.hidden = false;
})

// Switch to Sign In
document.getElementById('tabSignIn').addEventListener('click', () => {
    signInForm.hidden = false;
    signUpForm.hidden = true;
});

// Switch to Sign Up
document.getElementById('tabSignUp').addEventListener('click', () => {
    signInForm.hidden = true;
    signUpForm.hidden = false;
});

// Close via X button or clicking dark backdrop outside .dialog-box
document.getElementById('closeDialogBtn').addEventListener('click', () => authDialog.close());
authDialog.addEventListener('click', (e) => {
    if (e.target === authDialog) authDialog.close();
});