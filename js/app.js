document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    // Código para inicializar o dashboard e navegação para outras páginas
});

function checkAuthentication() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && window.location.pathname !== '/pages/login.html' && window.location.pathname !== '/index.html') {
        window.location.href = 'pages/login.html';
    }
}
