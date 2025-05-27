document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userId = document.getElementById("userId").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  const validUserId = "1996803";
  const validPassword = "password123";

  if (userId === validUserId && password === validPassword) {
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "Invalid ID or password.";
  }
});
