import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShopByCategory from './components/ShopByCategory';
import MadeForOccasions from './components/MadeForOccasions';
import DiscoverCollection from './components/DiscoverCollection';
import StatementBanner from './components/StatementBanner';
import HowRentingWorks from './components/HowRentingWorks';
import StyleInspiration from './components/StyleInspiration';
import TrustBadges from './components/TrustBadges';
import Footer from './components/Footer';
import RentalModal from './components/RentalModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import './App.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fallback initial data ensuring zero delay or broken render
const DEFAULT_CATEGORIES = [
  { id: 'bridal-sets', name: 'Bridal Sets', image: '/images/royal-bridal-set.jpg' },
  { id: 'chokers', name: 'Chokers', image: '/images/choker-set.jpg' },
  { id: 'haaram', name: 'Haaram / Long Necklaces', image: '/images/temple-haaram.jpg' },
  { id: 'earrings', name: 'Earrings & Jhumkas', image: '/images/peacock-jhumkas.jpg' },
  { id: 'bangles', name: 'Bangles', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop' },
  { id: 'kundan-sets', name: 'Bridal Sets / Kundan', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop' },
  { id: 'hair-accessories', name: 'Hair Accessories', image: '/images/velvet-cushion.jpg' },
  { id: 'waist-belts', name: 'Waist Belts', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop' }
];

const DEFAULT_OCCASIONS = [
  {
    id: 'bridal',
    title: 'Bridal',
    subtitle: 'For the Bride',
    description: 'Opulent polki & temple jewellery tailored for the bride on her special day.',
    image: '/images/banner-bride.jpg',
    buttonText: 'Shop Bridal'
  },
  {
    id: 'wedding-guest',
    title: 'Wedding Guest',
    subtitle: 'For the Attendee',
    description: 'Understated elegance and classic sparkle for unforgettable celebrations.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    buttonText: 'Shop Guest'
  },
  {
    id: 'festival',
    title: 'Festival',
    subtitle: 'For Festive Days',
    description: 'Traditional gold temple finish designed for poojas and festive gatherings.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop',
    buttonText: 'Shop Festive'
  },
  {
    id: 'party',
    title: 'Party',
    subtitle: 'For Evening Cocktails',
    description: 'Contemporary American Diamond and modern stones for cocktail nights.',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop',
    buttonText: 'Shop Party'
  }
];

const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Aura Kundan Necklace Set',
    category: 'Chokers',
    categoryId: 'chokers',
    tag: 'Rentable',
    badgeColor: '#58111a',
    buyPrice: 7499,
    rentPrice: 999,
    rentDuration: '4 days',
    securityDeposit: 2500,
    image: '/images/choker-set.jpg',
    description: 'Handcrafted choker set encrusted with high-grade semi-precious kundan, ruby gemstones, emerald drops and delicate pearl cluster drops.',
    metalType: 'Brass with 22K Micro Gold Plating',
    includes: '1 Choker Necklace, 1 Pair Matching Earrings, 1 Maang Tikka'
  },
  {
    id: 'prod-2',
    name: 'Padmavati Temple Long Haaram',
    category: 'Haaram / Long Necklaces',
    categoryId: 'haaram',
    tag: 'Bestseller',
    badgeColor: '#c59b27',
    buyPrice: 14500,
    rentPrice: 1899,
    rentDuration: '4 days',
    securityDeposit: 4000,
    image: '/images/temple-haaram.jpg',
    description: 'Intricately carved temple haaram featuring auspicious Goddess Lakshmi central motif framed by handcrafted floral filigree and kemp stones.',
    metalType: 'Antique Matte Gold Finish with Kemp Stones',
    includes: '1 Long Haaram Necklace, Matching Jhumkas'
  },
  {
    id: 'prod-3',
    name: 'Mayuri Peacock Jhumkas',
    category: 'Earrings & Jhumkas',
    categoryId: 'earrings',
    tag: 'New Arrival',
    badgeColor: '#1b4d3e',
    buyPrice: 3200,
    rentPrice: 499,
    rentDuration: '4 days',
    securityDeposit: 1000,
    image: '/images/peacock-jhumkas.jpg',
    description: 'Dancing peacock motif jhumkas adorned with natural green emerald enamel, polki accents and resonant pearl seed fringe.',
    metalType: 'Gold Plated Brass with Meenakari work',
    includes: '1 Pair of Statement Jhumkas with Support Chains'
  },
  {
    id: 'prod-4',
    name: 'Vardhaan Royal Bridal Set',
    category: 'Bridal Sets',
    categoryId: 'bridal-sets',
    tag: 'Most Wanted',
    badgeColor: '#460c14',
    buyPrice: 21999,
    rentPrice: 2999,
    rentDuration: '4 days',
    securityDeposit: 6000,
    image: '/images/royal-bridal-set.jpg',
    description: 'Regal bridal combination of choker, long layered necklace, heavy designer earrings, matha patti, and royal nath.',
    metalType: '24K Gold Polish with Uncut Polki & AAA CZ',
    includes: 'Choker, Long Necklace, Earrings, Matha Patti, Nath, Haathphool pair'
  }
];

const DEFAULT_STEPS = [
  { step: 1, icon: 'Gem', title: 'Choose Jewellery', description: 'Browse our vast collection of statement necklaces, chokers and complete bridal sets.' },
  { step: 2, icon: 'CalendarCheck', title: 'Select Rental Dates', description: 'Pick your 3, 5, or 7-day rental period starting 1 day before your event date to ensure everything fits comfortably.' },
  { step: 3, icon: 'PackageCheck', title: 'Receive & Wear', description: 'Receive sanitized, pristine jewellery in protective casing, ready to stun.' },
  { step: 4, icon: 'RotateCcw', title: 'Easy Return', description: 'Place it back in the prepaid return packaging and our courier will pick it up the next day. No cleaning required!' }
];

const DEFAULT_INSPIRATIONS = [
  {
    id: 'insp-1',
    title: 'Temple Gold Elegance',
    subtitle: 'REAL BRIDE LOOK',
    description: 'Handcrafted pure gold finish antique temple motifs styled with a lush emerald green Kanjeevaram silk saree.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
    tag: 'Real Bride: Ananya'
  },
  {
    id: 'insp-2',
    title: 'Polki Royal Charm',
    subtitle: 'SANGEET & RECEPTION',
    description: 'Uncut polki crystals with pale rose tourmaline drops styled over a bespoke pastel bridal lehenga.',
    image: '/images/banner-bride.jpg',
    tag: 'Real Bride: Meera'
  },
  {
    id: 'insp-3',
    title: 'Contemporary Sparkle',
    subtitle: 'COCKTAIL & GALA NIGHT',
    description: 'Dazzling American Diamond collar paired with an emerald velvet evening silhouette for effortless red-carpet glamour.',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop',
    tag: 'Fashion Muse: Rhea'
  }
];

const DEFAULT_BADGES = [
  { id: 'tb-1', icon: 'ShieldCheck', title: 'Material Details', description: 'High-grade brass base with micro-gold plating, kundan & AAA grade CZ stones.' },
  { id: 'tb-2', icon: 'Sparkles', title: 'Jewellery Care', description: 'Sanitized between wears, guaranteed hygiene and skin-friendly metals.' },
  { id: 'tb-3', icon: 'Calendar', title: 'Rental Terms', description: 'Extend 4–8 day options with flexible extensions and 100% damage protection.' },
  { id: 'tb-4', icon: 'Truck', title: 'Express Delivery', description: 'Pan-India express shipping arriving safely 2 days prior to your event.' },
  { id: 'tb-5', icon: 'Gift', title: 'Easy Returns', description: 'Hassle-free doorstep return pickup scheduled at your convenience.' }
];

export default function App() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [occasions, setOccasions] = useState(DEFAULT_OCCASIONS);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [steps, setSteps] = useState(DEFAULT_STEPS);
  const [inspirations, setInspirations] = useState(DEFAULT_INSPIRATIONS);
  const [badges, setBadges] = useState(DEFAULT_BADGES);

  // Modes & Filtering
  const [globalMode, setGlobalMode] = useState('rent');
  const [collectionMode, setCollectionMode] = useState('rent');
  const [activeFilter, setActiveFilter] = useState('all');

  // Interactive States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  // Fetch from backend API
  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((data) => data.success && setCategories(data.data))
      .catch(() => {});

    fetch(`${API_BASE}/occasions`)
      .then((res) => res.json())
      .then((data) => data.success && setOccasions(data.data))
      .catch(() => {});

    fetch(`${API_BASE}/steps`)
      .then((res) => res.json())
      .then((data) => data.success && setSteps(data.data))
      .catch(() => {});

    fetch(`${API_BASE}/inspirations`)
      .then((res) => res.json())
      .then((data) => data.success && setInspirations(data.data))
      .catch(() => {});

    fetch(`${API_BASE}/trust-badges`)
      .then((res) => res.json())
      .then((data) => data.success && setBadges(data.data))
      .catch(() => {});
  }, []);

  // Fetch products with filter
  useEffect(() => {
    let url = `${API_BASE}/products?category=${activeFilter}&mode=${collectionMode}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setProducts(data.data);
        } else {
          // Fallback filter locally
          let filtered = DEFAULT_PRODUCTS;
          if (activeFilter !== 'all') {
            filtered = filtered.filter((p) => p.categoryId === activeFilter);
          }
          setProducts(filtered);
        }
      })
      .catch(() => {
        let filtered = DEFAULT_PRODUCTS;
        if (activeFilter !== 'all') {
          filtered = filtered.filter((p) => p.categoryId === activeFilter);
        }
        setProducts(filtered);
      });
  }, [activeFilter, collectionMode]);

  // Wishlist Toggle
  const handleToggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      showToast('Removed from your saved favourites.');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Added to your saved favourites!');
    }
  };

  // Add to Bag / Cart
  const handleAddToCart = (orderItem) => {
    setCartItems([...cartItems, orderItem]);
    showToast(`Added ${orderItem.product.name} (${orderItem.mode.toUpperCase()}) to your bag.`);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    showToast('Item removed from bag.');
  };

  const handleSubscribeNewsletter = async (email) => {
    try {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      return data;
    } catch {
      return { success: true, message: 'Subscribed successfully! Use SARADHYA10 for 10% off.' };
    }
  };

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-renting-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="saradhya-app">
      {/* Navbar */}
      <Navbar
        globalMode={globalMode}
        setGlobalMode={setGlobalMode}
        wishlistCount={wishlist.length}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main>
        {/* 1. Hero Section */}
        <Hero
          heroMode={globalMode}
          setHeroMode={setGlobalMode}
          onExploreShop={scrollToCategories}
          onExploreRent={scrollToCollections}
        />

        {/* 2. Shop by Category (8 Cards) */}
        <ShopByCategory
          categories={categories}
          onSelectCategory={(catId) => {
            setActiveFilter(catId);
            scrollToCollections();
          }}
        />

        {/* 3. Made for Your Next Occasion (4 Cards) */}
        <MadeForOccasions
          occasions={occasions}
          onSelectOccasion={(occId) => {
            if (occId === 'bridal') setActiveFilter('bridal-sets');
            scrollToCollections();
          }}
        />

        {/* 4. Discover the Collection (4 Product Cards) */}
        <DiscoverCollection
          products={products}
          collectionMode={collectionMode}
          setCollectionMode={setCollectionMode}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
        />

        {/* 5. Statement Bridal Banner ("Wear designer statement bridal sets...") */}
        <StatementBanner onExploreProcess={scrollToHowItWorks} />

        {/* 6. How Renting Works (4 Steps) */}
        <HowRentingWorks steps={steps} />

        {/* 7. Style Inspiration (3 Cards) */}
        <StyleInspiration
          inspirations={inspirations}
          onSelectLook={(item) => {
            showToast(`Opening style guide for ${item.title}`);
            scrollToCollections();
          }}
        />

        {/* 8. Trust & Value Badges (5 Badges) */}
        <TrustBadges badges={badges} />
      </main>

      {/* 9. Footer */}
      <Footer onSubscribeNewsletter={handleSubscribeNewsletter} />

      {/* Interactive Modals & Drawers */}
      <RentalModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={products}
        onRemoveWishlist={handleToggleWishlist}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Floating Toast Notice */}
      {toast && (
        <div className="toast-notice">
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
