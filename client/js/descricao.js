<script>
document.addEventListener('DOMContentLoaded', function() {
  // Função para carregar e renderizar eventos
  function carregarEventos() {
    fetch('../data/descricao.json')
      .then(response => response.json())
      .then(data => {
        const eventos = data.eventos;
        const eventosContainer = document.querySelector('.latest-podcast-section .col-lg-10');

        eventos.forEach(evento => {
          const eventoHTML = `
            <div class="row align-items-start mb-4">
              <div class="col-lg-3 col-12">
                <div class="custom-block-icon-wrap">
                  <div class="custom-block-image-wrap custom-block-image-detail-page">
                    <img src="${evento.imagem}" class="custom-block-image img-fluid" alt="${evento.titulo}">
                  </div>
                </div>
              </div>
              <div class="col-lg-9 col-12">
                <div class="custom-block-info">
                  <h4 class="mb-3">${evento.titulo}</h4>
                  <p>${evento.descricao}</p>
                  <small><span>&#128197;</span> ${evento.data}</small><br>
                  <small><span>&#128204;</span> ${evento.local}</small><br><br>
                  <a href="${evento.inscricaoLink}" class="btn custom-btn">Garanta já seu ingresso!</a>
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
</script>
