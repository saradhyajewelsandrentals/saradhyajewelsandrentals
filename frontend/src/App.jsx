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
import CollectionsPage from './components/CollectionsPage';
import PolicyPages from './components/PolicyPages';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import RentalModal from './components/RentalModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import './App.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fallback initial categories
const DEFAULT_CATEGORIES = [
  { id: 'bridal-sets', name: 'Bridal Sets', image: '/images/royal-bridal-set.jpg' },
  { id: 'chokers', name: 'Chokers', image: '/images/choker-set.jpg' },
  { id: 'haaram', name: 'Haaram / Long Necklaces', image: '/images/temple-haaram.jpg' },
  { id: 'earrings', name: 'Earrings & Jhumkas', image: '/images/peacock-jhumkas.jpg' },
  { id: 'bangles', name: 'Bangles', image: '/images/bangles-set.jpg' },
  { id: 'rings', name: 'Rings', image: '/images/rings-collection.jpg' },
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
    description: 'Traditional 1-gram rold gold temple finish designed for poojas and festive gatherings.',
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

// All 8 products matching the new Collections / Buy page screenshot
const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Aaradhya Royal Kundan...',
    fullName: 'Aaradhya Royal Kundan Choker Set',
    category: 'CHOKER SET',
    categoryId: 'chokers',
    tag: 'Bestseller',
    badgeColor: '#58111a',
    rating: 4.9,
    buyPrice: 3899,
    originalPrice: 5499,
    rentPrice: 899,
    rentDuration: '4 days',
    securityDeposit: 2000,
    finish: '1-Gram Rold Gold Finish',
    stoneColor: 'ruby',
    occasion: 'Bridal Wedding',
    image: '/images/choker-set.jpg',
    description: 'Handcrafted royal choker set in premium 1-gram rold gold, encrusted with high-grade semi-precious kundan, ruby gemstones, and delicate pearl cluster drops.',
    metalType: 'High-Grade Brass with 1-Gram Micro Rold Gold Plating',
    includes: '1 Choker Necklace, 1 Pair Matching Earrings, 1 Maang Tikka'
  },
  {
    id: 'prod-2',
    name: 'Lakshmi Antique Haram',
    fullName: 'Lakshmi Antique Temple Rold Gold Haram',
    category: 'LONG NECKLACE',
    categoryId: 'haaram',
    tag: 'New Arrival',
    badgeColor: '#3e522d',
    rating: 5.0,
    buyPrice: 4499,
    originalPrice: 6299,
    rentPrice: 1299,
    rentDuration: '4 days',
    securityDeposit: 2500,
    finish: 'Antique Matte Rold Gold',
    stoneColor: 'ruby',
    occasion: 'Festive & Sangeet',
    image: '/images/temple-haaram.jpg',
    description: 'Intricately carved temple haaram in antique matte rold gold, featuring auspicious Goddess Lakshmi central motif framed by handcrafted floral filigree and kemp stones.',
    metalType: 'Antique Matte Rold Gold Finish over Copper Brass',
    includes: '1 Long Haaram Necklace, Matching Jhumkas'
  },
  {
    id: 'prod-3',
    name: 'Chandrakala Polki...',
    fullName: 'Chandrakala Polki Statement Jhumkas',
    category: 'EARRINGS',
    categoryId: 'earrings',
    tag: null,
    rating: 4.8,
    buyPrice: 2199,
    originalPrice: null,
    rentPrice: 499,
    rentDuration: '4 days',
    securityDeposit: 1000,
    finish: '1-Gram Rold Gold Finish',
    stoneColor: 'emerald',
    occasion: 'Festive & Sangeet',
    image: '/images/peacock-jhumkas.jpg',
    description: 'Dancing peacock motif jhumkas adorned with natural green emerald enamel, polki accents and resonant pearl seed fringe in 1-gram rold gold.',
    metalType: '1-Gram Micro Rold Gold Plated Brass with Meenakari work',
    includes: '1 Pair of Statement Jhumkas with Support Chains'
  },
  {
    id: 'prod-4',
    name: 'Rajwada Kundan Kada Se...',
    fullName: 'Rajwada Kundan Kada Bangles (Set of 4)',
    category: 'BANGLES SET',
    categoryId: 'bangles',
    tag: 'Limited Edition',
    badgeColor: '#7e1d24',
    rating: 4.9,
    buyPrice: 2999,
    originalPrice: 3999,
    rentPrice: 699,
    rentDuration: '4 days',
    securityDeposit: 1500,
    finish: '1-Gram Rold Gold Finish',
    stoneColor: 'ruby',
    occasion: 'Bridal Wedding',
    image: '/images/bangles-set.jpg',
    description: 'Royal Rajputana openable kadas encrusted with hand-faceted kundan stones and ruby red center gems in durable 1-gram rold gold micro polish.',
    metalType: '1-Gram Antique Rold Gold Plating over Copper',
    includes: 'Set of 4 Designer Bangles (Sizes 2.4, 2.6, 2.8)'
  },
  {
    id: 'prod-5',
    name: 'Solitaire Illusion Pendant...',
    fullName: 'Solitaire Illusion Pendant & Earring Set',
    category: 'PENDANT SET',
    categoryId: 'necklace-sets',
    tag: null,
    rating: 4.7,
    buyPrice: 1899,
    originalPrice: null,
    rentPrice: 399,
    rentDuration: '4 days',
    securityDeposit: 800,
    finish: 'Rose Gold & Rhodium',
    stoneColor: 'white',
    occasion: 'Reception Gala',
    image: '/images/pendant-set.jpg',
    description: 'Minimalist American Diamond solitaire illusion halo pendant with matching round studs on fine rhodium chain.',
    metalType: '925 Silver Finish with AAA Cubic Zirconia',
    includes: '1 Pendant on 18-inch Chain, 1 Pair of Matching Studs'
  },
  {
    id: 'prod-6',
    name: 'Jaipur Meenakari Choker',
    fullName: 'Jaipur Turquoise Meenakari Choker Set',
    category: 'CHOKER SET',
    categoryId: 'chokers',
    tag: 'Handcrafted',
    badgeColor: '#4a121a',
    rating: 4.9,
    buyPrice: 4299,
    originalPrice: 5999,
    rentPrice: 999,
    rentDuration: '4 days',
    securityDeposit: 2000,
    finish: '1-Gram Rold Gold Finish',
    stoneColor: 'multicolor',
    occasion: 'Festive & Sangeet',
    image: '/images/meenakari-choker.jpg',
    description: 'Exquisite Rajasthani turquoise meenakari choker adorned with kundan floral medallions and cascading turquoise seed beads in rold gold polish.',
    metalType: 'Brass with Enamel Meenakari and 1-Gram Rold Gold Foil',
    includes: '1 Choker Necklace with Adjustable Cord, Matching Earrings'
  },
  {
    id: 'prod-7',
    name: 'Tribal Silver Ghungroo...',
    fullName: 'Tribal Silver Ghungroo Statement Choker',
    category: 'CHOKER SET',
    categoryId: 'chokers',
    tag: null,
    rating: 4.8,
    buyPrice: 2499,
    originalPrice: null,
    rentPrice: 599,
    rentDuration: '4 days',
    securityDeposit: 1200,
    finish: 'Oxidized Silver',
    stoneColor: 'white',
    occasion: 'Subtle Ethnic / Puja',
    image: '/images/silver-choker.jpg',
    description: 'Vintage Afghan inspired oxidized silver choker engraved with floral panels and rhythmic ghungroo musical bells.',
    metalType: 'German Silver Oxidized Finish',
    includes: '1 Statement Choker with Dori Tie-back'
  },
  {
    id: 'prod-8',
    name: 'Regal Polki Matha Patti',
    fullName: 'Regal Polki Matha Patti & Necklace Suite',
    category: 'MAANG TIKKA',
    categoryId: 'maang-tikka',
    tag: 'Best Seller',
    badgeColor: '#58111a',
    rating: 5.0,
    buyPrice: 3499,
    originalPrice: 4899,
    rentPrice: 799,
    rentDuration: '4 days',
    securityDeposit: 1800,
    finish: '1-Gram Rold Gold Finish',
    stoneColor: 'ruby',
    occasion: 'Bridal Wedding',
    image: '/images/royal-bridal-set.jpg',
    description: 'Three-tier bridal matha patti framed with uncut polki stones, pearl clusters, and traditional crescent moon centerpiece in micro rold gold plating.',
    metalType: '1-Gram Micro Rold Gold Plated Brass with Uncut Polki & Pearls',
    includes: '1 Matha Patti with Hair Combs, Matching Maang Tikka'
  },
  {
    id: 'prod-ring-1',
    name: 'Padmaavat Floral Kundan...',
    fullName: 'Padmaavat Floral Kundan Statement Ring',
    category: 'RINGS',
    categoryId: 'rings',
    model: 'Oversized Floral Kundan Cocktail Rings',
    tag: 'Trending',
    badgeColor: '#c59b27',
    rating: 5.0,
    buyPrice: 2199,
    originalPrice: 2999,
    rentPrice: 399,
    rentDuration: '4 days',
    securityDeposit: 900,
    finish: '1-Gram Rold Gold Finish',
    stoneColor: 'ruby',
    occasion: 'Bridal Wedding',
    image: '/images/rings-collection.jpg',
    description: 'Magnificent oversized floral statement ring studded with uncut kundan stones, ruby accents, and pearls in 1-gram rold gold finish. Features an adjustable band.',
    metalType: '1-Gram Micro Rold Gold Plated Brass',
    includes: '1 Adjustable Royal Statement Ring (Fits All Sizes)'
  },
  {
    id: 'prod-ring-2',
    name: 'Noor Mirror Arsi Ring',
    fullName: 'Noor Royal Mirror Arsi Bridal Ring',
    category: 'RINGS',
    categoryId: 'rings',
    model: 'Royal Mirror Arsi Rings',
    tag: 'Bestseller',
    badgeColor: '#58111a',
    rating: 4.9,
    buyPrice: 1799,
    originalPrice: 2499,
    rentPrice: 349,
    rentDuration: '4 days',
    securityDeposit: 800,
    finish: '1-Gram Rold Gold Finish',
    stoneColor: 'white',
    occasion: 'Festive & Sangeet',
    image: '/images/rings-collection.jpg',
    description: 'Historic Mughal mirror arsi thumb ring framed by luminous pearl micro-beads and hand-cut polki crystals in rold gold finish.',
    metalType: '1-Gram Rold Gold Antique Brass',
    includes: '1 Arsi Mirror Ring (Adjustable Band)'
  },
  {
    id: 'prod-ring-3',
    name: 'Mayuri Temple Peacock Ring',
    fullName: 'Mayuri Antique Temple Peacock Ring',
    category: 'RINGS',
    categoryId: 'rings',
    model: 'Antique Temple Peacock Rings',
    tag: 'New Arrival',
    badgeColor: '#1b4d3e',
    rating: 4.9,
    buyPrice: 1499,
    originalPrice: 1999,
    rentPrice: 299,
    rentDuration: '4 days',
    securityDeposit: 600,
    finish: 'Antique Matte Rold Gold',
    stoneColor: 'emerald',
    occasion: 'Subtle Ethnic / Puja',
    image: '/images/rings-collection.jpg',
    description: 'Sculpted 3D peacock motif ring adorned with rubies and emerald drops in antique matte South Indian temple rold gold finish.',
    metalType: 'Matte Antique Rold Gold over Copper Brass',
    includes: '1 Temple Peacock Ring'
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
    title: 'Temple Rold Gold Elegance',
    subtitle: 'REAL BRIDE LOOK',
    description: 'Handcrafted 1-gram rold gold antique temple motifs styled with a lush emerald green Kanjeevaram silk saree.',
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
  { id: 'tb-1', icon: 'ShieldCheck', title: '1-Gram Rold Gold', description: 'Premium copper & brass base with micro rold gold plating, uncut polki & kundan.' },
  { id: 'tb-2', icon: 'Sparkles', title: 'Jewellery Care', description: 'Sanitized between wears, guaranteed hygiene and 100% skin-friendly metals.' },
  { id: 'tb-3', icon: 'Calendar', title: 'Rental Terms', description: 'Extend 4–8 day options with flexible extensions and 100% damage protection.' },
  { id: 'tb-4', icon: 'Truck', title: 'Express Delivery', description: 'Pan-India express shipping arriving safely 2 days prior to your event.' },
  { id: 'tb-5', icon: 'Gift', title: 'Easy Returns', description: 'Hassle-free doorstep return pickup scheduled at your convenience.' }
];

