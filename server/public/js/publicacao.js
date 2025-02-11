document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const teste = Object.fromEntries(formData.entries());
    console.log(teste);

    // Send the JSON to the server for approval (example endpoint)
    fetch('http://localhost:3000/new/event', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Evento enviado para aprovação!');
    })
    .catch(error => {
        console.error('Erro ao enviar evento:', error);
    });
});
