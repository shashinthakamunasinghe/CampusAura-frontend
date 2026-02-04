import "./eventPage.css";
import { CiSearch } from "react-icons/ci";

const categories = ["All", "Technology", "Career", "Culture", "Sports"];

export default function EventFilter({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  sort,
  setSort,
}) {
  return (
    <div className="events-header-wrapper">
      {/* Blue Header */}
      <div className="events-hero">
        <h1>Events</h1>
        <p>Discover and join events happening on campus</p>
      </div>

      {/* Filters */}
      <div className="events-filters">
        {/* Search */}
        <div className="search-wrapper">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="category-list">
          <span className="text">Category</span>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="sort-wrapper">
          <label>Sort by</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="upcoming">Upcoming First</option>
            <option value="latest">Newest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>
    </div>
  );
}
