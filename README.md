# Saradhya Jewels & Rentals 💎✨

A full-stack e-commerce web platform for royal Indian bridal jewellery sales and rentals.

## Project Structure

```
saradhyajewelsandrentals/
├── backend/                  # Node.js + Express REST API
│   ├── data/
│   │   └── initialData.js    # Catalog, categories, occasions, inspiration data
│   ├── package.json
│   └── server.js             # Express server with rental pricing calculator & APIs
│
├── frontend/                 # React + Vite application
│   ├── public/
│   │   └── images/           # High-resolution bridal jewellery assets
│   ├── src/
│   │   ├── components/       # Hero, Categories, Occasions, Collection, Modals, Drawers
│   │   ├── App.jsx           # Main App component with API integration
│   │   ├── App.css           # Luxury styling, animations, and responsive grids
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── .gitignore
```

## Features

- **Split Frontend & Backend**: Separated architectures with clean modular components.
- **Dual Shopping Experience (Buy vs Rent)**: Seamless toggle between direct purchase and rental periods (4, 7, 10 days).
- **Curated Category Grid**: 8 categories (Bridal Sets, Chokers, Haaram, Earrings & Jhumkas, Bangles, Kundan, Hair Accessories, Waist Belts).
- **Occasion-Based Styling**: Bridal, Wedding Guest, Festival, and Evening Party looks.
- **Interactive Rental Calculator**: Real-time calculation of rental fee, security deposit, and damage protection waiver via backend API.
- **Interactive Bag & Wishlist**: Slide-out drawers with transparent deposit breakdowns.
- **Live Search Modal**: Real-time debounced search across all collections.
- **Responsive & Accessible**: Mobile-friendly layout with custom luxury typography.

## Quick Start

### 1. Run the Backend API
```bash
cd backend
npm install
npm start
```
The API will run on `http://localhost:5000`.

### 2. Run the React Frontend
```bash
cd frontend
npm install
npm run dev
```
The React app will launch on `http://localhost:5173`.
