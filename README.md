# 🍕 Slices of Heaven - Pizza Online Ordering System

A full-stack web application for ordering pizza online. The system lets customers browse a live menu, build a cart, and check out, while giving the restaurant a real backend to store orders, menu items, and customer feedback rebuilt from a static-HTML first-year project into a responsive, animated, SEO-friendly production-style app.

🔗 **Repository:** [github.com/FathimaNufla2000/pizza-online-ordering-system](https://github.com/FathimaNufla2000/pizza-online-ordering-system)

🌐 **Live Demo:** [pizza-online-ordering-system-production.up.railway.app](https://pizza-online-ordering-system-production.up.railway.app/)
---

## 📌 Project Overview

Slices of Heaven started as a static multi-page HTML site with no backend - forms didn't actually submit anywhere, the menu was hardcoded, and the layout used table-based hacks. This version rebuilds it as a full-stack app: menu items are stored in a database and rendered server-side (so they're crawlable by search engines), customers get a working cart with add/remove/quantity controls, and both orders and feedback are saved for real instead of pointing at a dead form action.

---

## ✨ Features

### 🍕 Customer Features
- Browse a categorized pizza menu (Classic, Signature, Supreme) rendered from the database
- Add pizzas to a persistent cart, adjust quantities, or remove items
- Checkout with delivery details to place a real order
- Order confirmation page showing items and total
- Submit feedback with name, email, district, and message
- Fully responsive layout with mobile hamburger navigation
- Hover/entrance animations across cards, buttons, and the hero section

### 🔍 SEO
- Server-rendered pages (EJS) so menu content is visible without JavaScript
- Unique `<title>` and meta description per page
- Open Graph tags, canonical URLs
- `robots.txt` and `sitemap.xml`
- Descriptive `alt` text on all images

---

## 🛠 Technology Stack

**Frontend**
- HTML5 (EJS templates)
- CSS3 (Grid/Flexbox, responsive, custom animations)
- Vanilla JavaScript (cart logic, form handling, fetch API)

**Backend**
- Node.js
- Express

**Database**
- SQLite (via better-sqlite3, zero-config file database)

---

## 📂 Project Structure

```text
Pizza online ordering system/
├── server.js                # Express app entry point
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
├── db/
│   ├── db.js                # SQLite connection + schema
│   └── seed.js               # seeds the pizzas table
├── controllers/
│   ├── menuController.js
│   ├── orderController.js
│   └── feedbackController.js
├── routes/
│   ├── pageRoutes.js        # home, about
│   ├── menuRoutes.js
│   ├── orderRoutes.js
│   └── feedbackRoutes.js
├── views/                   # EJS templates
│   ├── partials/            # head, header, footer
│   ├── home.ejs
│   ├── about.ejs
│   ├── menu.ejs
│   ├── cart.ejs
│   ├── confirmation.ejs
│   ├── feedback.ejs
│   └── 404.ejs
└── public/
    ├── css/style.css
    ├── js/
    │   ├── cart.js
    │   └── menu.js
    ├── images/               # pizza & branch photos
    ├── robots.txt
    └── sitemap.xml
```
---

## ⚙️ Installation & Local Setup

### Prerequisites
- Node.js (v18 or later)
- npm
- Web Browser

### 1. Clone the Repository
```bash
git clone https://github.com/FathimaNufla2000/pizza-online-ordering-system.git
cd "Pizza online ordering system"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Copy `.env.example` to `.env` and adjust if needed:
```text
PORT=3000
SITE_URL=http://localhost:3000
```

### 4. Seed the Database
```bash
npm run seed
```

### 5. Run the Application
```bash
npm start
# or: npm run dev   (auto-reload with nodemon)
```
Visit **http://localhost:3000**

---

## 🗄 Database

The application uses **SQLite** to store:
- Pizzas (name, category, price, image, description)
- Orders (customer details, items, total, status)
- Feedback (name, email, district, message)

Database operations are handled via `better-sqlite3` with prepared statements.

---

## 🚧 Future Enhancements

- Admin dashboard to add/edit pizzas without touching the database directly
- Email confirmation on order placement (e.g. Nodemailer)
- Payment gateway integration (Stripe / PayHere for LKR)
- Customer accounts and order history
- Deploy to Render, Railway, or a VPS with PM2 + Nginx

---

## 👩‍💻 Author

**Fathima Nufla**
[GitHub](https://github.com/FathimaNufla2000) · [LinkedIn](https://www.linkedin.com/in/fathima-nufla-a8a421243/)

---

## 📄 License

This project was developed for educational and academic purposes.