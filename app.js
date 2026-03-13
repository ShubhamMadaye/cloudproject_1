const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ──
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (index.html, index.css, index.js) from this folder
app.use(express.static(path.join(__dirname)));

// ─── Mock Product Data ───
const products = [
    { id: 1, name: 'Floral Summer Dress', category: 'Women', type: 'Casual', price: 1499, original: 2200, badge: 'New', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80' },
    { id: 2, name: 'Classic Oxford Shirt', category: 'Men', type: 'Formal', price: 999, original: 1600, badge: 'Sale', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80' },
    { id: 3, name: 'Elegant Evening Gown', category: 'Women', type: 'Formal', price: 3299, original: 5000, badge: 'New', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80' },
    { id: 4, name: 'Urban Street Kicks', category: 'Unisex', type: 'Casual', price: 2199, original: null, badge: null, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
    { id: 5, name: 'Linen Summer Blazer', category: 'Men', type: 'Casual', price: 1899, original: 2800, badge: 'Sale', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
    { id: 6, name: 'Boho Wrap Skirt', category: 'Women', type: 'Casual', price: 899, original: 1400, badge: 'New', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80' },
];

// ─── Routes ────────

// GET /  → Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// GET /api/products  → Return all products (optional filter by category or type)
// Example: /api/products?category=Women&type=Casual
app.get('/api/products', (req, res) => {
    const { category, type, badge } = req.query;
    let result = [...products];

    if (category) result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (type) result = result.filter(p => p.type.toLowerCase() === type.toLowerCase());
    if (badge) result = result.filter(p => p.badge && p.badge.toLowerCase() === badge.toLowerCase());

    res.json({ success: true, count: result.length, products: result });
});

// GET /api/products/:id  → Return a single product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
});

// POST /api/contact  → Handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields (name, email, message) are required.' });
    }

    // In a real app you'd save to a DB or send an email here
    console.log(`📩 New contact from ${name} <${email}>: ${message}`);
    res.json({ success: true, message: `Thanks ${name}, we'll get back to you at ${email} soon!` });
});

// POST /api/cart  → Simulate adding an item to cart
app.post('/api/cart', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    console.log(`🛒 Added to cart: ${product.name} x${quantity}`);
    res.json({
        success: true,
        message: `${product.name} added to cart!`,
        item: { ...product, quantity }
    });
});

// POST /api/newsletter  → Handle newsletter sign-ups
app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    console.log(`📧 Newsletter signup: ${email}`);
    res.json({ success: true, message: `You're subscribed! Watch your inbox at ${email} for exclusive deals.` });
});

// ─── 404 Handler ──────
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// ─── Start Server ────────
app.listen(PORT, () => {
    console.log(`✅ SGM Clothing server running at http://localhost:${PORT}`);
});

module.exports = app;
