const eventSelect = document.getElementById("evento");
const form = document.getElementById("inscricaoForm");
let events = [];

// Função para converter data no formato DD/MM/YYYY para um formato legível
function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return "Invalid Date";
  }
  return date.toLocaleDateString(); // Formata a data no formato local
}

// Função para carregar eventos no select
function loadEvents(events) {
  console.log(events);
  events.forEach((event) => {
    const option = document.createElement("option");
    option.value = Number(event.EventoID);
    option.textContent = `${event.NomeEvento} - ${formatDate(event.DataHora)}`;
    eventSelect.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/events");
    if (!response.ok) {
      throw new Error("Erro ao carregar eventos");
    }
    const data = await response.json();
    events = data
    loadEvents(data);
  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
  }
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputs = Object.fromEntries(new FormData(form));
    const ingresso = {
        qrCode: "https://via.placeholder.com/100x100.png?text=QR+Code",
        price: "R$ 565,00",
        cpf: inputs.cpf,
        transaction: "CHAR_C68ER45-89RW-5T6W-CV67-963243TYYU7I9",
        instructions: "Mostre o voucher no seu smartphone ou impresso, acompanhado de um documento oficial válido com foto. Certifique-se de que o código de barras esteja legível."
    };

    const response = await fetch(`http://localhost:3000/inscricao/new/${inputs.evento}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(ingresso),
    })
    if (!response.ok) {
        throw new Error("Erro ao criar inscrição");
    }
    alert("inscrição feita com sucesso");
})