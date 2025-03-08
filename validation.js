function validateRegisterForm() {
  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (username.length < 4) {
      alert("Username must be at least 4 characters long.");
      return false;
  }

  if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
  }

  if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
  }

  return true; // Allow form submission
}

function validateLoginForm() {
  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();

  if (!username || !password) {
      alert("Both fields are required.");
      return false;
  }

  return true; // Allow form submission
}
