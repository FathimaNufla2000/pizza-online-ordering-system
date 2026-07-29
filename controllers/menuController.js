const db = require('../db/db');

exports.getMenuPage = (req, res) => {
  const pizzas = db.prepare('SELECT * FROM pizzas ORDER BY category, name').all();
  const grouped = pizzas.reduce((acc, pizza) => {
    acc[pizza.category] = acc[pizza.category] || [];
    acc[pizza.category].push(pizza);
    return acc;
  }, {});
  res.render('menu', {
    title: 'Menu | Slices of Heaven Pizza',
    description: 'Browse our Classic, Signature and Supreme pizzas at Slices of Heaven. Order online for fast delivery across Sri Lanka.',
    grouped
  });
};

exports.getMenuJson = (req, res) => {
  const pizzas = db.prepare('SELECT * FROM pizzas ORDER BY category, name').all();
  res.json(pizzas);
};
