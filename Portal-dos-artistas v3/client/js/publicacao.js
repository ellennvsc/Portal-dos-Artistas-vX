document.addEventListener("DOMContentLoaded", () => {
    fetch('../data/index/events.json') // Caminho do seu arquivo JSON
        .then(response => response.json())
        .then(data => populateForm(data.events[0])) // Preenche o formulário com o primeiro evento como exemplo
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});

function populateForm(event) {
    // Preencher os campos do formulário com os dados do evento
    document.getElementById('event').value = event.title;
    document.getElementById('datehour').value = formatDateTime(event.date); // Função para formatar data e hora
    document.getElementById('localizacao').value = "Local a ser preenchido"; // Local não está no JSON
    document.getElementById('descricao').value = event.description;
    document.getElementById('organizador_nome').value = event.organizer.name;
    document.getElementById('organizador_contato').value = "Contato a ser preenchido"; // Contato não está no JSON
    document.getElementById('informacoes_ingresso').value = "Informações a serem preenchidas"; // Informações não estão no JSON
    document.getElementById('imagem').setAttribute('data-image-url', event.image); // Armazena o link da imagem para referência futura
}

// Função para formatar a data e hora no formato correto
function formatDateTime(date) {
    // Convertendo a data para o formato yyyy-MM-ddTHH:mm
    let [day, month, year] = date.split('/');
    return `${year}-${month}-${day}T00:00`; // Adicione a hora correta se disponível
}
