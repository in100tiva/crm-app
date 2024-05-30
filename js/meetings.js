document.addEventListener('DOMContentLoaded', () => {
    const meetingForm = document.querySelector('#meetingForm');
    const meetingsList = document.querySelector('#meetingsList');
    const user = JSON.parse(localStorage.getItem('user'));

    if (meetingForm) {
        meetingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const meetingTitle = event.target.meetingTitle.value;
            const meetingDate = event.target.meetingDate.value;

            const newMeeting = {
                title: meetingTitle,
                date: meetingDate,
                addedBy: user.username,
                addedAt: new Date().toISOString()
            };

            addItemToStorage('meetings', newMeeting, user.username);
            renderMeetingsList();
            meetingForm.reset();
        });
    }

    function renderMeetingsList() {
        const meetings = getFromStorage('meetings') || [];
        meetingsList.innerHTML = meetings.map((meeting, index) => `
            <div class="p-4 border-b">
                <h3 class="text-lg">${meeting.title}</h3>
                <p>Data: ${new Date(meeting.date).toLocaleString()}</p>
                <p>Adicionado por: ${meeting.addedBy} em ${new Date(meeting.addedAt).toLocaleString()}</p>
                <button class="bg-red-500 text-white px-2 py-1 rounded mt-2" onclick="removeMeeting(${index})">Remover</button>
            </div>
        `).join('');
    }

    renderMeetingsList();
});

function removeMeeting(index) {
    const user = JSON.parse(localStorage.getItem('user'));
    removeItemFromStorage('meetings', index, user.username);
    location.reload();
}
