import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Marketplace.css";

export default function Marketplace() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "College Hoodie",
      price: "LKR 3,500",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    },
    {
      id: 2,
      name: "Textbooks Bundle",
      price: "LKR 8,500",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    },
    {
      id: 3,
      name: "Scientific Calculator",
      price: "LKR 2,800",
      image: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=400",
    },
    {
      id: 4,
      name: "Laptop Backpack",
      price: "LKR 4,500",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    },
    {
      id: 5,
      name: "Wireless Headphones",
      price: "LKR 5,200",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    },
    {
      id: 6,
      name: "Study Desk Lamp",
      price: "LKR 2,100",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    },
    {
      id: 7,
      name: "Notebook Set (5 Pack)",
      price: "LKR 1,250",
      image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400",
    },
    {
      id: 8,
      name: "USB Flash Drive 64GB",
      price: "LKR 1,800",
      image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400",
    },
  ];

  return (
    <section className="marketplace-section">
      
      <div className="marketplace-header">
        <h2 className="marketplace-title">CampusAura Marketplace</h2>
      </div>

      <div className="marketplace-container">
        {products.map((item) => (
          <div className="market-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="market-content">
              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="view-all-btn-row">
        <button
          className="view-all-btn"
          onClick={() => navigate("/marketplace")}
        >
          View All Items
        </button>
      </div>
    </section>
  );
}
