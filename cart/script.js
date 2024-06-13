document.addEventListener("DOMContentLoaded", () => {
    const userId = 1; // Substitua pelo ID do usuário logado
    fetch(`http://localhost:5000/api/cart/${userId}`)
        .then(response => response.json())
        .then(data => {
            const cartDiv = document.getElementById('cart');
            data.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.innerHTML = `
                    <h2>${item.name}</h2>
                    <p>Preço: ${item.price}</p>
                    <p>Quantidade: ${item.quantity}</p>
                `;
                cartDiv.appendChild(cartItemElement);
            });
        })
        .catch(error => console.error('Error:', error));
});
