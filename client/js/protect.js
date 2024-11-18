const loadingDiv = document.getElementById("loading-div");
const contentDiv = document.getElementById("content-div");

const token = localStorage.getItem("token");
window.addEventListener("load", async () => {
  if (token) {
    try{
        const response = await fetch("http://localhost:3000/verify-auth", {
            method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (json.isValid) {
          loadingDiv.style.display = "none";
          contentDiv.style.display = "block";
        } else {
          window.location.href = "./index.html";
        }
    }catch(error){
      console.error("Erro:", error);
      alert("algo deu errado")
    }
  } else {
    window.location.href = "./index.html";
  }
});
