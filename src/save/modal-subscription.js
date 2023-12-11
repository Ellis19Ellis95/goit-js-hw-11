document.addEventListener("DOMContentLoaded", function() {
    var registeredEmails = []; 
    
    var modal = document.querySelector('[data-modal]');
    var closeButton = modal.querySelector('[data-modal-close]');
    var form = document.querySelector('.form-footer');
    var newModal = document.querySelector('.backdrop');
  
    var closeButton2 = document.querySelector('.backdrop.is-hidden-2 [data-modal-close]');
    var newModal2 = document.querySelector('.backdrop.is-hidden-2');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var emailInput = form.querySelector('.input-label').value.toLowerCase(); 
      if (!registeredEmails.includes(emailInput)) { 
        registeredEmails.push(emailInput); 
        newModal.classList.remove('is-hidden-1');
      } else {
        if (newModal2.classList.contains('is-hidden-1')) {
          newModal2.classList.remove('is-hidden-1');
        } else {
          newModal2.classList.remove('is-hidden-2');
        }
      }
    });
  
    closeButton.addEventListener('click', function() {
      newModal.classList.add('is-hidden-1');
    });
  
    closeButton2.addEventListener('click', function() {
      newModal2.classList.add('is-hidden-2');
    });
  });