// Select the required elements
const registerSection = document.getElementById("registerSection");
const loginSection = document.getElementById("loginSection");
const toSignInButton = document.getElementById("toSignIn");
const toSignUpButton = document.getElementById("toSignUp");

// Event Listener to show Sign In section
toSignInButton.addEventListener("click", () => {
  registerSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

// Event Listener to show Sign Up section
toSignUpButton.addEventListener("click", () => {
  loginSection.classList.add("hidden");
  registerSection.classList.remove("hidden");
});
