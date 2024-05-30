document.addEventListener('DOMContentLoaded', () => {
    const contractForm = document.querySelector('#contractForm');
    const contractsList = document.querySelector('#contractsList');
    const user = JSON.parse(localStorage.getItem('user'));

    if (contractForm) {
        contractForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const contractTitle = event.target.contractTitle.value;
            const contractValue = event.target.contractValue.value;

            const newContract = {
                title: contractTitle,
                value: contractValue,
                addedBy: user.username,
                addedAt: new Date().toISOString()
            };

            addItemToStorage('contracts', newContract, user.username);
            renderContractsList();
            contractForm.reset();
        });
    }

    function renderContractsList() {
        const contracts = getFromStorage('contracts') || [];
        contractsList.innerHTML = contracts.map((contract, index) => `
            <div class="p-4 border-b">
                <h3 class="text-lg">${contract.title}</h3>
                <p>Valor: R$ ${contract.value}</p>
                <p>Adicionado por: ${contract.addedBy} em ${new Date(contract.addedAt).toLocaleString()}</p>
                <button class="bg-red-500 text-white px-2 py-1 rounded mt-2" onclick="removeContract(${index})">Remover</button>
            </div>
        `).join('');
    }

    renderContractsList();
});

function removeContract(index) {
    const user = JSON.parse(localStorage.getItem('user'));
    removeItemFromStorage('contracts', index, user.username);
    location.reload();
}
