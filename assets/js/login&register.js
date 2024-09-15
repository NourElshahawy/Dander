const container = document.getElementById("container");
const signUpButton = document.getElementById("register");
const signInButton = document.getElementById("login");

signUpButton.addEventListener("click", () => {
  container.classList.add("active");
});
signInButton.addEventListener("click", () => {
  container.classList.remove("active");
});

document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault(); 
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {
    name: name,
    email: email,
    password: password,
  };

  localStorage.setItem("user", JSON.stringify(userData)); 

  window.location.href = "index.html";
});
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === loginEmail && storedUser.password === loginPassword) {
        localStorage.setItem('isLoggedIn', 'true');

        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
});
