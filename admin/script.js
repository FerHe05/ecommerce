document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');

    function loadProducts() {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = '';
                data.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.innerHTML = `
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Preço: ${product.price}</p>
                        <button onclick="editProduct(${product.id})">Editar</button>
                        <button onclick="deleteProduct(${product.id})">Remover</button>
                    `;
                    productList.appendChild(productElement);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    window.editProduct = function(id) {
        fetch(`http://localhost:5000/api/product/${id}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById('productId').value = product.id;
                document.getElementById('name').value = product.name;
                document.getElementById('price').value = product.price;
                document.getElementById('description').value = product.description;
            })
            .catch(error => console.error('Error:', error));
    };

    window.deleteProduct = function(id) {
        fetch(`http://localhost:5000/api/removeProduct/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => loadProducts())
        .catch(error => console.error('Error:', error));
    };

    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('productId').value;
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;

        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:5000/api/updateProduct/${id}` : 'http://localhost:5000/api/addProduct';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, description })
        })
        .then(response => response.json())
        .then(() => {
            loadProducts();
            productForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    loadProducts();
});
