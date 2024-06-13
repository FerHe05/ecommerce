// login/script.js
function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login bem-sucedido!');
            // Redirecionar para a página de admin, por exemplo
            window.location.href = '../admin/index.html';
        } else {
            alert('Login falhou! Verifique suas credenciais.');
        }
    })
    .catch(error => console.error('Error:', error));
}
