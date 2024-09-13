function fetchTicketInfo() {
    fetch('/api/ticket-info') // Supondo que a API retorna um único objeto JSON de ingresso
        .then(response => response.json())
        .then(data => {
            const ticketInfoContainer = document.getElementById('ticket-info');
            
            if (!ticketInfoContainer) {
                console.error('Elemento "ticket-info" não encontrado no DOM.');
                return;
            }

            const ticket = data; // A resposta contém um único objeto de ingresso

            // Preenchendo o conteúdo do contêiner de informações do ingresso
            ticketInfoContainer.innerHTML = `
                <h2>${ticket.event}</h2>
                <p><strong>Código:</strong> ${ticket.code}</p>
                <p><strong>Nome:</strong> ${ticket.name}</p>
                <p><strong>CPF:</strong> ${ticket.cpf}</p>
                <p><strong>Localização:</strong> ${ticket.location}</p>
                <p><strong>Cidade:</strong> ${ticket.city}</p>
                <p><strong>Dia do Evento:</strong> ${ticket.eventDay}</p>
                <p><strong>Preço:</strong> ${ticket.price}</p>
                <p><strong>Transação:</strong> ${ticket.transaction}</p>
                <p>${ticket.instructions}</p>
                <img src="${ticket.qrCode}" alt="QR Code" />
            `;
        })
        .catch(error => console.error('Erro ao carregar informações dos ingressos:', error));
}

// Chama a função fetchTicketInfo quando o conteúdo do DOM é carregado
document.addEventListener('DOMContentLoaded', function () {
    fetchTicketInfo();
});
