document.addEventListener('DOMContentLoaded', function() {
    const modalButtons = document.querySelectorAll('[data-modal-close]');
    const modal1 = document.querySelector('.is-hidden-1');
    const modal2 = document.querySelector('.is-hidden-2');
    const form = document.querySelector('.footer-form');

    const enteredEmails = new Map(); // Об'єкт для зберігання електронних адрес

    function isEmailRegistered(email) {
        return enteredEmails.has(email.trim().toLowerCase());
    }

    function handleRegistration(email) {
        const lowerCasedEmail = email.trim().toLowerCase();
        if (!isEmailRegistered(lowerCasedEmail)) {
            enteredEmails.set(lowerCasedEmail, true);
            modal1.classList.remove('is-hidden-1');
        } else {
            modal2.classList.remove('is-hidden-2');
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = e.target.querySelector('.footer-input').value;
        handleRegistration(email);
    });

    modalButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const modal = this.closest('[data-modal]');
            modal.classList.add('is-hidden-1');
            modal.classList.add('is-hidden-2');
        });
    });
});