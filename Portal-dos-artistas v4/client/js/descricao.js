function fetchEventDetails() {
    fetch('/api/event-details') // Supondo que a API retorna um objeto JSON com a propriedade 'eventos'
        .then(response => response.json())
        .then(data => {
            const events = data.eventos; // Certifique-se de que 'eventos' seja a chave correta no JSON retornado
            const eventDetailsContainer = document.getElementById('event-details');

            if (!eventDetailsContainer) {
                console.error('Elemento "event-details" não encontrado no DOM.');
                return;
            }

            eventDetailsContainer.innerHTML = ''; // Limpar detalhes anteriores

            events.forEach(event => {
                const eventDetailDiv = document.createElement('div');
                eventDetailDiv.className = 'event-detail';
                eventDetailDiv.innerHTML = `
                    <h2>${event.titulo}</h2>
                    <p>Data: ${event.data}</p>
                    <p>${event.descricao}</p>
                    <p>Local: ${event.local}</p>
                    <img src="${event.imagem}" alt="${event.titulo}" />
                    <a href="${event.inscricaoLink}">Inscreva-se</a>
                `;
                eventDetailsContainer.appendChild(eventDetailDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar detalhes dos eventos:', error));
}

// Chame a função fetchEventDetails quando necessário
document.addEventListener('DOMContentLoaded', function () {
    fetchEventDetails(); // Carrega os detalhes dos eventos quando a página é carregada
});
