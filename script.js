const API_URL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', () => {
    // Atualizar Dashboard
    fetch(`${API_URL}/dashboard`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-coins').textContent = data.total_coins;
            document.getElementById('miners-active').textContent = data.miners_active;
            document.getElementById('total-speed').textContent = `${data.total_speed} Th/s`;
        });

    // Atualizar Ranking
    fetch(`${API_URL}/ranking`)
        .then(response => response.json())
        .then(data => {
            const rankingList = document.getElementById('ranking-list');
            rankingList.innerHTML = '';
            data.forEach((miner, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${miner.name} - ${miner.coins} moedas`;
                rankingList.appendChild(li);
            });
        });

    // Consultar Saldo
    document.getElementById('account-form').addEventListener('submit', event => {
        event.preventDefault();
        const publicKey = document.getElementById('public-key').value;
        fetch(`${API_URL}/account?key=${publicKey}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('account-balance').textContent = `${data.balance} moedas`;
            });
    });
});
