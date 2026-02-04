import React, { useState, useEffect } from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { fetchAdminProducts, approveProduct, disableProduct } from "../api/api";
import { useAuth } from "../Context/AuthContext";
import "../Styles/ProductManagement.css";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAdminProducts();
      console.log("Products loaded:", data);
      console.log("First product imageUrl:", data[0]?.imageUrl);
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pendingCount = products.filter(p => p.status === "PENDING").length;

  const handleApprove = async (id) => {
    try {
      const updatedProduct = await approveProduct(id);
      setProducts(products.map(p =>
        p.id === id ? updatedProduct : p
      ));
    } catch (err) {
      console.error("Error approving product:", err);
      alert("Failed to approve product. Please try again.");
    }
  };

  const handleDisable = async (id) => {
    try {
      const updatedProduct = await disableProduct(id);
      setProducts(products.map(p =>
        p.id === id ? updatedProduct : p
      ));
    } catch (err) {
      console.error("Error disabling product:", err);
      alert("Failed to disable product. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="product-mgmt-page">
        <div className="product-mgmt-header">
          <h1 className="product-mgmt-title">Product Management</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-mgmt-page">
        <div className="product-mgmt-header">
          <h1 className="product-mgmt-title">Product Management</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '40px', color: '#e74c3c' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="product-mgmt-page">
      <div className="product-mgmt-header">
        <h1 className="product-mgmt-title">Product Management</h1>
        <div className="product-mgmt-pending">{pendingCount} Pending Approval</div>
      </div>
      <div className="product-mgmt-list-container">
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No products found
          </div>
        ) : (
          products.map(product => {
            console.log(`Product ${product.name} imageUrl:`, product.imageUrl);
            return (
            <div className="product-mgmt-row" key={product.id}>
              <div className="product-mgmt-icon">
                {product.imageUrl && product.imageUrl.trim() !== '' ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                    onError={(e) => {
                      console.error(`Image failed to load for ${product.name}:`, product.imageUrl);
                      e.target.outerHTML = '<div style="width:60px;height:60px;display:flex;align-items:center;justify-content:center;"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="38" width="38"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></div>';
                    }}
                  />
                ) : (
                  <FiBox size={38} />
                )}
              </div>
              <div className="product-mgmt-info">
                <div className="product-mgmt-name">{product.name}</div>
                <div className="product-mgmt-owner">by {product.sellerName || 'Unknown Seller'}</div>
              </div>
              <div className="product-mgmt-price">${product.price}</div>
              <div className="product-mgmt-status-actions">
                <span className={`product-mgmt-status ${product.status.toLowerCase()}`}>
                  {product.status === 'PENDING' ? 'Pending' : 
                   product.status === 'APPROVED' ? 'Approved' : 
                   product.status === 'DELETED' ? 'Disabled' : product.status}
                </span>
                {product.status === "PENDING" && (
                  <>
                    <button className="product-mgmt-btn" onClick={() => handleApprove(product.id)}>
                      <MdCheckCircle style={{marginRight: 4}}/> Approve
                    </button>
                    <button className="product-mgmt-btn" onClick={() => handleDisable(product.id)}>
                      <MdCancel style={{marginRight: 4}}/> Disable
                    </button>
                  </>
                )}
              </div>
            </div>
          );
          })
        )}
      </div>
    </div>
  );
}