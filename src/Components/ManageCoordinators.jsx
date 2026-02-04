import { useState, useEffect } from 'react';
import { MdSearch, MdPersonAdd, MdEdit, MdDelete, MdClose } from 'react-icons/md';
import { auth } from '../firebase/firebaseConfig';
import { 
  fetchAllCoordinators, 
  createCoordinator, 
  updateCoordinator,
  updateCoordinatorStatus,
  deleteCoordinator, 
  fetchDepartments 
} from '../api/api';
import '../Styles/ManageCoordinators.css';

function ManageCoordinators() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCoordinator, setEditingCoordinator] = useState(null);
  const [coordinators, setCoordinators] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    department: '',
    degree: '',
    shortIntroduction: '',
    password: ''
  });

  // Department options
  const departmentOptions = [
    'Department of Export Agriculture',
    'Department of Applied Earth Sciences',
    'Department of Computer Science & Informatics',
    'Department of Science & Technology',
    'Department of Management Sciences',
    'Department of Public Administration',
    'Department of Tourism Studies',
    'Department of English Language Teaching',
    'Department of Engineering Technology',
    'Department of Biosystems Technology',
    'Department of Information and Communication Technology',
    'Faculty of Medicine'
  ];

  // Degree options
  const degreeOptions = [
    'Animal Production and Food Technology',
    'Export Agriculture',
    'Tea Technology and Value Addition',
    'Aquatic Resources Technology',
    'Palm & Latex Technology and Value Addition',
    'Science and Technology',
    'Industrial Information Technology',
    'Computer Science and Technology',
    'Mineral Resources and Technology',
    'Entrepreneurship and Management',
    'Hospitality, Tourism and Events Management',
    'Human Resource Development',
    'Engineering Technology',
    'Biosystems Technology',
    'Information and Communication Technology'
  ];

  // Fetch coordinators on component mount
  useEffect(() => {
    loadCoordinators();
    loadDepartments();
  }, []);

  const loadCoordinators = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setError('Please login to access this page');
        return;
      }
      const token = await user.getIdToken();
      const data = await fetchAllCoordinators(token);
      setCoordinators(data);
      setError(null);
    } catch (err) {
      setError('Failed to load coordinators: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      const data = await fetchDepartments(token);
      setDepartments(data);
    } catch (err) {
      console.error('Failed to load departments:', err);
    }
  };

  const filteredCoordinators = coordinators.filter(coord => {
    const fullName = `${coord.firstName} ${coord.lastName}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || coord.email.toLowerCase().includes(search);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || 
        !formData.email || !formData.department || !formData.degree || 
        !formData.shortIntroduction) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate password for new coordinators
    if (!editingCoordinator) {
      if (!formData.password) {
        alert('Password is required for new coordinators');
        return;
      }
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }
    }
    
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('Please login to perform this action');
        return;
      }
      const token = await user.getIdToken();

      const coordinatorData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        department: formData.department,
        degree: formData.degree,
        shortIntroduction: formData.shortIntroduction.trim()
      };

      // Add password for new coordinators
      if (!editingCoordinator) {
        coordinatorData.password = formData.password;
      }

      if (editingCoordinator) {
        // Update existing coordinator
        await updateCoordinator(editingCoordinator.id, coordinatorData, token);
        alert('Coordinator updated successfully!');
      } else {
        // Create new coordinator
        await createCoordinator(coordinatorData);
        alert('Coordinator created successfully!');
      }

      // Reload coordinators and reset form
      await loadCoordinators();
      handleCancel();
    } catch (err) {
      alert('Error: ' + err.message);
      console.error(err);
    }
  };

  const handleEdit = (coordinator) => {
    setEditingCoordinator(coordinator);
    setFormData({
      firstName: coordinator.firstName,
      lastName: coordinator.lastName,
      phoneNumber: coordinator.phoneNumber,
      email: coordinator.email,
      department: coordinator.department || '',
      degree: coordinator.degree || '',
      shortIntroduction: coordinator.shortIntroduction || ''
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (coordinatorId) => {
    if (!window.confirm('Are you sure you want to delete this coordinator?')) {
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        alert('Please login to perform this action');
        return;
      }
      const token = await user.getIdToken();
      await deleteCoordinator(coordinatorId, token);
      alert('Coordinator deleted successfully!');
      await loadCoordinators();
    } catch (err) {
      alert('Error deleting coordinator: ' + err.message);
      console.error(err);
    }
  };

  const handleToggleStatus = async (coordinator) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('Please login to perform this action');
        return;
      }
      const token = await user.getIdToken();
      const newStatus = !coordinator.active;
      await updateCoordinatorStatus(coordinator.id, newStatus, token);
      await loadCoordinators();
    } catch (err) {
      alert('Error updating coordinator status: ' + err.message);
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingCoordinator(null);
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      department: '',
      degree: '',
      shortIntroduction: '',
      password: ''
    });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
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

      {/* Error Message */}
      {error && (
        <div style={{ 
          padding: '15px', 
          background: '#fee', 
          color: '#c33', 
          borderRadius: '8px', 
          marginBottom: '20px' 
        }}>
          {error}
        </div>
      )}

      {/* Create/Edit Coordinator Form Modal */}
      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingCoordinator ? 'Edit Coordinator' : 'Create New Coordinator'}
              </h2>
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
                      disabled={editingCoordinator !== null}
                    />
                  </div>
                </div>

                {/* Password field - only show for new coordinators */}
                {!editingCoordinator && (
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Password *</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter password (min 6 characters)"
                        required
                        minLength="6"
                      />
                      <small style={{ color: '#666', fontSize: '0.85em', marginTop: '4px', display: 'block' }}>
                        This password will be used for the coordinator's account
                      </small>
                    </div>
                  </div>
                )}
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
                      {departmentOptions.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Degree *</label>
                    <select
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select degree</option>
                      {degreeOptions.map((degree) => (
                        <option key={degree} value={degree}>{degree}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Short Introduction *</label>
                  <textarea
                    name="shortIntroduction"
                    value={formData.shortIntroduction}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Write a brief introduction about the coordinator..."
                    rows="4"
                    required
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingCoordinator ? 'Update Coordinator' : 'Create Coordinator'}
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

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>
          Loading coordinators...
        </div>
      ) : (
        <div className="coordinators-list">
          {filteredCoordinators.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '16px', color: '#999' }}>
              No coordinators found
            </div>
          ) : (
            filteredCoordinators.map((coordinator) => (
              <div key={coordinator.id} className="coordinator-card">
                <div className="coordinator-info-section">
                  <div className="coordinator-avatar-circle">
                    {getInitials(coordinator.firstName, coordinator.lastName)}
                  </div>
                  <div className="coordinator-text-info">
                    <div className="coordinator-name-text">
                      {coordinator.firstName} {coordinator.lastName}
                    </div>
                    <div className="coordinator-email-text">{coordinator.email}</div>
                    {coordinator.department && (
                      <div className="coordinator-department-text">
                        {coordinator.department}
                      </div>
                    )}
                  </div>
                </div>

                <div className="coordinator-actions-section">
                  <div className="coordinator-events-badge">
                    {coordinator.eventCount || 0} events
                  </div>
                  <button
                    className={`coordinator-status-badge ${coordinator.active ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleStatus(coordinator)}
                    style={{ cursor: 'pointer', border: 'none' }}
                  >
                    {coordinator.active ? 'Active' : 'Inactive'}
                  </button>
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(coordinator)}
                    title="Edit coordinator"
                  >
                    <MdEdit />
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(coordinator.id)}
                    title="Delete coordinator"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ManageCoordinators;
