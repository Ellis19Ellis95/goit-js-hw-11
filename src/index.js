function validateEmail(email) {
  const validEmail = 'elena.gudz1995@gmail.com';
  return email.trim().toLowerCase() === validEmail;
}

function isEmailRegistered(email) {
  return email.trim().toLowerCase() === 'elena.gudz1995@gmail.com';
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
}

function handleRegistration(email) {
  const modal1Id = 'myModal1';
  const modal2Id = 'myModal2';

  if (validateEmail(email)) {
    if (isEmailRegistered(email)) {
      openModal(modal2Id);
    } else {
      openModal(modal1Id);
    }
  } else {
    console.log('Невірний формат електронної адреси!');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const exampleEmail = 'elena.gudz1995@gmail.com';
  handleRegistration(exampleEmail);
});