import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7DfmaBmdjqG5FHtKEkXZnBi8kQnvmXc0",
  authDomain: "authentication-24ac1.firebaseapp.com",
  databaseURL: "https://authentication-24ac1-default-rtdb.firebaseio.com",
  projectId: "authentication-24ac1",
  storageBucket: "authentication-24ac1.appspot.com",
  messagingSenderId: "360749450140",
  appId: "1:360749450140:web:6c111080660d71a88fbe59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// DOM Elements
const authModal = document.getElementById("authModal");
const header = document.getElementById("header");
const mainContent = document.querySelector(".main");
const googleLoginButton = document.getElementById("googleLoginButton");

// Show a loading spinner or block access until Firebase resolves the authentication state
document.body.style.display = "none";

// Handle Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is authenticated
    authModal.classList.add("hidden");
    header.classList.remove("hidden");
    mainContent.classList.remove("hidden");
  } else {
    // User is not authenticated
    authModal.classList.remove("hidden");
    header.classList.add("hidden");
    mainContent.classList.add("hidden");
  }

  // Once authentication state is resolved, reveal the body
  document.body.style.display = "block";
});

// Google Authentication Logic
googleLoginButton?.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log("Google Sign-In Successful:", user.email);
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-In Error: " + error.message);
    });
});

// Sign-Up Logic
document.querySelector("#registerSection .btn")?.addEventListener("click", () => {
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Sign-Up Successful:", userCredential.user.email);
    })
    .catch((error) => alert("Sign-Up Error: " + error.message));
});

// Sign-In Logic
document.querySelector("#loginSection .btn")?.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Sign-In Successful:", userCredential.user.email);
    })
    .catch((error) => alert("Sign-In Error: " + error.message));
});

// Logout Logic
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
      alert("You have been logged out.");
      location.reload(); // Reload the page or redirect to the login modal
    })
    .catch((error) => console.error("Error signing out:", error));
});
