const db = require('../db/db');

exports.getCartPage = (req, res) => {
  res.render('cart', {
    title: 'Your Cart | Slices of Heaven Pizza',
    description: 'Review your pizza order and check out securely.'
  });
};

exports.createOrder = (req, res) => {
  const { customer_name, email, phone, address, items, total } = req.body;

  if (!customer_name || !email || !phone || !address || !items || !total) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  let parsedItems;
  try {
    parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
    if (!Array.isArray(parsedItems) || parsedItems.length === 0) throw new Error('empty');
  } catch (e) {
    return res.status(400).json({ error: 'Cart is invalid or empty.' });
  }

  const stmt = db.prepare(`
    INSERT INTO orders (customer_name, email, phone, address, items, total)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(customer_name, email, phone, address, JSON.stringify(parsedItems), total);

  res.json({ success: true, orderId: result.lastInsertRowid });
};

exports.getOrderConfirmation = (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).render('404', { title: 'Order not found', description: '' });
  order.items = JSON.parse(order.items);
  res.render('confirmation', {
    title: 'Order Confirmed | Slices of Heaven Pizza',
    description: 'Your pizza order has been received.',
    order
  });
};
