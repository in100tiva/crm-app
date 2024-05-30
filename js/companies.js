document.addEventListener('DOMContentLoaded', () => {
    const companyForm = document.querySelector('#companyForm');
    const companiesList = document.querySelector('#companiesList');
    const user = JSON.parse(localStorage.getItem('user'));

    if (companyForm) {
        companyForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const companyName = event.target.companyName.value;
            const companyEmail = event.target.companyEmail.value;
            const companyPhone = event.target.companyPhone.value;

            const newCompany = {
                name: companyName,
                email: companyEmail,
                phone: companyPhone,
                addedBy: user.username,
                addedAt: new Date().toISOString()
            };

            addItemToStorage('companies', newCompany, user.username);
            renderCompaniesList();
            companyForm.reset();
        });
    }

    function renderCompaniesList() {
        const companies = getFromStorage('companies') || [];
        companiesList.innerHTML = companies.map((company, index) => `
            <div class="p-4 border-b">
                <h3 class="text-lg">${company.name}</h3>
                <p>Email: ${company.email}</p>
                <p>Telefone: ${company.phone}</p>
                <p>Adicionado por: ${company.addedBy} em ${new Date(company.addedAt).toLocaleString()}</p>
                <button class="bg-red-500 text-white px-2 py-1 rounded mt-2" onclick="removeCompany(${index})">Remover</button>
            </div>
        `).join('');
    }

    renderCompaniesList();
});

function removeCompany(index) {
    const user = JSON.parse(localStorage.getItem('user'));
    removeItemFromStorage('companies', index, user.username);
    location.reload();
}
