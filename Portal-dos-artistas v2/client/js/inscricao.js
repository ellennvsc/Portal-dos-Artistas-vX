document.addEventListener('DOMContentLoaded', () => {
    // Carregar eventos do arquivo JSON
    fetch('data/index/eventos.json')
        .then(response => response.json())
        .then(data => {
            const eventoSelect = document.getElementById('evento');
            data.eventos.forEach(evento => {
                const option = document.createElement('option');
                option.value = evento.nome;
                option.textContent = evento.nome;
                eventoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar eventos:', error));

    // Mostrar campos de pagamento com base na seleção
    document.querySelectorAll('input[name="pagamento"]').forEach((radio) => {
        radio.addEventListener('change', function () {
            document.querySelectorAll('.payment-fields').forEach((field) => field.style.display = 'none');
            if (this.value === 'cartao') {
                document.getElementById('campos-cartao').style.display = 'block';
            } else if (this.value === 'pix') {
                document.getElementById('campos-pix').style.display = 'block';
            }
        });
    });
});
