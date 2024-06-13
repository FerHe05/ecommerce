document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:5000/api/products')
        .then(response => response.json())
        .then(data => {
            const productsDiv = document.getElementById('products');
            data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Preço: ${product.price}</p>
                    <button onclick="addOnCart(${product.id})">Adicionar ao carrinho</button>
                `;
                productsDiv.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error:', error));
});

function addOnCart(productId){
    const userId = 1; // Substitua pelo ID do usuário logado
    const quantity = 1; // Você pode mudar isso para permitir quantidades personalizadas
    fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId, product_id: productId, quantity: quantity })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
