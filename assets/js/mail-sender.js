import { showPositionSwal } from "./sweet-alert.js";
import CONFIG from "../config/config.js";
import { addSpinnerToSubmitBtn, removeSpinnerToSubmitBtn, validateEmail, validateField } from "./form-validations.js";
document.addEventListener("DOMContentLoaded", () => {
    emailjs.init(CONFIG.CFG_MAILJS_USER_KEY);

    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('#submit-btn');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('is-invalid', 'is-valid');
            const invalidFeedback = input.nextElementSibling;
            if (invalidFeedback) invalidFeedback.style.display = 'none';
            const validFeedback = input.nextElementSibling.nextElementSibling;
            if (validFeedback) validFeedback.style.display = 'none';
        });

        let isValid = true;

        isValid &= validateField(form.querySelector('#name'), { required: true, minLength: 5, maxLength: 50 });
        isValid &= validateEmail(form.querySelector('#email'));
        isValid &= validateField(form.querySelector('#subject'), { required: true, minLength: 5, maxLength: 100 });
        isValid &= validateField(form.querySelector('#message'), { required: true, minLength: 10, maxLength: 1000 });

        if (isValid) {
            addSpinnerToSubmitBtn(submitBtn);
            emailjs.sendForm(CONFIG.CFG_MAILJS_SERVICE_KEY, CONFIG.CFG_MAILJS_TEMPLATE_KEY, form)
                .then(() => {
                    showPositionSwal("center", "success", `Correo enviado correctamente`, false, 2500);
                }, (error) => {
                    showPositionSwal("center", "error", error.text, false, 2500);
                });
            removeSpinnerToSubmitBtn(submitBtn);
        }
    });
});


