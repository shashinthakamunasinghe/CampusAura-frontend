import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "../../Styles/MarketplaceFull.css";

// Demo product data (expand as needed)
const demoProducts = [
  {
    id: 1,
    name: "Textbook: Advanced Calculus",
    price: 45,
    category: "Books",
    condition: "Like New",
    images: ["/images/market1.jpg"],
    description: "Advanced Calculus textbook, barely used.",
    seller: { name: "Sarah M.", rating: 4.8, reviews: 12 },
    badge: "Books"
  },
  {
    id: 2,
    name: "Desk Lamp - LED",
    price: 28,
    category: "Dorm",
    condition: "New",
    images: ["/images/market2.jpg"],
    description: "Bright LED desk lamp, perfect for late-night study.",
    seller: { name: "Alex K.", rating: 4.9, reviews: 24 },
    badge: "Dorm"
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 35,
    category: "Tech",
    condition: "Like New",
    images: ["/src/assets/Slant-4.webp"],
    description: "Ergonomic laptop stand, adjustable height.",
    seller: { name: "Jordan T.", rating: 4.7, reviews: 18 },
    badge: "Tech"
  },
  {
    id: 4,
    name: "Backpack - Travel Size",
    price: 52,
    category: "Accessories",
    condition: "New",
    images: ["/images/market4.jpg"],
    description: "Travel-size backpack, fits all essentials.",
    seller: { name: "Casey R.", rating: 4.6, reviews: 15 },
    badge: "Accessories"
  },
];

const categories = ["All", "Books", "Dorm", "Tech", "Accessories"];
const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
];


export default function MarketplaceFull() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("relevance");
  const [modalProduct, setModalProduct] = useState(null);

  // Filter and sort logic
  let filtered = demoProducts.filter((p) => {
    const inCategory = selectedCategory === "All" || p.category === selectedCategory;
    const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const inSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return inCategory && inPrice && inSearch;
  });
  if (sortBy === "priceLow") filtered = filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "priceHigh") filtered = filtered.sort((a, b) => b.price - a.price);

  return (
    <section className="marketplacefull-section">
      {/* Hero Banner */}
      <div className="marketplacefull-hero">
        <h1>Campus Marketplace</h1>
        <div className="marketplacefull-hero-desc">Buy and sell with verified students. New and used items from textbooks to dorm essentials.</div>
      </div>


      {/* Filter Section: Search, Categories, Price, Sort (stacked, like event page) */}
      <div className="marketplacefull-filters-stacked">
        {/* Search Bar */}
        <div className="search-wrapper">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="category-list">
          <span className="text">Category</span>
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn${selectedCategory === cat ? " active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >{cat}</button>
          ))}
        </div>

        {/* Price Range & Sort (aligned in one row) */}
        <div className="marketplacefull-bottom-row">
          <div className="marketplacefull-price-sort-group">
            <span className="marketplacefull-label">Price:</span>
            <input
              type="number"
              min={0}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
              className="marketplacefull-input"
            />
            <span className="marketplacefull-label" style={{margin: '0 4px'}}>-</span>
            <input
              type="number"
              min={priceRange[0]}
              max={1000}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], +e.target.value])}
              className="marketplacefull-input"
            />
          </div>
          <div className="marketplacefull-price-sort-group">
            <label className="marketplacefull-label" htmlFor="marketplacefull-sort">Sort by</label>
            <select
              id="marketplacefull-sort"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="marketplacefull-input"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="marketplacefull-grid">
        {filtered.map((item) => (
          <div className="marketplacefull-card" key={item.id}>
            {/* Badge */}
            <div className="marketplacefull-badges-single">
              <span className="marketplacefull-badge-single">{item.badge}</span>
            </div>
            <img src={item.images[0]} alt={item.name} className="marketplacefull-card-img" />
            <div className="marketplacefull-content">
              <h3 className="marketplacefull-title">{item.name}</h3>
              <div className="marketplacefull-stars-row">
                <span className="marketplacefull-star">★</span>
                <span className="marketplacefull-rating-num">4.0</span>
                <span className="marketplacefull-rating-gray">({item.seller.rating})</span>
              </div>
              <div className="marketplacefull-seller">by {item.seller.name}</div>
              <div className="marketplacefull-card-bottom">
                <span className="marketplacefull-price">${item.price}</span>
                <button className="marketplacefull-view-btn" onClick={() => setModalProduct(item)}>View</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {modalProduct && (
        <div className="marketplacefull-modal-bg" onClick={() => setModalProduct(null)}>
          <div className="marketplacefull-modal" onClick={e => e.stopPropagation()}>
            <button className="marketplacefull-modal-close" onClick={() => setModalProduct(null)}>&times;</button>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Image carousel (simple) */}
              <img className="marketplacefull-modal-img" src={modalProduct.images[0]} alt={modalProduct.name} />
              <div className="marketplacefull-modal-title">{modalProduct.name}</div>
              <p className="marketplacefull-modal-price">${modalProduct.price}</p>
              <p className="marketplacefull-modal-desc">{modalProduct.description}</p>
              <div className="marketplacefull-modal-seller">
                Seller: {modalProduct.seller.name} <span style={{color:'#1db89a'}}>★ {modalProduct.seller.rating}</span>
              </div>
              <button className="marketplacefull-modal-addcart">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
