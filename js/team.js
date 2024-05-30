document.addEventListener('DOMContentLoaded', () => {
    const teamForm = document.querySelector('#teamForm');
    const teamList = document.querySelector('#teamList');
    const user = JSON.parse(localStorage.getItem('user'));

    if (teamForm) {
        teamForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const memberName = event.target.memberName.value;
            const memberRole = event.target.memberRole.value;

            const newMember = {
                name: memberName,
                role: memberRole,
                addedBy: user.username,
                addedAt: new Date().toISOString()
            };

            addItemToStorage('team', newMember, user.username);
            renderTeamList();
            teamForm.reset();
        });
    }

    function renderTeamList() {
        const team = getFromStorage('team') || [];
        teamList.innerHTML = team.map((member, index) => `
            <div class="p-4 border-b">
                <h3 class="text-lg">${member.name}</h3>
                <p>Função: ${member.role}</p>
                <p>Adicionado por: ${member.addedBy} em ${new Date(member.addedAt).toLocaleString()}</p>
                <button class="bg-red-500 text-white px-2 py-1 rounded mt-2" onclick="removeMember(${index})">Remover</button>
            </div>
        `).join('');
    }

    renderTeamList();
});

function removeMember(index) {
    const user = JSON.parse(localStorage.getItem('user'));
    removeItemFromStorage('team', index, user.username);
    location.reload();
}
