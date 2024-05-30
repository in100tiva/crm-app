document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');
    const logoutButton = document.querySelector('#logoutButton');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = event.target.username.value;
            const password = event.target.password.value;

            if (validateUser(username, password)) {
                const user = { username };
                localStorage.setItem('user', JSON.stringify(user));
                logAction('login', user.username);
                window.location.href = 'dashboard.html';
            } else {
                alert('Credenciais inválidas');
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                logAction('logout', user.username);
                localStorage.removeItem('user');
                window.location.href = '../index.html';
            }
        });
    }
});

function validateUser(username, password) {
    return username === 'admin' && password === 'password';
}

function logAction(action, username) {
    const logs = getFromStorage('user_logs') || [];
    logs.push({ action, username, timestamp: new Date().toISOString() });
    saveToStorage('user_logs', logs);
}
