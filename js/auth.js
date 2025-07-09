const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Dummy login
  const validEmail = "admin@uriht.in";
  const validPassword = "admin123";

  if (email === validEmail && password === validPassword) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
  } else {
    errorMsg.textContent = "Invalid email or password.";
  }
});

// ✅ Show/hide password (add this below the form code)
document.getElementById("togglePassword").addEventListener("click", () => {
  const passwordInput = document.getElementById("password");
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
});
