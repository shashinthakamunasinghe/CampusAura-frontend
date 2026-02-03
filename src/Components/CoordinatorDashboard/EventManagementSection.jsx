import { useState } from 'react';
import { MdCalendarToday } from 'react-icons/md';
import { HiOutlineTrash, HiPencilAlt, HiUpload } from "react-icons/hi";
import './CoordinatorDashboard.css';

function EventManagementSection() {
  const [eventData, setEventData] = useState({
    eventName: 'Tech Innovation Summit 2024',
    date: '15-06-2024',
    venue: 'Main Auditorium',
    description: 'Join us for an exciting day of technological innovation and networking with industry leaders.',
    accountName: '',
    accountNumber: '',
    accountEmail: '',
    accountPhone: '',
    accountRole: ''
  });

  const [scheduleItems, setScheduleItems] = useState([
    { id: 1, title: 'Registration & Breakfast', time: '09:00 AM', duration: '1 hour' },
    { id: 2, title: 'Opening Keynote', time: '10:00 AM', duration: '45 mins' },
    { id: 3, title: 'Panel Discussion: AI & Future', time: '11:00 AM', duration: '1 hour' },
    { id: 4, title: 'Lunch Break', time: '12:00 PM', duration: '1 hour' }
  ]);

  const [newScheduleItem, setNewScheduleItem] = useState({ title: '', time: '', duration: '' });
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const handleRemoveImage = (id) => {
    setUploadedImages(uploadedImages.filter(img => img.id !== id));
  };

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    alert('Event details saved successfully!');
    console.log('Event Data:', eventData);
  };

  const handleAddScheduleItem = () => {
    if (newScheduleItem.title && newScheduleItem.time && newScheduleItem.duration) {
      const newItem = {
        id: Math.max(...scheduleItems.map(item => item.id), 0) + 1,
        ...newScheduleItem
      };
      setScheduleItems([...scheduleItems, newItem]);
      setNewScheduleItem({ title: '', time: '', duration: '' });
      setShowAddSchedule(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteScheduleItem = (id) => {
    setScheduleItems(scheduleItems.filter(item => item.id !== id));
  };

  const handleEditScheduleItem = (id) => {
    const item = scheduleItems.find(i => i.id === id);
    setNewScheduleItem(item);
    setShowAddSchedule(true);
  };

  return (
    <div className="coordinator-content">
      <div className="event-dashboard-header">
        <h1 className="dashboard-title">Event Dashboard</h1>
        <p className="event-subtitle">{eventData.eventName}</p>
      </div>

      <div className="event-details-management">
        <h2 className="section-heading">Event Details Management</h2>
        
        {/* Basic Information Section */}
        <div className="form-section">
          <h3 className="form-section-title">Basic Information</h3>
          
          <div className="form-group full-width">
            <label className="form-label">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={eventData.eventName}
              onChange={handleEventInputChange}
              className="form-input"
              placeholder="Enter event name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleEventInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Venue</label>
              <input
                type="text"
                name="venue"
                value={eventData.venue}
                onChange={handleEventInputChange}
                className="form-input"
                placeholder="Enter venue"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleEventInputChange}
              className="form-textarea"
              placeholder="Enter event description"
              rows="4"
            ></textarea>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="form-section">
          <h3 className="form-section-title">Account Details</h3>
          
          <div className="form-group full-width">
            <label className="form-label">Account Name</label>
            <input
              type="text"
              name="accountName"
              value={eventData.accountName}
              onChange={handleEventInputChange}
              className="form-input"
              placeholder="Enter account holder name"
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={eventData.accountNumber}
              onChange={handleEventInputChange}
              className="form-input"
              placeholder="Enter account number"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="accountEmail"
                value={eventData.accountEmail}
                onChange={handleEventInputChange}
                className="form-input"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="accountPhone"
                value={eventData.accountPhone}
                onChange={handleEventInputChange}
                className="form-input"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Role</label>
            <input
              type="text"
              name="accountRole"
              value={eventData.accountRole}
              onChange={handleEventInputChange}
              className="form-input"
              placeholder="Enter role/position"
            />
          </div>
        </div>

        <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
      </div>

      {/* Event Schedule Section */}
      <div className="event-schedule-container">
        <div className="schedule-header">
          <h2 className="schedule-title">Event Schedule</h2>
          <button className="add-item-btn" onClick={() => setShowAddSchedule(!showAddSchedule)}>
            <span>+</span> Add Item
          </button>
        </div>

        {showAddSchedule && (
          <div className="add-schedule-form">
            <div className="schedule-form-row">
              <div className="schedule-form-group">
                <input
                  type="text"
                  placeholder="Schedule Title"
                  value={newScheduleItem.title}
                  onChange={(e) => setNewScheduleItem({ ...newScheduleItem, title: e.target.value })}
                  className="schedule-input"
                />
              </div>
              <div className="schedule-form-group">
                <input
                  type="time"
                  placeholder="Time"
                  value={newScheduleItem.time}
                  onChange={(e) => setNewScheduleItem({ ...newScheduleItem, time: e.target.value })}
                  className="schedule-input"
                />
              </div>
              <div className="schedule-form-group">
                <input
                  type="text"
                  placeholder="Duration (e.g., 1 hour)"
                  value={newScheduleItem.duration}
                  onChange={(e) => setNewScheduleItem({ ...newScheduleItem, duration: e.target.value })}
                  className="schedule-input"
                />
              </div>
            </div>
            <div className="schedule-form-actions">
              <button className="schedule-save-btn" onClick={handleAddScheduleItem}>Save</button>
              <button className="schedule-cancel-btn" onClick={() => setShowAddSchedule(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div className="schedule-list">
          {scheduleItems.map((item) => (
            <div key={item.id} className="schedule-item">
              <div className="schedule-item-left">
                <h3 className="schedule-item-title">{item.title}</h3>
                <p className="schedule-item-time">{item.time} • {item.duration}</p>
              </div>
              <div className="schedule-item-actions">
                <button className="schedule-edit-btn" onClick={() => handleEditScheduleItem(item.id)}>
                  <HiPencilAlt />
                </button>
                <button className="schedule-delete-btn" onClick={() => handleDeleteScheduleItem(item.id)}>
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Flyers & Posters Section */}
      <div className="event-flyers-container">
        <h2 className="flyers-title">Event Flyers & Posters</h2>
        
        <div className="flyers-grid">
          {/* Upload Box */}
          <label className="upload-box">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <HiUpload className="upload-icon" />
            <span className="upload-text">Upload Image</span>
          </label>

          {/* Display Uploaded Images */}
          {uploadedImages.map((image) => (
            <div key={image.id} className="image-preview-box">
              <img src={image.url} alt={image.name} className="preview-image" />
              <button 
                className="remove-image-btn" 
                onClick={() => handleRemoveImage(image.id)}
              >
                ×
              </button>
            </div>
          ))}

          {/* Placeholder Boxes */}
          {uploadedImages.length === 0 && (
            <>
              <div className="placeholder-box">
                <MdCalendarToday className="placeholder-icon" />
              </div>
              <div className="placeholder-box">
                <MdCalendarToday className="placeholder-icon" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventManagementSection;
