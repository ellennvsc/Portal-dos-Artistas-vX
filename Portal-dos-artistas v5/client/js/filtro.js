// Adiciona evento de input com debounce para a busca
document.getElementById('search').addEventListener('input', debounce(handleSearch, 300));

// Função para lidar com a busca e filtrar os eventos dinamicamente
async function handleSearch() {
    const searchTerm = document.getElementById('search').value.toLowerCase();

    try {
        // Carrega os dados do JSON
        const response = await fetch('data/index/filtro.json'); // Certifique-se de que este caminho esteja correto
        const data = await response.json();

        // Filtra os eventos de acordo com o termo de busca
        const filteredEvents = data.filter(evento =>
            evento.nome.toLowerCase().includes(searchTerm) ||
            evento.local.toLowerCase().includes(searchTerm) ||
            evento.descricao.toLowerCase().includes(searchTerm) ||
            evento.data.includes(searchTerm) // Filtro por data
        );

        // Exibe os resultados filtrados
        displayResults(filteredEvents);
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
}

// Função para exibir os resultados da busca
function displayResults(events) {
    const resultadoBusca = document.getElementById('resultadoBusca');
    resultadoBusca.innerHTML = ''; // Limpa resultados anteriores

    // Caso não haja resultados, exibe mensagem apropriada
    if (events.length === 0) {
        resultadoBusca.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    // Cria e exibe cada resultado
    events.forEach(evento => {
        const eventoItem = document.createElement('div');
        eventoItem.className = 'evento-item border p-3 mb-3 rounded shadow-sm';

        // Estrutura HTML de cada item de evento
        eventoItem.innerHTML = `
            <h3 class="evento-nome">${evento.nome}</h3>
            <p class="evento-data"><strong>Data:</strong> ${evento.data}</p>
            <p class="evento-local"><strong>Local:</strong> ${evento.local}</p>
            <p class="evento-descricao">${evento.descricao}</p>
            <button class="btn btn-primary mt-2" onclick="verDetalhes('${evento.id}')">Ver Detalhes</button>
        `;

        resultadoBusca.appendChild(eventoItem);
    });
}

// Função debounce para evitar múltiplas requisições rápidas
function debounce(func, delay) {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

// Exemplo de função para exibir detalhes de um evento
function verDetalhes(eventoId) {
    alert(`Detalhes do evento com ID: ${eventoId}`);
    // Aqui você pode adicionar lógica para redirecionar para uma página de detalhes ou abrir um modal
}
