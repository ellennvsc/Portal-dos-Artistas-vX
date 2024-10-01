document.addEventListener('DOMContentLoaded', function () {
  // Carregar eventos
  fetch('../data/index/eventosant.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const eventos = data.eventosPassados; // Certifique-se de que esta chave corresponde ao seu JSON
      const pastEventsContainer = document.querySelector('#past-events-container');

      if (!pastEventsContainer) {
        console.error('Container not found');
        return;
      }

      // Função para renderizar eventos
      function renderEvents(eventsToRender, container) {
        container.innerHTML = ''; // Limpar o contêiner antes de adicionar eventos

        eventsToRender.forEach(evento => {
          const eventItem = document.createElement('div');
          eventItem.className = 'col-lg-4 col-12 mb-4 mb-lg-0'; // Ajuste a classe conforme necessário
          eventItem.innerHTML = `
            <div class="custom-block custom-block-full">
              <div class="custom-block-image-wrap">
                <a href="${evento.descricaoLink}">
                  <img src="${evento.imagemCapa}" class="custom-block-image img-fluid" alt="${evento.titulo}">
                </a>
              </div>
              <div class="custom-block-info">
                <h5 class="mb-2">
                  <a href="${evento.descricaoLink}">
                    ${evento.titulo}
                  </a>
                </h5>
                <div class="profile-block d-flex">
                  <img src="${evento.artista.imagemPerfil}" class="profile-block-image img-fluid" alt="${evento.artista.nome}">
                  <p>${evento.artista.nome}
                    <strong>${evento.artista.tipo}</strong>
                  </p>
                </div>
                <div class="custom-block-bottom d-flex justify-content-between mt-3">
                  <a href="#" class="bi-headphones me-1">
                    <span>${evento.estatisticas.ouvintes}</span>
                  </a>
                  <a href="#" class="bi-heart me-1">
                    <span>${evento.estatisticas.likes}</span>
                  </a>
                  <a href="#" class="bi-chat me-1">
                    <span>${evento.estatisticas.comentarios}</span>
                  </a>
                </div>
              </div>
              <div class="social-share d-flex flex-column ms-auto">
                <a href="${evento.acoes.curtir}" class="badge ms-auto">
                  <i class="bi-heart"></i>
                </a>
                <a href="${evento.acoes.bookmark}" class="badge ms-auto">
                  <i class="bi-bookmark"></i>
                </a>
              </div>
            </div>
          `;
          container.appendChild(eventItem);
        });
      }

      // Renderizar eventos passados
      renderEvents(eventos, pastEventsContainer);

      // Função de pesquisa
      const searchInput = document.getElementById('search');
      if (searchInput) {
        searchInput.addEventListener('input', function () {
          const query = this.value.toLowerCase();
          const filteredPastEvents = eventos.filter(evento => evento.titulo.toLowerCase().includes(query));
          renderEvents(filteredPastEvents, pastEventsContainer);
        });
      }
    })
    .catch(error => console.error('Erro ao carregar os eventos:', error));
});
