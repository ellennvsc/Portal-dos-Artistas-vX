const form = document.getElementById("register-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = Object.fromEntries(new FormData(form));

  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      alert("Usuário criado com sucesso!");
    });
});

// FUNCAO LOGIN ------------------------------
const formLogin = document.getElementById("login-form");
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = Object.fromEntries(new FormData(formLogin));

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if(json.isValid){
        localStorage.setItem("token", json.token);
        localStorage.setItem("user", json.user);
        window.location.href = "./index.html";
        alert("Usuário logado com sucesso!");
      }else {
        alert(json.erro)
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
});