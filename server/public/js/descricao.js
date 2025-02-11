
document.addEventListener('DOMContentLoaded', function() {
  // Função para carregar e renderizar eventos
  function carregarEventos() {
    fetch('http://localhost:3000/events')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const eventos = data;
        const eventosContainer = document.querySelector('.latest-podcast-section .col-lg-10');

        eventos.forEach(evento => {
          const eventoHTML = `
            <div class="row align-items-start mt-4">
              <div class="col-lg-3 col-12">
                <div class="custom-block-icon-wrap">
                  <div class="custom-block-image-wrap custom-block-image-detail-page">
                    <img src="${evento.ImagemCartaz}" class="custom-block-image img-fluid" alt="${evento.NomeEvento}">
                  </div>
                </div>
              </div>
              <div class="col-lg-9 col-12">
                <div class="custom-block-info">
                  <h4 class="mb-3">${evento.NomeEvento}</h4>
                  <p>${evento.Descricao}</p>
                  <small><span>&#128197;</span> ${evento.DataHora}</small><br>
                  <small><span>&#128204;</span> ${evento.Localizacao}</small><br><br>
                  <a href="${'/server/public/views/inscricao.html'}" class="btn custom-btn">Garanta já seu ingresso!</a>
                </div>
              </div>
            </div>
          `;
          eventosContainer.insertAdjacentHTML('beforeend', eventoHTML);
        });
      })
      .catch(error => console.error('Erro ao carregar os eventos:', error));
  }

  // Carregar os eventos ao carregar a página
  carregarEventos();
});

