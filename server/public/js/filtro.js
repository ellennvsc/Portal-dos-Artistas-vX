document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const category = document.getElementById('category').value.toLowerCase();
    const location = document.getElementById('location').value.toLowerCase();
    const date = document.getElementById('date').value;

    // Função para filtrar eventos
    function filterEvents(events) {
        return events.filter(event => {
            const matchesCategory = category ? event.category.toLowerCase().includes(category) : true;
            const matchesLocation = location ? event.location.toLowerCase().includes(location) : true;
            const matchesDate = date ? event.date === date : true;
            return matchesCategory && matchesLocation && matchesDate;
        });
    }

    // Carregar eventos do arquivo JSON
    fetch('../data/index/eventos.json')
        .then(response => response.json())
        .then(events => {
            const filteredEvents = filterEvents(events);

            const resultadoBusca = document.getElementById('resultadoBusca');
            resultadoBusca.innerHTML = ''; // Limpar resultados anteriores

            filteredEvents.forEach(event => {
                const eventoItem = document.createElement('div');
                eventoItem.innerHTML = `
                    <h2>${event.name}</h2>
                    <p>Categoria: ${event.category}</p>
                    <p>Localização: ${event.location}</p>
                    <p>Data: ${event.date}</p>
                `;
                resultadoBusca.appendChild(eventoItem);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar eventos:', error);
        });
});