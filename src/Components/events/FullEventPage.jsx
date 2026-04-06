import { useState, useEffect } from "react";
import EventFilter from "./EventFilter";
import EventsGrid from "./EventGrid";
import { fetchPublicEvents } from "../../services/api";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔍 Filter Logic
  const filteredEvents = eventsData
    .filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((event) =>
      selectedCategory === "All"
        ? true
        : event.category === selectedCategory
    )
    .sort((a, b) => {
      const parseEventDate = (dateStr) => {
        // Fix format "March 15, 2025 | 9.00 AM" -> "March 15, 2025 9:00 AM"
        return new Date(dateStr.replace(" |", "").replace(".", ":"));
      };

      if (sort === "upcoming") {
        return parseEventDate(a.date) - parseEventDate(b.date);
      } else if (sort === "newest") {
        return parseEventDate(b.date) - parseEventDate(a.date);
      } else if (sort === "popular") {
        return b.attending - a.attending;
      }
      return 0;
    });

  return (
    <>
      <EventFilter
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sort={sort}
        setSort={setSort}
      />

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading events...</p>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && filteredEvents.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No events found.</p>
        </div>
      )}

      {!loading && !error && filteredEvents.length > 0 && (
        <EventsGrid events={filteredEvents} />
      )}
    </>
  );
}
