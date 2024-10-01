document.addEventListener('DOMContentLoaded', () => {
    const eventSelect = document.getElementById('evento');

    // Função para converter data no formato DD/MM/YYYY para um formato legível
    function formatDate(dateString) {
        const [day, month, year] = dateString.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString(); // Formata a data no formato local
    }

    // Função para carregar eventos no select
    function loadEvents(events) {
        events.forEach(event => {
            const option = document.createElement('option');
            option.value = event.title;
            option.textContent = `${event.title} - ${formatDate(event.date)}`;
            eventSelect.appendChild(option);
        });
    }

    // Requisição para carregar o arquivo JSON de eventos
    fetch('../data/index/eventos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            loadEvents(data.events);
        })
        .catch(error => {
            console.error('Erro ao carregar eventos:', error);
        });
});
