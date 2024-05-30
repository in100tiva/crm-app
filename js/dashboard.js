document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    renderEarningsChart();
});

function renderSummary() {
    const summaryCards = document.getElementById('summaryCards');

    const companies = getFromStorage('companies') || [];
    const leads = getFromStorage('leads') || [];
    const team = getFromStorage('team') || [];
    const meetings = getFromStorage('meetings') || [];
    const contracts = getFromStorage('contracts') || [];

    summaryCards.innerHTML = `
        <div class="bg-white p-4 rounded shadow-md">
            <h4 class="text-lg">Empresas</h4>
            <p class="text-2xl">${companies.length}</p>
        </div>
        <div class="bg-white p-4 rounded shadow-md">
            <h4 class="text-lg">Leads</h4>
            <p class="text-2xl">${leads.length}</p>
        </div>
        <div class="bg-white p-4 rounded shadow-md">
            <h4 class="text-lg">Membros da Equipe</h4>
            <p class="text-2xl">${team.length}</p>
        </div>
        <div class="bg-white p-4 rounded shadow-md">
            <h4 class="text-lg">Reuniões</h4>
            <p class="text-2xl">${meetings.length}</p>
        </div>
        <div class="bg-white p-4 rounded shadow-md">
            <h4 class="text-lg">Despesas</h4>
            <p class="text-2xl">R$ ${expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2)}</p>
        </div>
        <div class="bg-white p-4 rounded shadow-md">
            <h4 class="text-lg">Contratos</h4>
            <p class="text-2xl">R$ ${contracts.reduce((total, contract) => total + parseFloat(contract.value), 0).toFixed(2)}</p>
        </div>
    `;
}

function renderEarningsChart() {
    const contracts = getFromStorage('contracts') || [];
    const ctx = document.getElementById('earningsChart').getContext('2d');
    
    const monthlyEarnings = Array(12).fill(0);

    contracts.forEach(contract => {
        const month = new Date(contract.addedAt).getMonth();
        monthlyEarnings[month] += parseFloat(contract.value);
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Earnings',
                data: monthlyEarnings,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

   