export default function App() {
  const [currentPageView, setCurrentPageView] = useState('home'); // 'home' | 'collections'
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [occasions, setOccasions] = useState(DEFAULT_OCCASIONS);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [steps, setSteps] = useState(DEFAULT_STEPS);
  const [inspirations, setInspirations] = useState(DEFAULT_INSPIRATIONS);
  const [badges, setBadges] = useState(DEFAULT_BADGES);

  // Modes & Filtering
  const [globalMode, setGlobalMode] = useState('buy');
  const [collectionMode, setCollectionMode] = useState('buy');
  const [activeFilter, setActiveFilter] = useState('all');

  // Interactive States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authPrompt, setAuthPrompt] = useState(null);
  const [pendingCartItem, setPendingCartItem] = useState(null);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  // Firebase Auth State Listener & auto-add pending cart item upon sign-in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && pendingCartItem) {
        setCartItems(prev => [...prev, pendingCartItem]);
        showToast(`Welcome! Added ${pendingCartItem.product.name} to your bag.`);
        setPendingCartItem(null);
        setAuthPrompt(null);
        setIsCartOpen(true);
        setSelectedProduct(null);
      }
    });
    return () => unsubscribe();
  }, [pendingCartItem]);

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

    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => data.success && data.data.length > 0 && setProducts(data.data))
      .catch(() => {});
  }, []);

  // Real-time Firestore sync: Any price/image/product changes by admin immediately update live on customer store
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'catalog_products'), (snapshot) => {
      if (!snapshot.empty) {
        const liveProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(liveProducts);
      }
    }, () => {});
    return () => unsub();
  }, []);

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

  // Add to Bag / Cart - Enforce user sign-in/sign-up
  const handleAddToCart = (orderItem) => {
    if (!user) {
      setPendingCartItem(orderItem);
      setAuthPrompt(`Please sign in or create an account to reserve "${orderItem.product.name}" and proceed to your bag.`);
      setIsAuthOpen(true);
      showToast('Please sign in or create an account to add to bag.');
      return;
    }
    setCartItems(prev => [...prev, orderItem]);
    showToast(`Added ${orderItem.product.name} to your bag.`);
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
      // Save to Firebase Firestore
      await addDoc(collection(db, 'newsletter'), {
        email,
        subscribedAt: serverTimestamp(),
        source: 'homepage_footer'
      });
    } catch (e) {
      // Continue even if offline
    }

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

  const handleCheckoutOrder = async () => {
    if (cartItems.length === 0) return;
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user ? user.uid : 'guest',
        userEmail: user ? user.email : 'guest@saradhyajewels.com',
        userName: user ? (user.displayName || 'Guest Patron') : 'Guest Patron',
        items: cartItems.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          mode: item.mode,
          price: item.price,
          securityDeposit: item.securityDeposit,
          rentalDays: item.rentalDays || null,
          rentalStartDate: item.rentalStartDate || null
        })),
        totalAmount: cartItems.reduce((acc, i) => acc + i.price + (i.securityDeposit || 0) + (i.damageProtectionFee || 0), 0),
        status: 'Confirmed & Awaiting KYC',
        createdAt: serverTimestamp()
      });
    } catch (e) {
      // Continue
    }
    showToast('Your order has been recorded in Saradhya Royal Concierge!');
  };

  const navigateToCollections = (filter = 'all', mode = null) => {
    if (mode) setGlobalMode(mode);
    setActiveFilter(filter);
    setCurrentPageView('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPageView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPage = (page, filter = 'all', mode = null) => {
    if (page === 'home') {
      window.history.pushState(null, '', '/');
      navigateToHome();
    } else if (page === 'collections') {
      window.history.pushState(null, '', '/#collections');
      navigateToCollections(filter, mode);
    } else if (page === 'admin') {
      window.history.pushState(null, '', '/admin');
      setCurrentPageView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (['privacy', 'terms', 'guidelines', 'contact'].includes(page)) {
      window.history.pushState(null, '', `/${page}`);
      setCurrentPageView(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // URL route listener (supports secret /saradhya-internal-admin, /admin, #admin, /privacy, etc.)
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path === '/saradhya-internal-admin' || hash === '#admin') {
        setCurrentPageView('admin');
      } else if (['/privacy', '/terms', '/guidelines', '/contact'].includes(path)) {
        setCurrentPageView(path.replace('/', ''));
      } else if (['#privacy', '#terms', '#guidelines', '#contact'].includes(hash)) {
        setCurrentPageView(hash.replace('#', ''));
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    window.addEventListener('hashchange', handleUrlRoute);
    return () => {
      window.removeEventListener('popstate', handleUrlRoute);
      window.removeEventListener('hashchange', handleUrlRoute);
    };
  }, []);

  return (
    <div className="saradhya-app">
      {/* Navbar (hidden in full admin view for clean dashboard experience) */}
      {currentPageView !== 'admin' && (
        <Navbar
          globalMode={globalMode}
          setGlobalMode={(newMode) => {
            setGlobalMode(newMode);
            setCollectionMode(newMode);
          }}
          wishlistCount={wishlist.length}
          cartCount={cartItems.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          currentPageView={currentPageView}
          activeFilter={activeFilter}
          onNavigate={navigateToPage}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      )}

      <main>
        {currentPageView === 'home' ? (
          <>
            {/* 1. Hero Section */}
            <Hero
              heroMode={globalMode}
              setHeroMode={setGlobalMode}
              onExploreShop={() => navigateToCollections('all', 'buy')}
              onExploreRent={() => navigateToCollections('all', 'rent')}
            />

            {/* 2. Shop by Category (8 Cards) */}
            <ShopByCategory
              categories={categories}
              onSelectCategory={(catId) => navigateToCollections(catId)}
            />

            {/* 3. Made for Your Next Occasion (4 Cards) */}
            <MadeForOccasions
              occasions={occasions}
              onSelectOccasion={(occId) => navigateToCollections(occId)}
            />

            {/* 4. Discover the Collection (Showcase) */}
            <DiscoverCollection
              products={products.slice(0, 4)}
              collectionMode={collectionMode}
              setCollectionMode={setCollectionMode}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={(prod) => setSelectedProduct(prod)}
            />

            {/* 5. Statement Bridal Banner */}
            <StatementBanner onExploreProcess={() => navigateToCollections('all', 'rent')} />

            {/* 6. How Renting Works (4 Steps) */}
            <HowRentingWorks steps={steps} />

            {/* 7. Style Inspiration (3 Cards) */}
            <StyleInspiration
              inspirations={inspirations}
              onSelectLook={() => navigateToCollections()}
            />

            {/* 8. Trust & Value Badges */}
            <TrustBadges badges={badges} />
          </>
        ) : currentPageView === 'collections' ? (
          /* COLLECTIONS / BUY JEWELLERY LISTING PAGE */
          <CollectionsPage
            mode={globalMode}
            setMode={setGlobalMode}
            products={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onNavigateHome={navigateToHome}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        ) : currentPageView === 'admin' ? (
          /* DEDICATED ADMIN PANEL (SEPARATE URL /admin) */
          <AdminPanel
            products={products}
            onUpdateProducts={(updated) => setProducts(updated)}
            onNavigateHome={() => navigateToPage('home')}
            user={user}
          />
        ) : (
          /* DEDICATED SEPARATE POLICY & CONTACT PAGES (INDIAN STANDARDS) */
          <PolicyPages
            activeTab={currentPageView}
            onSelectTab={(tab) => {
              setCurrentPageView(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateHome={navigateToHome}
            onNavigateCollections={() => navigateToCollections('all')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSubscribeNewsletter={handleSubscribeNewsletter}
        onNavigate={navigateToPage}
      />

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

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setAuthPrompt(null);
        }}
        user={user}
        onShowToast={showToast}
        authPrompt={authPrompt}
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
