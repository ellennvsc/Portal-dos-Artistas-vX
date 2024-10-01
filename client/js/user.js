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
      let newjson = JSON.stringify(json);
      newjson;
      console.log(json);
    });
});

