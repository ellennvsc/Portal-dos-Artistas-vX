function fetchFutureEvents() {
    fetch('/api/events')
        .then(response => response.json())
        .then(data => {
            // data é um array de eventos diretamente
            const events = data; // Atribuir diretamente ao array retornado
            const eventListContainer = document.getElementById('event-list');

            if (!eventListContainer) {
                console.error('Elemento com ID "event-list" não encontrado no DOM.');
                return;
            }

            eventListContainer.innerHTML = ''; // Limpar lista anterior

            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event-item';
                eventDiv.innerHTML = `
                    <img src="${event.image}" alt="${event.title}" />
                    <h2>${event.title}</h2>
                    <p>${event.description}</p>
                    <a href="${event.detailsLink}">Mais detalhes</a>
                    <a href="${event.inscriptionLink}">Inscreva-se</a>
                `;
                eventListContainer.appendChild(eventDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar eventos futuros:', error));
}
