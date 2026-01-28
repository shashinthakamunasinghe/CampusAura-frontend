import React, { useState } from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import "../Styles/ProductManagement.css";

const initialProducts = [
  {
    id: 1,
    name: "University Hoodie - Navy",
    owner: "Campus Store",
    price: 45,
    status: "Approved"
  },
  {
    id: 2,
    name: "Calculus Textbook (Used)",
    owner: "John Doe",
    price: 30,
    status: "Pending"
  },
  {
    id: 3,
    name: "Lab Equipment Kit",
    owner: "Science Department",
    price: 120,
    status: "Approved"
  },
  {
    id: 4,
    name: "Event T-Shirt Design",
    owner: "Art Club",
    price: 20,
    status: "Pending"
  }
];

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);

  const pendingCount = products.filter(p => p.status === "Pending").length;

  const handleApprove = id => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, status: "Approved" } : p
    ));
  };

  const handleDisable = id => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, status: "Disabled" } : p
    ));
  };

  return (
    <div className="product-mgmt-page">
      <div className="product-mgmt-header">
        <h1 className="product-mgmt-title">Product Management</h1>
        <div className="product-mgmt-pending">{pendingCount} Pending Approval</div>
      </div>
      <div className="product-mgmt-list-container">
        {products.map(product => (
          <div className="product-mgmt-row" key={product.id}>
            <div className="product-mgmt-icon">
              <FiBox size={38} />
            </div>
            <div className="product-mgmt-info">
              <div className="product-mgmt-name">{product.name}</div>
              <div className="product-mgmt-owner">by {product.owner}</div>
            </div>
            <div className="product-mgmt-price">${product.price}</div>
            <div className="product-mgmt-status-actions">
              <span className={`product-mgmt-status ${product.status.toLowerCase()}`}>
                {product.status}
              </span>
              {product.status === "Pending" && (
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
        ))}
      </div>
    </div>
  );
}
