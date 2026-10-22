import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  LogOut,
  ArrowLeft,
  DollarSign,
  Search,
  Sliders,
  TrendingUp,
  Users,
  Calendar,
  Save,
  X,
  Sparkles,
  ShieldAlert,
  Image as ImageIcon
} from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminPanel({
  products,
  onUpdateProducts,
  onNavigateHome,
  user
}) {
  // Admin authentication pass
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active admin tab: 'products' | 'orders' | 'subscribers'
  const [activeTab, setActiveTab] = useState('products');

  // Search & Filters in Admin
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Editing or Adding product
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Orders / Bookings from Firestore
  const [bookings, setBookings] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Check existing session
  useEffect(() => {
    const saved = localStorage.getItem('saradhya_admin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch Firestore bookings & subscribers
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchAdminData = async () => {
      setLoadingOrders(true);
      try {
        const bookingsSnap = await getDocs(collection(db, 'bookings'));
        const list = bookingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(list);
      } catch (e) {
        console.error('Error fetching bookings', e);
      }

      try {
        const subSnap = await getDocs(collection(db, 'newsletter'));
        const subs = subSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubscribers(subs);
      } catch (e) {
        console.error('Error fetching subscribers', e);
      }
      setLoadingOrders(false);
    };

    fetchAdminData();
  }, [isAuthenticated]);

  // Handle Passcode Login
  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Default admin passcodes
    if (passcode === 'admin123' || passcode === 'saradhya@2026' || (user && user.email?.includes('admin'))) {
      setIsAuthenticated(true);
      localStorage.setItem('saradhya_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect admin passcode. Try: saradhya@2026 or admin123');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('saradhya_admin_auth');
  };

  // Filter products
  const displayedProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.model && p.model.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Save (Create or Update) Product
  const handleSaveProduct = async (productToSave) => {
    let updated;
    if (isAddingNew) {
      const newProd = {
        ...productToSave,
        id: productToSave.id || `prod-${Date.now()}`
      };
      updated = [newProd, ...products];
    } else {
      updated = products.map(p => p.id === productToSave.id ? productToSave : p);
    }

    // Update parent state
    onUpdateProducts(updated);

    // Save to Firestore if connected
    try {
      await setDoc(doc(db, 'catalog_products', productToSave.id), productToSave, { merge: true });
    } catch (e) {
      // Local fallback
    }

    setEditingProduct(null);
    setIsAddingNew(false);
  };

  // Delete Product
  const handleDeleteProduct = async (prodId) => {
    if (window.confirm('Are you sure you want to delete this piece from the catalog?')) {
      const updated = products.filter(p => p.id !== prodId);
      onUpdateProducts(updated);

      try {
        await deleteDoc(doc(db, 'catalog_products', prodId));
      } catch (e) {}
    }
  };

  // -------------------------------------------------------------
  // RENDER: LOGIN GATE
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '85vh',
        backgroundColor: '#faf8f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: '2.5rem',
          maxWidth: 420,
          width: '100%',
          boxShadow: '0 10px 30px rgba(88,17,26,0.08)',
          border: '1px solid #ede7dc',
          textAlign: 'center'
        }}>
          <div className="logo-symbol" style={{ margin: '0 auto 1rem auto' }}>S</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--maroon-900)', margin: '0 0 0.5rem 0' }}>
            Saradhya Admin Portal
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-500)', marginBottom: '1.75rem' }}>
            Manage 1-gram rold gold jewellery catalog, update rental pricing, change images, and view client orders.
          </p>

          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--charcoal-700)', marginBottom: '0.4rem' }}>
                Admin Master Passcode
              </label>
              <input
                type="password"
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 8,
                  border: '1px solid #dcd3c4',
                  fontSize: '0.92rem'
                }}
                autoFocus
              />
              <span style={{ fontSize: '0.72rem', color: '#888', marginTop: 4, display: 'block' }}>
                Default key: <code>saradhya@2026</code> or <code>admin123</code>
              </span>
            </div>

            {authError && (
              <p style={{ color: '#d32f2f', fontSize: '0.82rem', margin: 0, fontWeight: 500 }}>
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
            >
              Enter Admin Dashboard
            </button>
          </form>

          <button
            onClick={onNavigateHome}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--charcoal-500)',
              fontSize: '0.84rem',
              marginTop: '1.5rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ArrowLeft size={14} /> Return to Storefront
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div style={{ minHeight: '90vh', backgroundColor: '#f7f5f0', paddingBottom: '5rem' }}>
      
      {/* Admin Top Navigation Bar */}
      <header style={{
        backgroundColor: 'var(--maroon-900)',
        color: '#ffffff',
        padding: '1rem 2rem',
        borderBottom: '2px solid var(--gold-500)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="logo-symbol" style={{ width: 34, height: 34, fontSize: '1rem' }}>S</div>
          <div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.04em' }}>
              Saradhya Admin Control
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', display: 'block' }}>
              1-Gram Rold Gold & Rentals Catalog Management
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              backgroundColor: activeTab === 'products' ? 'var(--gold-500)' : 'rgba(255,255,255,0.1)',
              color: activeTab === 'products' ? 'var(--maroon-900)' : '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              backgroundColor: activeTab === 'orders' ? 'var(--gold-500)' : 'rgba(255,255,255,0.1)',
              color: activeTab === 'orders' ? 'var(--maroon-900)' : '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Client Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            style={{
              backgroundColor: activeTab === 'subscribers' ? 'var(--gold-500)' : 'rgba(255,255,255,0.1)',
              color: activeTab === 'subscribers' ? 'var(--maroon-900)' : '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Subscribers ({subscribers.length})
          </button>
        </div>

        {/* Quick Exit Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onNavigateHome}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff',
              padding: '0.45rem 0.85rem',
              borderRadius: 6,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Eye size={14} /> View Live Store
          </button>
          <button
            onClick={handleAdminLogout}
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#ffffff',
              padding: '0.45rem 0.85rem',
              borderRadius: 6,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="container" style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1.5rem' }}>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: PRODUCT CATALOG MANAGEMENT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'products' && (
          <div>
            {/* Top Toolbar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
              backgroundColor: '#ffffff',
              padding: '1.25rem',
              borderRadius: 12,
              border: '1px solid #ede7dc'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 260 }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
                  <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: '#888' }} />
                  <input
                    type="text"
                    placeholder="Search by name, category, or model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                      borderRadius: 8,
                      border: '1px solid #dcd3c4',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: 8,
                    border: '1px solid #dcd3c4',
                    fontSize: '0.88rem',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="chokers">Chokers</option>
                  <option value="haaram">Haaram / Necklaces</option>
                  <option value="necklace-sets">Necklace Sets</option>
                  <option value="earrings">Earrings</option>
                  <option value="bangles">Bangles</option>
                  <option value="rings">Rings</option>
                  <option value="bridal-sets">Bridal Sets</option>
                  <option value="maang-tikka">Maang Tikka</option>
                </select>
              </div>

              {/* Add New Product Button */}
              <button
                className="btn-primary"
                onClick={() => {
                  setEditingProduct({
                    id: `prod-${Date.now()}`,
                    name: '',
                    fullName: '',
                    category: 'CHOKER SET',
                    categoryId: 'chokers',
                    model: '',
                    tag: 'New Arrival',
                    badgeColor: '#3e522d',
                    rating: 5.0,
                    buyPrice: 2999,
                    originalPrice: 4499,
                    rentPrice: 699,
                    rentDuration: '4 days',
                    securityDeposit: 1500,
                    finish: '1-Gram Rold Gold Finish',
                    stoneColor: 'ruby',
                    occasion: 'Bridal Wedding',
                    image: '/images/choker-set.jpg',
                    description: 'Handcrafted 1-gram rold gold statement piece with micro gold finish.',
                    metalType: 'High-Grade Brass with 1-Gram Micro Rold Gold Plating',
                    includes: '1 Necklace, Matching Earrings',
                    inStockBuy: true,
                    inStockRent: true
                  });
                  setIsAddingNew(true);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem' }}
              >
                <Plus size={16} /> Add New Jewellery Piece
              </button>
            </div>

            {/* Products Table Card */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: 12,
              border: '1px solid #ede7dc',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#faf8f5', borderBottom: '1px solid #ede7dc', color: 'var(--charcoal-600)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>Piece / Image</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Category & Model</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Buy Price</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Rent (4 Days)</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Deposit</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Finish</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedProducts.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f2ece1', verticalAlign: 'middle' }}>
                        
                        {/* Image & Title */}
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img
                              src={p.image}
                              alt={p.name}
                              style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', border: '1px solid #ede7dc' }}
                              onError={(e) => { e.currentTarget.src = '/images/choker-set.jpg'; }}
                            />
                            <div>
                              <strong style={{ color: 'var(--maroon-900)', display: 'block', fontSize: '0.9rem' }}>
                                {p.name}
                              </strong>
                              <span style={{ fontSize: '0.75rem', color: '#888' }}>ID: {p.id}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category & Model */}
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span style={{ fontWeight: 600, color: 'var(--charcoal-700)' }}>{p.category}</span>
                          {p.model && (
                            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-600)' }}>
                              {p.model}
                            </span>
                          )}
                        </td>

                        {/* Buy Price */}
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--maroon-900)' }}>
                          ₹{p.buyPrice?.toLocaleString('en-IN')}
                        </td>

                        {/* Rent Price */}
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--charcoal-800)' }}>
                          ₹{p.rentPrice?.toLocaleString('en-IN')}
                        </td>

                        {/* Security Deposit */}
                        <td style={{ padding: '0.75rem 1rem', color: '#2e7d32', fontWeight: 500 }}>
                          ₹{p.securityDeposit?.toLocaleString('en-IN')}
                        </td>

                        {/* Finish */}
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.78rem' }}>
                          {p.finish || '1-Gram Rold Gold'}
                        </td>

                        {/* Stock Status */}
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            padding: '2px 8px',
                            borderRadius: 999,
                            backgroundColor: p.inStockRent !== false ? '#e8f5e9' : '#ffebee',
                            color: p.inStockRent !== false ? '#2e7d32' : '#c62828',
                            fontWeight: 600
                          }}>
                            {p.inStockRent !== false ? 'Available' : 'Out of Stock'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                            <button
                              onClick={() => {
                                setEditingProduct({ ...p });
                                setIsAddingNew(false);
                              }}
                              title="Edit piece"
                              style={{
                                padding: '6px 10px',
                                borderRadius: 6,
                                border: '1px solid #dcd3c4',
                                backgroundColor: '#ffffff',
                                color: 'var(--charcoal-700)',
                                cursor: 'pointer'
                              }}
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              title="Delete piece"
                              style={{
                                padding: '6px 10px',
                                borderRadius: 6,
                                border: '1px solid #ffcdd2',
                                backgroundColor: '#ffebee',
                                color: '#c62828',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: CLIENT BOOKINGS & RENTAL ORDERS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'orders' && (
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: 12, border: '1px solid #ede7dc' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--maroon-900)', marginTop: 0 }}>
              Live Rental Bookings & Concierge Orders
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-500)', marginBottom: '1.5rem' }}>
              Real-time bookings recorded via Firebase Cloud Firestore.
            </p>

            {loadingOrders ? (
              <p>Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                <Package size={40} style={{ margin: '0 auto 1rem auto', color: '#ccc' }} />
                <p>No client bookings recorded yet. New checkout orders will automatically stream here.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {bookings.map((b) => (
                  <div key={b.id} style={{ border: '1px solid #ede7dc', borderRadius: 8, padding: '1.25rem', backgroundColor: '#faf8f5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--maroon-900)' }}>Order #{b.id.substring(0, 8)}</strong>
                      <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: 999, backgroundColor: '#e8f5e9', color: '#2e7d32', fontWeight: 600 }}>
                        {b.status || 'Confirmed'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--charcoal-700)' }}>
                      <strong>Client:</strong> {b.userName} ({b.userEmail})<br />
                      <strong>Amount:</strong> ₹{b.totalAmount?.toLocaleString('en-IN')} (Includes Security Deposit)<br />
                      <strong>Items:</strong> {b.items?.map(i => `${i.productName} (${i.mode})`).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: NEWSLETTER SUBSCRIBERS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'subscribers' && (
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: 12, border: '1px solid #ede7dc' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--maroon-900)', marginTop: 0 }}>
              Royal Circle Newsletter Patrons
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-500)', marginBottom: '1.5rem' }}>
              Subscribed emails from the website footer.
            </p>

            {subscribers.length === 0 ? (
              <p style={{ color: '#888' }}>No subscribers yet.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
                {subscribers.map(s => (
                  <div key={s.id} style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #ede7dc', backgroundColor: '#faf8f5', fontSize: '0.88rem' }}>
                    <strong>{s.email}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* EDIT / ADD PRODUCT MODAL */}
      {/* ------------------------------------------------------------- */}
      {editingProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
          <div
            className="modal-card"
            style={{ maxWidth: 650, maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={() => setEditingProduct(null)}>
              <X size={18} />
            </button>

            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--maroon-900)', margin: '0 0 1.25rem 0' }}>
              {isAddingNew ? 'Add New Jewellery Piece' : `Edit: ${editingProduct.name}`}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Short & Full Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>Display Name (Short) *</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 6, border: '1px solid #dcd3c4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>Full Name *</label>
                  <input
                    type="text"
                    value={editingProduct.fullName || editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, fullName: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 6, border: '1px solid #dcd3c4' }}
                  />
                </div>
              </div>

              {/* Category & Model */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>Category</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 6, border: '1px solid #dcd3c4', backgroundColor: '#fff' }}
                  >
                    <option value="chokers">Chokers</option>
                    <option value="haaram">Long Haram</option>
                    <option value="necklace-sets">Necklace Sets</option>
                    <option value="earrings">Earrings</option>
                    <option value="bangles">Bangles</option>
                    <option value="rings">Rings</option>
                    <option value="bridal-sets">Bridal Sets</option>
                    <option value="maang-tikka">Maang Tikka</option>
                    <option value="waist-belts">Waist Belts / Vaddanam</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>Subcategory Model</label>
                  <input
                    type="text"
                    placeholder="e.g. Temple Haaram, Royal Kundan..."
                    value={editingProduct.model || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, model: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 6, border: '1px solid #dcd3c4' }}
                  />
                </div>
              </div>

              {/* Pricing Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', backgroundColor: '#faf8f5', padding: '1rem', borderRadius: 8, border: '1px solid #ede7dc' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>Buy Price (₹) *</label>
                  <input
                    type="number"
                    value={editingProduct.buyPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, buyPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 6, border: '1px solid #dcd3c4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>Rent Price (4 Days) (₹) *</label>
                  <input
                    type="number"
                    value={editingProduct.rentPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, rentPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 6, border: '1px solid #dcd3c4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>Security Deposit (₹) *</label>
                  <input
                    type="number"
                    value={editingProduct.securityDeposit}
                    onChange={(e) => setEditingProduct({ ...editingProduct, securityDeposit: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 6, border: '1px solid #dcd3c4' }}
                  />
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>
                  Product Image URL or Path *
                </label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  placeholder="e.g. /images/choker-set.jpg or https://..."
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 6, border: '1px solid #dcd3c4' }}
                />
                
                {/* Preset Fast Picker */}
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>Quick Select Presets:</span>
                  {[
                    { label: 'Choker', path: '/images/choker-set.jpg' },
                    { label: 'Temple Haram', path: '/images/temple-haaram.jpg' },
                    { label: 'Jhumkas', path: '/images/peacock-jhumkas.jpg' },
                    { label: 'Bangles', path: '/images/bangles-set.jpg' },
                    { label: 'Rings', path: '/images/rings-collection.jpg' },
                    { label: 'Bridal Suite', path: '/images/royal-bridal-set.jpg' },
                    { label: 'Meenakari', path: '/images/meenakari-choker.jpg' }
                  ].map(preset => (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() => setEditingProduct({ ...editingProduct, image: preset.path })}
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: 4,
                        border: '1px solid #ddd',
                        background: '#fafafa',
                        cursor: 'pointer'
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finish & Stone Color */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>Finish</label>
                  <select
                    value={editingProduct.finish}
                    onChange={(e) => setEditingProduct({ ...editingProduct, finish: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 6, border: '1px solid #dcd3c4', backgroundColor: '#fff' }}
                  >
                    <option value="1-Gram Rold Gold Finish">1-Gram Rold Gold Finish</option>
                    <option value="Antique Matte Rold Gold">Antique Matte Rold Gold</option>
                    <option value="Rose Gold & Rhodium">Rose Gold & Rhodium</option>
                    <option value="Oxidized Silver">Oxidized Silver</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>Stone Color</label>
                  <select
                    value={editingProduct.stoneColor}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stoneColor: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 6, border: '1px solid #dcd3c4', backgroundColor: '#fff' }}
                  >
                    <option value="ruby">Ruby Red</option>
                    <option value="emerald">Emerald Green</option>
                    <option value="white">Pearl White</option>
                    <option value="multicolor">Multi-Color</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 6, border: '1px solid #dcd3c4', fontSize: '0.88rem' }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  style={{ padding: '0.75rem 1.25rem', borderRadius: 8, border: '1px solid #dcd3c4', background: '#fff', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleSaveProduct(editingProduct)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.5rem' }}
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
