export const addSpinnerToSubmitBtn = (btn) => {
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    btn.disabled = true;
}

export const removeSpinnerToSubmitBtn = (btn, innerTxt) => {
    btn.disabled = false;
    btn.innerText = innerTxt;
}

export const validateField = (input, { minLength, maxLength, required, pattern }) => {
    const value = input.value.trim();
    const placeholder = input.placeholder;

    if (required && !value) {
        showValidationMessage(input, false, `${placeholder} es requerido.`);
        return false;
    }

    if (minLength && value.length < minLength) {
        showValidationMessage(input, false, `${placeholder} debe tener al menos ${minLength} caracteres.`);
        return false;
    }

    if (maxLength && value.length > maxLength) {
        showValidationMessage(input, false, `${placeholder} no puede superar los ${maxLength} caracteres.`);
        return false;
    }

    if (pattern && !pattern.test(value)) {
        showValidationMessage(input, false, `${placeholder} no tiene un formato válido.`);
        return false;
    }

    showValidationMessage(input, true, `${placeholder} es válido.`);
    return true;
}

export const validateEmail = (input) =>  {
    const emailPattern = /\S+@\S+\.\S+/;
    return validateField(input, {
        required: true,
        pattern: emailPattern
    });
}

const showValidationMessage = (input, isValid, message) => {
    const invalidFeedback = input.nextElementSibling;
    const validFeedback = input.nextElementSibling.nextElementSibling;

    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        invalidFeedback.style.display = 'none';
        validFeedback.style.display = 'block';
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        invalidFeedback.textContent = message;
        invalidFeedback.style.display = 'block';
        validFeedback.style.display = 'none';
    }
}