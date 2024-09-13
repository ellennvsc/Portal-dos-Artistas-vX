document.addEventListener('DOMContentLoaded', () => {
    const eventoSelect = document.getElementById('evento');

    if (!eventoSelect) {
        console.error('Elemento "evento" não encontrado no DOM.');
        return;
    }

    // Função para carregar os eventos do arquivo JSON
    function loadEvents() {
        fetch('/api/events') // Ajuste o caminho ou endpoint da API conforme necessário
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao carregar os eventos.');
                }
                return response.json();
            })
            .then(data => {
                const events = data; // Supondo que o JSON retornado é um array de eventos

                // Limpa as opções existentes antes de adicionar novas
                eventoSelect.innerHTML = '';

                // Adiciona uma opção padrão
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Selecione um evento';
                eventoSelect.appendChild(defaultOption);

                // Popula o select com os eventos
                events.forEach(event => {
                    const option = document.createElement('option');
                    option.value = event.title; // Use o ID ou outro identificador, se preferir
                    option.textContent = event.title;
                    eventoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar eventos:', error));
    }

    // Carregar eventos quando a página estiver pronta
    loadEvents();
});
