document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const eventDetails = {
        eventName: formData.get('eventName'),
        eventDateTime: formData.get('eventDateTime'),
        eventLocation: formData.get('eventLocation'),
        eventDescription: formData.get('eventDescription'),
        eventOrganizer: formData.get('eventOrganizer'),
        ticketInfo: formData.get('ticketInfo'),
        eventImage: formData.get('eventImage') // Note: This will be a File object
    };

    // Convert to JSON
    const eventDetailsJson = JSON.stringify(eventDetails);

    // Send the JSON to the server for approval (example endpoint)
    fetch('/api/submitEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: eventDetailsJson
    })
    .then(response => response.json())
    .then(data => {
        alert('Evento enviado para aprovação!');
    })
    .catch(error => {
        console.error('Erro ao enviar evento:', error);
    });
});
