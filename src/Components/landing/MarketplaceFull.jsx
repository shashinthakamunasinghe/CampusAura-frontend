import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { fetchMarketplaceProducts } from "../../services/api";
import "./MarketplaceFull.css";

const categories = ["All", "Books", "Dorm", "Tech", "Accessories"];

export default function MarketplaceFull() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [modalProduct, setModalProduct] = useState(null);
  const navigate = useNavigate();

  // Fetch products from database on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchMarketplaceProducts();
        
        // Transform database products to match component's expected format
        const transformedProducts = fetchedProducts.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category || "Accessories", // Default category if not provided
          condition: "Good", // Database doesn't have condition field, use default
          images: product.imageUrl ? [product.imageUrl] : ["https://via.placeholder.com/400?text=No+Image"], // Convert single imageUrl to array
          description: product.description || "No description available",
          seller: {
            name: product.sellerName || "Unknown Seller",
            rating: 4.5, // Database doesn't have rating, use default
            reviews: 0 // Database doesn't have review count, use default
          },
          badge: product.category || "Accessories"
        }));
        
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Failed to load marketplace products:", error);
        setProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addToCart = (product) => {
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const existingItem = cart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        seller: product.seller.name,
        quantity: 1
      }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setModalProduct(null);
    navigate('/cart');
  };

  let filtered = products.filter((p) => {
    const inCategory = selectedCategory === "All" || p.category === selectedCategory;
    const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const inSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase());
    return inCategory && inPrice && inSearch;
  });

  return (
    <section className="marketplacefull-section">
      <div className="marketplacefull-hero">
        <h1>Campus Marketplace</h1>
        <div className="marketplacefull-hero-desc">Buy and sell with verified students. New and used items from textbooks to dorm essentials.</div>
      </div>

      <div className="marketplacefull-filters-stacked">
        <div className="search-wrapper">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-list">
          <span className="text">Category</span>
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn${selectedCategory === cat ? " active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="marketplacefull-bottom-row">
          <div className="marketplacefull-price-sort-group">
            <span className="marketplacefull-label">Price:</span>
            <input
              type="number"
              min={0}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="marketplacefull-input"
            />
            <span className="marketplacefull-label" style={{margin: '0 4px'}}>-</span>
            <input
              type="number"
              min={priceRange[0]}
              max={20000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="marketplacefull-input"
            />
          </div>
        </div>
      </div>

      <div className="marketplacefull-grid">
        {loading ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#666" }}>
            <p>Loading products...</p>
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((item) => (
            <div className="marketplacefull-card" key={item.id}>
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
                  <span className="marketplacefull-price">LKR {item.price.toLocaleString()}</span>
                  <button className="marketplacefull-view-btn" onClick={() => setModalProduct(item)}>View</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#666" }}>
            <p>No products found matching your filters.</p>
          </div>
        )}
      </div>

      {modalProduct && (
        <div className="marketplacefull-modal-bg" onClick={() => setModalProduct(null)}>
          <div className="marketplacefull-modal" onClick={(e) => e.stopPropagation()}>
            <button className="marketplacefull-modal-close" onClick={() => setModalProduct(null)}>&times;</button>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img className="marketplacefull-modal-img" src={modalProduct.images[0]} alt={modalProduct.name} />
              <div className="marketplacefull-modal-title">{modalProduct.name}</div>
              <p className="marketplacefull-modal-price">LKR {modalProduct.price.toLocaleString()}</p>
              <p className="marketplacefull-modal-desc">{modalProduct.description}</p>
              <div className="marketplacefull-modal-seller">
                Seller: {modalProduct.seller.name} <span style={{color:'#1db89a'}}>★ {modalProduct.seller.rating}</span>
              </div>
              <button 
                className="marketplacefull-modal-addcart"
                onClick={() => addToCart(modalProduct)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
