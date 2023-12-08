
// Function to display the modal with an image
function displayModal(imageUrl) {
  const modal = document.getElementById('myModal');
  const modalContent = document.querySelector('.modal-content');

  // Set the image in the modal content
  modalContent.innerHTML = `<img src="${imageUrl}" alt="Modal Image" />`;

  // Display the modal
  modal.style.display = 'block';
}

// Function to validate the email format
function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

// Function to check and handle the email status
function checkEmailStatus(email) {
  // Check if the provided email is the specific one for verification
  if (email === 'elena.gudz1995@gmail.com') {
    // Check if this email has been registered before
    const registeredEmail = localStorage.getItem('registeredEmail');

    if (registeredEmail === email) {
      // If the email matches and it's previously registered, display -1.jpg modal
      displayModal('/src/images/-1.jpg');
    } else {
      // If the email matches but it's a new registration, display +1.jpg modal
      displayModal('/src/images/+1.jpg');
      // Store the registered email in localStorage for future reference
      localStorage.setItem('registeredEmail', email);
    }
  } else {
    // If the email doesn't match the specific one for verification, show an error or handle as needed
    console.log('Invalid email');
  }
}

// Handle form submission
document.querySelector('.footer-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const emailInput = document.querySelector('.footer-input');
  const enteredEmail = emailInput.value;

  // Validate the entered email
  if (validateEmail(enteredEmail)) {
    // If the email is valid, check and handle its status
    checkEmailStatus(enteredEmail);
  } else {
    // If the email is invalid, show an error or handle as needed
    console.log('Invalid email format');
  }
});

// Get the modal and close it when the user clicks outside the modal content
const modal = document.getElementById('myModal');
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Close the modal when the user clicks on the close button
const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});