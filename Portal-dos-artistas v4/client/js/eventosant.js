function fetchPastEvents() {
  fetch('/api/past-events') // Supondo que a API retorna um objeto JSON com a propriedade 'eventosPassados'
      .then(response => response.json())
      .then(data => {
          const events = data.eventosPassados; // Certifique-se de que 'eventosPassados' seja a chave correta no JSON retornado
          const pastEventListContainer = document.getElementById('past-event-list');

          if (!pastEventListContainer) {
              console.error('Elemento "past-event-list" não encontrado no DOM.');
              return;
          }

          pastEventListContainer.innerHTML = ''; // Limpar lista anterior

          events.forEach(event => {
              const eventDiv = document.createElement('div');
              eventDiv.className = 'past-event-item';
              eventDiv.innerHTML = `
                  <img src="${event.imagemCapa}" alt="${event.titulo}" />
                  <h2>${event.titulo}</h2>
                  <p><a href="${event.descricaoLink}">Descrição</a></p>
                  <img src="${event.artista.imagemPerfil}" alt="${event.artista.nome}" />
                  <p>${event.artista.nome} - ${event.artista.tipo}</p>
                  <p>Ouvintes: ${event.estatisticas.ouvintes}</p>
                  <p>Likes: ${event.estatisticas.likes}</p>
                  <p>Comentários: ${event.estatisticas.comentarios}</p>
                  <a href="${event.acoes.curtir}">Curtir</a>
                  <a href="${event.acoes.bookmark}">Bookmark</a>
              `;
              pastEventListContainer.appendChild(eventDiv);
          });
      })
      .catch(error => console.error('Erro ao carregar eventos passados:', error));
}

// Chame a função fetchPastEvents quando necessário
document.addEventListener('DOMContentLoaded', function () {
  fetchPastEvents(); // Carrega os eventos passados quando a página é carregada
});
