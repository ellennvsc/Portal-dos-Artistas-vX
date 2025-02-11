//LOGIN AUTH LINK
const loginItem = document.getElementById("auth-link");
const token = localStorage.getItem("token");
if (token) {
  loginItem.innerHTML = `
  <a class="nav-link" href="./user.html" onClick="logout()">
    <i class="bi bi-person"></i> Logout
  </a>
  `;
} else {
  loginItem.innerHTML = `
  <a class="nav-link" href="./user.html">
    <i class="bi bi-person"></i> Login
  </a>`;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "./index.html";
}