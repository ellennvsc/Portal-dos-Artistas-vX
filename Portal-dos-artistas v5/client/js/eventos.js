document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar os eventos do arquivo JSON
    fetch('../data/index/eventos.json')
        .then(response => response.json())
        .then(data => {
            const events = data.events; // Extrai a lista de eventos do JSON
            const container = document.getElementById('events-container'); // Certifique-se de que este ID corresponde ao seu HTML

            if (!container) {
                console.error('Container not found');
                return;
            }

            // Função para renderizar eventos
            function renderEvents(eventsToRender) {
                container.innerHTML = ''; // Limpa o container antes de renderizar novos eventos

                eventsToRender.forEach(event => {
                    const eventItem = document.createElement('div');
                    eventItem.className = 'col-lg-6 col-12 mb-4 mb-lg-0';
                    eventItem.innerHTML = `
                        <div class="custom-block d-flex">
                            <div class="custom-block-icon-wrap">
                                <a href="${event.detailsLink}" class="custom-block-image-wrap">
                                    <img src="${event.image}" class="custom-block-image img-fluid" alt="${event.title}">
                                </a>
                                <div class="mt-2">
                                    <a href="${event.inscriptionLink}" class="btn custom-btn">
                                        Inscrição
                                    </a>
                                </div>
                            </div>
                            <div class="custom-block-info">
                                <div class="custom-block-top d-flex mb-1">
                                    <small class="me-4">
                                        <i class="bi-clock-fill custom-icon"></i>
                                        ${event.date}
                                    </small>
                                    <small>
                                        <a href="${event.detailsLink}" class="btn custom-btn">Ler mais</a>
                                    </small>
                                </div>
                                <h5 class="mb-2">
                                    <a href="${event.detailsLink}">${event.title}</a>
                                </h5>
                                <div class="profile-block d-flex">
                                    <img src="${event.organizer.image}" class="profile-block-image img-fluid" alt="${event.organizer.name}">
                                    <p>
                                        ${event.organizer.name}
                                        <img src="${event.organizer.verifiedImage}" class="verified-image img-fluid" alt="Verificado">
                                        <strong>${event.organizer.role}</strong>
                                    </p>
                                </div>
                                <p class="mb-0">${event.description}</p>
                                <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                    <a href="#" class="bi-heart me-1">
                                        <span>${event.stats.likes}</span>
                                    </a>
                                    <a href="#" class="bi-chat me-1">
                                        <span>${event.stats.comments}</span>
                                    </a>
                                    <a href="#" class="bi-download">
                                        <span>${event.stats.downloads}</span>
                                    </a>
                                </div>
                            </div>
                            <div class="social-share d-flex flex-column ms-auto">
                                <a href="${event.inscriptionLink}" class="badge ms-auto">
                                    <i class="bi-heart"></i>
                                </a>
                                <a href="${event.detailsLink}" class="badge ms-auto">
                                    <i class="bi-bookmark"></i>
                                </a>
                            </div>
                        </div>
                    `;
                    container.appendChild(eventItem);
                });
            }

            // Renderização inicial de todos os eventos
            renderEvents(events);

            // Funcionalidade de filtro de busca
            const searchInput = document.getElementById('search');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const query = this.value.toLowerCase();
                    const filteredEvents = events.filter(event => event.title.toLowerCase().includes(query));
                    renderEvents(filteredEvents);
                });
            }
        })
        .catch(error => console.error('Erro ao carregar os eventos:', error));
});
