document.addEventListener('DOMContentLoaded', () => {
    const leadForm = document.querySelector('#leadForm');
    const leadsList = document.querySelector('#leadsList');
    const user = JSON.parse(localStorage.getItem('user'));

    if (leadForm) {
        leadForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const leadName = event.target.leadName.value;
            const leadEmail = event.target.leadEmail.value;
            const leadPhone = event.target.leadPhone.value;

            const newLead = {
                name: leadName,
                email: leadEmail,
                phone: leadPhone,
                addedBy: user.username,
                addedAt: new Date().toISOString()
            };

            addItemToStorage('leads', newLead, user.username);
            renderLeadsList();
            leadForm.reset();
        });
    }

    function renderLeadsList() {
        const leads = getFromStorage('leads') || [];
        leadsList.innerHTML = leads.map((lead, index) => `
            <div class="p-4 border-b">
                <h3 class="text-lg">${lead.name}</h3>
                <p>Email: ${lead.email}</p>
                <p>Telefone: ${lead.phone}</p>
                <p>Adicionado por: ${lead.addedBy} em ${new Date(lead.addedAt).toLocaleString()}</p>
                <button class="bg-red-500 text-white px-2 py-1 rounded mt-2" onclick="removeLead(${index})">Remover</button>
            </div>
        `).join('');
    }

    renderLeadsList();
});

function removeLead(index) {
    const user = JSON.parse(localStorage.getItem('user'));
    removeItemFromStorage('leads', index, user.username);
    location.reload();
}
