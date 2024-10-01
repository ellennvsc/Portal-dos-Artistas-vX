// Função para carregar os dados do JSON
async function loadTicketData() {
    try {
        // Faz a requisição ao arquivo JSON
        const response = await fetch('../data/ingressos.json');
        
        // Verifica se a resposta está ok
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }

        const data = await response.json();

        // Atualiza os elementos HTML com os dados do JSON
        document.getElementById('ticket-header').innerText = data.event;
        document.getElementById('qr-code').src = data.qrCode;
        document.getElementById('code').innerHTML = `Código<br>${data.code}`;
        document.getElementById('name').innerText = data.name;
        document.getElementById('cpf').innerText = data.cpf;
        document.getElementById('location').innerText = data.location;
        document.getElementById('city').innerText = data.city;
        document.getElementById('event-day').innerText = data.eventDay;
        document.getElementById('price').innerText = data.price;
        document.getElementById('transaction').innerText = data.transaction;
        document.getElementById('instructions').innerText = data.instructions;

    } catch (error) {
        console.error('Erro ao carregar os dados do ingresso:', error);
    }
}

// Chama a função para carregar os dados quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', loadTicketData);
