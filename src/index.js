function displayModal(imageUrl) {
  const modal = document.getElementById('myModal');
  const modalContent = document.querySelector('.modal-content');

  modalContent.innerHTML = `<img src="${imageUrl}" alt="Modal Image" />`;

  modal.style.display = 'block';
}


function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}


function checkEmailStatus(email) {
  
  if (email === 'elena.gudz1995@gmail.com') {
   
    const registeredEmail = localStorage.getItem('registeredEmail');

    if (registeredEmail === email) {
      // previously registered
      displayModal('/src/images/2reg.jpg');
    } else {
      // new registration
      displayModal('/src/images/1reg.jpg');
      
      localStorage.setItem('registeredEmail', email);
    }
  } else {
    
    console.log('Invalid email');
  }
}


document.querySelector('.footer-form').addEventListener('submit', function (event) {
  event.preventDefault(); 

  const emailInput = document.querySelector('.footer-input');
  const enteredEmail = emailInput.value;

  
  if (validateEmail(enteredEmail)) {
    
    checkEmailStatus(enteredEmail);
  } else {
    
    console.log('Invalid email format');
  }
});


const modal = document.getElementById('myModal');
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};


const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});