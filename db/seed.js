const db = require('./db');

const pizzas = [
  { name: 'Chicken Sausage Meat with Nai Miris', category: 'Classic', price: 1490, image: 'pizza1.jpg', description: 'Loaded with chicken sausage and fiery nai miris for a bold classic bite.' },
  { name: 'Popcorn Chicken', category: 'Signature', price: 1690, image: 'pizza2.jpg', description: 'Crispy popcorn chicken bites over melted mozzarella, a house favourite.' },
  { name: 'Super Supreme', category: 'Supreme', price: 1990, image: 'pizza3.jpg', description: 'Everything you love, piled high on one supreme pizza.' },
  { name: 'Chicken Bacon', category: 'Classic', price: 1590, image: 'pizza4.jpg', description: 'Smoky bacon and juicy chicken chunks in every slice.' },
  { name: 'Spicy Veggie with Paneer', category: 'Signature', price: 1450, image: 'pizza5.jpg', description: 'Fresh vegetables and soft paneer with a spicy kick.' },
  { name: 'Meat Supreme', category: 'Supreme', price: 1950, image: 'pizza6.jpg', description: 'A hearty stack of premium meats for true carnivores.' },
  { name: 'Devilled Chicken', category: 'Classic', price: 1550, image: 'pizza7.jpg', description: 'Sri Lankan devilled chicken flavours baked onto a crispy crust.' },
  { name: 'Black Chicken', category: 'Signature', price: 1650, image: 'pizza8.jpg', description: 'Chargrilled chicken with a smoky black pepper glaze.' },
  { name: 'Spicy Seafood', category: 'Supreme', price: 2150, image: 'pizza9.jpg', description: 'Prawns and squid tossed in a fiery seafood sauce.' }
];

const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const insert = db.prepare(`
  INSERT OR IGNORE INTO pizzas (name, category, price, image, description, slug)
  VALUES (@name, @category, @price, @image, @description, @slug)
`);

const insertMany = db.transaction((rows) => {
  for (const row of rows) insert.run({ ...row, slug: slugify(row.name) });
});

insertMany(pizzas);
console.log(`Seeded ${pizzas.length} pizzas.`);
