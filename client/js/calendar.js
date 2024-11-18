document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendar-container');
    const eventDetailsContainer = document.getElementById('event-details');
    const currentMonthSpan = document.getElementById('current-month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    let currentDate = new Date();

    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    function updateCalendar(month, year) {
        generateCalendar(month, year);
        fetchEvents(month, year);
        currentMonthSpan.textContent = `${monthNames[month]} ${year}`;
    }

    function generateCalendar(month, year) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        calendarContainer.innerHTML = ''; // Limpar o calendário anterior

        // Cabeçalho do calendário
        const header = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        header.forEach(day => {
            const headerDiv = document.createElement('div');
            headerDiv.className = 'header';
            headerDiv.textContent = day;
            calendarContainer.appendChild(headerDiv);
        });

        // Células vazias antes do início do mês
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty';
            calendarContainer.appendChild(emptyDiv);
        }

        // Dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = day;
            dayDiv.dataset.date = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            dayDiv.addEventListener('click', function () {
                const date = new Date(dayDiv.dataset.date);
                showEventDetails(date);
            });

            calendarContainer.appendChild(dayDiv);
        }
    }

    function fetchEvents(month, year) {
        fetch('../data/index/eventos.json') // Caminho para o arquivo JSON
            .then(response => response.json())
            .then(data => {
                const events = data.events;
                const dayDivs = document.querySelectorAll('.calendar .day');

                dayDivs.forEach(dayDiv => {
                    const dayDate = new Date(dayDiv.dataset.date);
                    const eventDivs = dayDiv.querySelectorAll('.event');
                    eventDivs.forEach(eventDiv => eventDiv.remove());

                    events.forEach(event => {
                        const [eventDay, eventMonth, eventYear] = event.date.split('/').map(Number);
                        const eventDate = new Date(eventYear, eventMonth - 1, eventDay);

                        if (eventDate.getDate() === dayDate.getDate() &&
                            eventDate.getMonth() === dayDate.getMonth() &&
                            eventDate.getFullYear() === dayDate.getFullYear()) {

                            const eventDiv = document.createElement('div');
                            eventDiv.className = 'event';
                            eventDiv.innerHTML = `<a href="${event.detailsLink}">${event.title}</a>`;
                            dayDiv.appendChild(eventDiv);
                        }
                    });
                });
            })
            .catch(error => console.error('Erro ao carregar eventos:', error));
    }

    function showEventDetails(date) {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const dayDiv = document.querySelector(`.day[data-date="${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}"]`);

        if (dayDiv) {
            const events = dayDiv.querySelectorAll('.event a');
            if (events.length > 0) {
                const eventLinks = Array.from(events).map(event => event.outerHTML);
                eventDetailsContainer.innerHTML = `
                    <h3>Eventos em ${day}/${month + 1}/${year}</h3>
                    <p>${eventLinks.join('<br>')}</p>
                `;
            } else {
                eventDetailsContainer.innerHTML = `
                    <h3>Sem eventos</h3>
                    <p>Não há eventos para este dia.</p>
                `;
            }
        }
    }

    prevMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    nextMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    // Inicializar o calendário
    updateCalendar(currentDate.getMonth(), currentDate.getFullYear());
});
