const express = require('express');
const cors = require('cors');
const initialData = require('./data/initialData');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// In-memory state (can be extended to DB)
let products = [...initialData.products];
let categories = [...initialData.categories];
let occasions = [...initialData.occasions];
let inspirations = [...initialData.styleInspirations];
let trustBadges = [...initialData.trustBadges];
let rentalSteps = [...initialData.rentingSteps];
let newsletterSubscribers = [];
let inquiries = [];

// API Endpoints

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Saradhya Jewels & Rentals API',
    timestamp: new Date().toISOString()
  });
});

// Store details & announcements
app.get('/api/store', (req, res) => {
  res.json({
    success: true,
    data: initialData.storeInfo
  });
});

// Categories
app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// Occasions
app.get('/api/occasions', (req, res) => {
  res.json({
    success: true,
    count: occasions.length,
    data: occasions
  });
});

// Products (with filter query params: category, search, tag, mode)
app.get('/api/products', (req, res) => {
  const { category, search, mode, tag } = req.query;
  let filtered = [...products];

  if (category && category !== 'all') {
    filtered = filtered.filter(
      p => p.categoryId.toLowerCase() === category.toLowerCase() ||
           p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (tag) {
    filtered = filtered.filter(p => p.tag.toLowerCase() === tag.toLowerCase());
  }

  if (mode === 'rent') {
    filtered = filtered.filter(p => p.inStockRent);
  } else if (mode === 'buy') {
    filtered = filtered.filter(p => p.inStockBuy);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      p => p.name.toLowerCase().includes(q) ||
           p.category.toLowerCase().includes(q) ||
           p.description.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
});

// Single Product detail
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// How renting works steps
app.get('/api/steps', (req, res) => {
  res.json({
    success: true,
    data: rentalSteps
  });
});

// Style inspirations
app.get('/api/inspirations', (req, res) => {
  res.json({
    success: true,
    data: inspirations
  });
});

// Trust badges / values
app.get('/api/trust-badges', (req, res) => {
  res.json({
    success: true,
    data: trustBadges
  });
});

// Rental Price Calculation
app.post('/api/rentals/calculate', (req, res) => {
  const { productId, days = 4, damageProtection = true } = req.body;
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // Base 4 days calculation
  const basePrice = product.rentPrice;
  let multiplier = 1;
  if (days === 7 || days === 8) multiplier = 1.6;
  else if (days > 4) multiplier = 1 + (days - 4) * 0.18;

  const totalRental = Math.round(basePrice * multiplier);
  const protectionFee = damageProtection ? Math.round(totalRental * 0.08) : 0;
  const refundableDeposit = product.securityDeposit;
  const grandTotal = totalRental + protectionFee;

  res.json({
    success: true,
    data: {
      productId,
      productName: product.name,
      days,
      baseRentPrice: basePrice,
      rentalTotal: totalRental,
      damageProtectionFee: protectionFee,
      refundableSecurityDeposit: refundableDeposit,
      totalPayableNow: grandTotal + refundableDeposit,
      totalRentalPayable: grandTotal
    }
  });
});

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email is required' });
  }

  if (newsletterSubscribers.includes(email)) {
    return res.json({ success: true, message: 'You are already subscribed to Saradhya updates!' });
  }

  newsletterSubscribers.push(email);
  res.json({
    success: true,
    message: 'Thank you for subscribing! Your 10% welcome rental code is SARADHYA10'
  });
});

// Rental inquiry / booking intent
app.post('/api/inquiries', (req, res) => {
  const { name, phone, email, eventDate, preferredItems, note } = req.body;
  const inquiry = {
    id: `INQ-${Date.now()}`,
    name,
    phone,
    email,
    eventDate,
    preferredItems,
    note,
    createdAt: new Date().toISOString()
  };
  inquiries.push(inquiry);
  res.json({
    success: true,
    message: 'Inquiry received. Our bridal stylist concierge will contact you within 2 hours.',
    inquiryId: inquiry.id
  });
});

app.listen(PORT, () => {
  console.log(`Saradhya Jewels & Rentals API is running on http://localhost:${PORT}`);
});
