import { scrollElementIntoView } from './index';

const isValidUserNameLength = value => {
    return /(?=.{3,}$)/.test(value);
};

const isValidPasswordLength = value => {
    return /(?=.{3,}$)/.test(value);
};

const validateFieldsHandler = param => {
    const field = param && 'nodeType' in param ? param : param.target;
    const customErrorMessage = field.getAttribute('data-validate-message');
    let errorMessage = '';
    let isError = false;
    const { value, name, minLength, maxLength, classList, parentNode } = field;

    switch (name) {
        // special cases based on input name
        case 'username':
            if (!isValidUserNameLength(value)) {
                isError = true;
                errorMessage = 'Username must be at least 3 characters long.';
            }
            break;
        case 'password':
            if (!isValidPasswordLength(value)) {
                isError = true;
                errorMessage = 'Password must be at least 3 characters long.';
            }
            break;

        // General cases if minLength and maxLength are provided
        default:
            if (value.length === 0 || (minLength > 0 && minLength > value.length)) {
                isError = true;
                if (minLength > 0 && maxLength > 0) {
                    errorMessage = `${minLength} - ${maxLength} characters.`;
                } else if (minLength > 0) {
                    errorMessage = `Min. ${minLength} characters.`;
                } else if (maxLength > 0) {
                    errorMessage = `Max ${maxLength} characters.`;
                } else {
                    errorMessage = 'The field cannot be empty';
                }
            }
            break;
    }

    if (isError) {
        classList.add('validate-error');
        parentNode.setAttribute('data-error', customErrorMessage || errorMessage);
    } else {
        classList.remove('validate-error');
        parentNode.removeAttribute('data-error');
    }
    return isError;
};

const ValidateRequiredInputs = formEl => {
    if (!formEl) return false;
    let firstInvalidFieldEl = null;
    const fields = formEl.querySelectorAll('[required]:not([disabled])'); // get all required input elements
    if (fields.length > 0) {
        fields.forEach(input => {
            const isError = validateFieldsHandler(input); // check if input is valid
            const { parentNode } = input;
            if (isError) {
                parentNode.classList.add('show-error');
                setTimeout(() => {
                    parentNode.classList.remove('show-error');
                }, 2000);
                input.addEventListener('keyup', validateFieldsHandler);
            } else {
                parentNode.classList.remove('show-error');
                input.removeEventListener('keyup', validateFieldsHandler);
            }
            if (firstInvalidFieldEl === null && isError) firstInvalidFieldEl = input; // detect the first invalid input
        });
    }

    if (firstInvalidFieldEl) scrollElementIntoView(firstInvalidFieldEl); // scroll to the first invalid input
    return firstInvalidFieldEl !== null;
};

export default ValidateRequiredInputs;
