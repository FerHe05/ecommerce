const express = require('express');
const router = express.Router();
const db = require('../connection/connection_db');

// Obter todos os produtos
router.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Obter um produto pelo ID
router.get('/product/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Adicionar produto
router.post('/addProduct', (req, res) => {
    const { name, price, description } = req.body;
    const sql = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
    db.query(sql, [name, price, description], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Product added...' });
    });
});

// Remover produto
router.delete('/removeProduct/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Product removed...' });
    });
});

// Atualizar produto
router.put('/updateProduct/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const sql = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
    db.query(sql, [name, price, description, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Product updated...' });
    });
});

// Verificar login do usuário
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const userType = results[0].userType; // assumindo que você tem um campo userType na tabela users
            res.json({ success: true, userType });
        } else {
            res.json({ success: false });
        }
    });
});

// Adicionar item ao carrinho
router.post('/cart', (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    const sql = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
    db.query(sql, [user_id, product_id, quantity], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Item added to cart' });
    });
});

// Obter itens do carrinho
router.get('/cart/:user_id', (req, res) => {
    const { user_id } = req.params;
    const sql = 'SELECT cart.id, products.name, products.price, cart.quantity FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Verificar login do usuário
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM admin_users WHERE name = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

module.exports = router;
