import { useState, useEffect } from 'react';
import { fetchProductSales } from '../api/api';
import { MdSearch, MdStorefront } from 'react-icons/md';
import '../Styles/EventManagement.css';

export default function ProductSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      setLoading(true);
      const data = await fetchProductSales();
      setSales(data || []);
    } catch (err) {
      console.error('Failed to load product sales:', err);
      setError('Failed to load product sales');
    } finally {
      setLoading(false);
    }
  };

  const filteredSales = sales.filter(sale =>
    (sale.userName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sale.items || []).some(item =>
      (item.productName || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const totalRevenue = sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
  const totalItems = sales.reduce((sum, s) => sum + (s.items || []).reduce((iSum, item) => iSum + (item.quantity || 0), 0), 0);

  return (
    <div className="event-management" style={{ background: '#f8fafc', padding: '2rem' }}>
      <div className="event-header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="event-page-title" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
          <MdStorefront style={{ verticalAlign: 'middle', marginRight: 8 }} />
          Product Sales
        </h1>
      </div>

      {/* Stats Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: 4 }}>Total Orders</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>{sales.length}</div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: 4 }}>Total Items Sold</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0a5db8' }}>{totalItems}</div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: 4 }}>Total Revenue</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>LKR {totalRevenue.toLocaleString()}</div>
        </div>
      </div>

      {/* Search */}
      <div className="event-search-section">
        <div className="event-search-wrapper">
          <MdSearch className="event-search-icon" />
          <input
            className="event-search-input"
            type="text"
            placeholder="Search by buyer or product name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Sales Table */}
      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Loading product sales...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: '#dc2626' }}>{error}</p>
      ) : filteredSales.length === 0 ? (
        <div style={{ background: 'white', borderRadius: 12, padding: '3rem', textAlign: 'center', color: '#64748b' }}>
          {sales.length === 0 ? 'No product sales yet.' : 'No matching sales found.'}
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Buyer</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#475569' }}>Items</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#475569' }}>Total</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#475569' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale, idx) => (
                <tr key={sale.saleId || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', color: '#475569' }}>
                    <div style={{ fontWeight: 500, color: '#0f172a' }}>{sale.userName || 'N/A'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{sale.userEmail || ''}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {(sale.items || []).map((item, i) => (
                        <div key={i} style={{ fontSize: '0.85rem' }}>
                          <span style={{ color: '#0f172a', fontWeight: 500 }}>{item.productName || 'Product'}</span>
                          <span style={{ color: '#94a3b8' }}> × {item.quantity}</span>
                          <span style={{ color: '#64748b' }}> — LKR {((item.price || 0) * (item.quantity || 0)).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 600, color: '#10b981' }}>LKR {(sale.totalAmount || 0).toLocaleString()}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#64748b', fontSize: '0.85rem' }}>{formatDate(sale.purchasedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
