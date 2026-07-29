require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

require('./db/db'); // ensures tables exist

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

// Make canonical site URL available to all views
app.use((req, res, next) => {
  res.locals.siteUrl = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`;
  res.locals.currentPath = req.path;
  next();
});

// Routes
app.use('/', require('./routes/pageRoutes'));
app.use('/', require('./routes/menuRoutes'));
app.use('/', require('./routes/orderRoutes'));
app.use('/', require('./routes/feedbackRoutes'));

// robots.txt and sitemap.xml are static files served from /public

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found | Slices of Heaven', description: '' });
});

app.listen(PORT, () => {
  console.log(`Slices of Heaven running at http://localhost:${PORT}`);
});
