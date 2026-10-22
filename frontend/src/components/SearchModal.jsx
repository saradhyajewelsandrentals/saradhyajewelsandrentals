import React, { useState, useEffect } from 'react';
import { Search, X, ShoppingBag } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      fetch(`${apiBase}/products?search=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setResults(data.data);
          }
        })
        .catch(() => {
          // If offline or network issue
          setResults([]);
        })
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: 640, padding: '2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close search">
          <X size={18} />
        </button>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.25rem', color: 'var(--charcoal-900)' }}>
          Search Exquisite Jewellery
        </h3>

        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--charcoal-400)' }}
          />
          <input
            type="text"
            placeholder="Search chokers, temple haaram, jhumkas, bridal sets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '0.85rem 1rem 0.85rem 2.75rem',
              borderRadius: 8,
              border: '1.5px solid var(--charcoal-200)',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              outline: 'none'
            }}
          />
        </div>

        {/* Quick Suggestion Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-500)', alignSelf: 'center' }}>Popular:</span>
          {['Bridal Sets', 'Chokers', 'Temple Haaram', 'Jhumkas', 'Kundan'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.75rem',
                borderRadius: 999,
                background: '#f7f4ee',
                color: 'var(--charcoal-700)',
                border: '1px solid #ede7dc'
              }}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results */}
        <div style={{ maxHeight: 320, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {loading && <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--charcoal-500)' }}>Searching collection...</p>}

          {!loading && query && results.length === 0 && (
            <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--charcoal-500)', padding: '2rem 0' }}>
              No pieces found matching "{query}". Try searching for 'choker' or 'bridal'.
            </p>
          )}

          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                onSelectProduct(product);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem',
                borderRadius: 8,
                border: '1px solid #eee8dc',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#faf8f5')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: 50, height: 50, borderRadius: 6, objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--charcoal-900)' }}>
                  {product.name}
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--maroon-800)', fontWeight: 600 }}>
                  Rent: ₹{product.rentPrice.toLocaleString('en-IN')} / 4 days • Buy: ₹{product.buyPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <ShoppingBag size={16} color="var(--maroon-800)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
