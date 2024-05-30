document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.querySelector('#expenseForm');
    const expensesList = document.querySelector('#expensesList');
    const user = JSON.parse(localStorage.getItem('user'));

    if (expenseForm) {
        expenseForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const expenseDescription = event.target.expenseDescription.value;
            const expenseAmount = event.target.expenseAmount.value;

            const newExpense = {
                description: expenseDescription,
                amount: expenseAmount,
                addedBy: user.username,
                addedAt: new Date().toISOString()
            };

            addItemToStorage('expenses', newExpense, user.username);
            renderExpensesList();
            expenseForm.reset();
        });
    }

    function renderExpensesList() {
        const expenses = getFromStorage('expenses') || [];
        expensesList.innerHTML = expenses.map((expense, index) => `
            <div class="p-4 border-b">
                <h3 class="text-lg">${expense.description}</h3>
                <p>Valor: R$ ${expense.amount}</p>
                <p>Adicionado por: ${expense.addedBy} em ${new Date(expense.addedAt).toLocaleString()}</p>
                <button class="bg-red-500 text-white px-2 py-1 rounded mt-2" onclick="removeExpense(${index})">Remover</button>
            </div>
        `).join('');
    }

    renderExpensesList();
});

function removeExpense(index) {
    const user = JSON.parse(localStorage.getItem('user'));
    removeItemFromStorage('expenses', index, user.username);
    location.reload();
}
