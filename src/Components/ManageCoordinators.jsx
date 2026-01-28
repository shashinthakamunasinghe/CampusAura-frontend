import { useState } from 'react';
import { MdSearch, MdPersonAdd, MdEdit, MdDelete, MdClose } from 'react-icons/md';
import '../Styles/ManageCoordinators.css';

function ManageCoordinators() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    department: '',
    degree: '',
    introduction: '',
    password: '',
    confirmPassword: ''
  });
  
  const coordinators = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@university.edu',
      events: 5,
      status: 'Active',
      avatar: 'S'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@university.edu',
      events: 3,
      status: 'Active',
      avatar: 'M'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma@university.edu',
      events: 7,
      status: 'Active',
      avatar: 'E'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james@university.edu',
      events: 2,
      status: 'Inactive',
      avatar: 'J'
    }
  ];

  const filteredCoordinators = coordinators.filter(coord =>
    coord.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coord.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setShowCreateForm(false);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      department: '',
      degree: '',
      introduction: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      department: '',
      degree: '',
      introduction: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="manage-coordinators">
      <div className="coordinators-header">
        <h1 className="page-title">Manage Coordinators</h1>
        <button className="create-coordinator-btn" onClick={() => setShowCreateForm(true)}>
          <MdPersonAdd className="btn-icon" />
          Create Coordinator
        </button>
      </div>

      {/* Create Coordinator Form Modal */}
      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create New Coordinator</h2>
              <button className="close-modal-btn" onClick={handleCancel}>
                <MdClose />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="coordinator-form">
              {/* Personal Details Section */}
              <div className="form-section">
                <h3 className="section-title">Personal Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Professional Details Section */}
              <div className="form-section">
                <h3 className="section-title">Professional Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Department *</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Business Administration">Business Administration</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Arts & Humanities">Arts & Humanities</option>
                      <option value="Science">Science</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Degree *</label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., Master's in Computer Science"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Short Introduction *</label>
                  <textarea
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Write a brief introduction about the coordinator..."
                    rows="4"
                    required
                  />
                </div>
              </div>

              {/* Security Details Section */}
              <div className="form-section">
                <h3 className="section-title">Security Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="search-section">
        <div className="search-input-wrapper">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search coordinators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="coordinators-list">
        {filteredCoordinators.map((coordinator) => (
          <div key={coordinator.id} className="coordinator-card">
            <div className="coordinator-info-section">
              <div className="coordinator-avatar-circle">
                {coordinator.avatar}
              </div>
              <div className="coordinator-text-info">
                <div className="coordinator-name-text">{coordinator.name}</div>
                <div className="coordinator-email-text">{coordinator.email}</div>
              </div>
            </div>

            <div className="coordinator-actions-section">
              <div className="coordinator-events-badge">
                {coordinator.events} events
              </div>
              <span className={`coordinator-status-badge ${coordinator.status.toLowerCase()}`}>
                {coordinator.status}
              </span>
              <button className="action-btn edit-btn">
                <MdEdit />
              </button>
              <button className="action-btn delete-btn">
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageCoordinators;
