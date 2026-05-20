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

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchPublicEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // 🔍 Filter Logic
  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((event) =>
      selectedCategory === "All"
        ? true
        : (event.category || '').toLowerCase() === selectedCategory.toLowerCase()
    )
    .sort((a, b) => {
      const parseEventDate = (event) => {
        if (!event || !event.dateTime) return new Date(0); // Return epoch for invalid dates
        return new Date(event.dateTime); // ISO 8601 format
      };

      if (sort === "upcoming") {
        return parseEventDate(a) - parseEventDate(b);
      } else if (sort === "newest") {
        return parseEventDate(b) - parseEventDate(a);
      } else if (sort === "popular") {
        return (b.attendeeCount || 0) - (a.attendeeCount || 0);
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
