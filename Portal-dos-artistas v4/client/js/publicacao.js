// Função para carregar eventos do JSON e exibir na página
function carregarEventos() {
    fetch('/api/events')  // Alterado para acessar a API do servidor
        .then(response => response.json())
        .then(eventos => {
            const eventosList = document.getElementById('eventos-list');

            eventosList.innerHTML = ''; // Limpar conteúdo existente

            eventos.forEach(evento => {
                const eventoDiv = document.createElement('div');
                eventoDiv.className = 'evento-item';
                eventoDiv.innerHTML = `
                    <h3>${evento.title}</h3>
                    <img src="${evento.image}" alt="${evento.title}" style="width: 100%; max-width: 300px;">
                    <p>${evento.description}</p>
                    <p><strong>Data:</strong> ${evento.date}</p>
                    <a href="${evento.detailsLink}">Mais detalhes</a>
                    <a href="${evento.inscriptionLink}">Inscrição</a>
                `;
                eventosList.appendChild(eventoDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar eventos:', error));
}

// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarEventos);
