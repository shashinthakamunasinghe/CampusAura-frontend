import { useState } from "react";
import EventFilter from "./EventFilter";
import EventsGrid from "./EventGrid";

const eventsData = [
  {
    id: 1,
    title: "Tech Innovation Summit 2025",
    date: "March 15, 2025 | 9.00 AM",
    location: "Main Campus Auditorium",
    category: "Technology",
    attending: 320,
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 2,
    title: "Spring Career Fair",
    date: "March 20, 2025 | 10.00 AM",
    location: "Student Center",
    category: "Career",
    attending: 320,
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 3,
    title: "Cultural Festival Night",
    date: "March 28, 2025 | 6.00 PM",
    location: "Open Grounds",
    category: "Culture",
    attending: 320,
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 4,
    title: "Tech Innovation Summit 2025",
    date: "March 15, 2025 | 9.00 AM",
    location: "Main Campus Auditorium",
    category: "Technology",
    attending: 320,
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 5,
    title: "Spring Career Fair",
    date: "March 20, 2025 | 10.00 AM",
    location: "Student Center",
    category: "Career",
    attending: 320,
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 6,
    title: "Cultural Festival Night",
    date: "March 28, 2025 | 6.00 PM",
    location: "Open Grounds",
    category: "Culture",
    attending: 320,
    image: "https://via.placeholder.com/400x200",
  },
];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("upcoming");

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

      <EventsGrid events={filteredEvents} />
    </>
  );
}
