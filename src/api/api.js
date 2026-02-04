// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// API Endpoints
export const API_ENDPOINTS = {
  // Public Event Endpoints (no authentication required)
  LANDING_PAGE_CAROUSEL: `${API_BASE_URL}/api/events/landing-page`,
  LATEST_EVENTS: `${API_BASE_URL}/api/events/latest`,
  PUBLIC_EVENTS: `${API_BASE_URL}/api/events/public`,
  EVENT_BY_ID: (eventId) => `${API_BASE_URL}/api/events/public/${eventId}`,
};

/**
 * Fetch random ongoing events for landing page carousel
 * @returns {Promise<Array>} Array of up to 5 random ongoing event objects
 */
export const fetchCarouselEvents = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.LANDING_PAGE_CAROUSEL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching carousel events:', error);
    throw error;
  }
};

/**
 * Fetch latest 3 published events for the landing page
 * @returns {Promise<Array>} Array of event objects (max 3)
 */
export const fetchLatestEvents = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.LATEST_EVENTS);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Latest events from API:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error fetching latest events:', error);
    throw error;
  }
};

/**
 * Fetch all public events with optional filtering and sorting
 * @param {string} category - Filter by category (All, Technology, Career, Culture, Sports). Default: All
 * @param {string} sortBy - Sort order (upcoming, latest, popular). Default: upcoming
 * @returns {Promise<Array>} Array of event objects
 */
export const fetchPublicEvents = async (category = 'All', sortBy = 'upcoming') => {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (sortBy) params.append('sortBy', sortBy);
    
    const response = await fetch(`${API_ENDPOINTS.PUBLIC_EVENTS}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Public events from API:', data);
    console.log('First event images:', data[0]?.eventImageUrls);
    return data;
  } catch (error) {
    console.error('Error fetching public events:', error);
    throw error;
  }
};

/**
 * Fetch a single event by ID
 * @param {string} eventId - The unique identifier of the event
 * @returns {Promise<Object>} Event object
 */
export const fetchEventById = async (eventId) => {
  try {
    const response = await fetch(API_ENDPOINTS.EVENT_BY_ID(eventId));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching event ${eventId}:`, error);
    throw error;
  }
};

// ==================== ADMIN COORDINATOR MANAGEMENT ====================

/**
 * Fetch all coordinators
 * @param {string} token - Firebase auth token
 * @returns {Promise<Array>} Array of coordinator objects
 */
export const fetchAllCoordinators = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/coordinators`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching coordinators:', error);
    throw error;
  }
};

/**
 * Update coordinator details
 * @param {string} id - Coordinator ID
 * @param {Object} coordinatorData - Updated coordinator details
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} Updated coordinator object
 */
export const updateCoordinator = async (id, coordinatorData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/coordinators/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(coordinatorData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating coordinator:', error);
    throw error;
  }
};

/**
 * Format date to readable format
 * @param {string} isoDate - ISO 8601 date string
 * @returns {string} Formatted date string
 */
export const formatEventDate = (isoDate) => {
  if (!isoDate) return 'Date TBA';
  
  const date = new Date(isoDate);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return date.toLocaleDateString('en-US', options);
};

/**
 * Format date to short format for carousel
 * @param {string} isoDate - ISO 8601 date string
 * @returns {string} Short formatted date string
 */
export const formatCarouselDate = (isoDate) => {
  if (!isoDate) return 'Date TBA';
  
  const date = new Date(isoDate);
  const options = { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
};

/**
 * Get the primary image URL from event
 * @param {Object} event - Event object
 * @returns {string} Image URL or placeholder
 */
export const getEventImageUrl = (event) => {
  if (event.eventImageUrls && event.eventImageUrls.length > 0) {
    return event.eventImageUrls[0];
  }
  // Return a placeholder image if no image is available
  return 'https://picsum.photos/1400/700?grayscale';
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// =====================================================
// ADMIN API FUNCTIONS
// =====================================================

const ADMIN_BASE_URL = `${API_BASE_URL}/api/admin`;

/**
 * Get Firebase auth token for admin requests
 * @returns {Promise<string>} Firebase ID token
 */
const getAuthToken = async () => {
  // Import firebase auth instance from config
  const { auth } = await import('../firebase/firebaseConfig');
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  return await user.getIdToken();
};

/**
 * Make authenticated admin API request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
const adminRequest = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${ADMIN_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Admin API request error:', error);
    throw error;
  }
};

// =====================================================
// Dashboard Statistics
// =====================================================

/**
 * Get dashboard statistics
 * @returns {Promise<Object>} Dashboard stats object
 */
export const fetchDashboardStats = async () => {
  return await adminRequest('/dashboard/stats');
};

// =====================================================
// Coordinator Management
// =====================================================

/**
 * Get all coordinators with event counts
 * @returns {Promise<Array>} Array of coordinator objects
 */
export const fetchCoordinators = async () => {
  return await adminRequest('/coordinators');
};

/**
 * Get coordinator by ID
 * @param {string} id - Coordinator ID
 * @returns {Promise<Object>} Coordinator object
 */
export const fetchCoordinatorById = async (id) => {
  return await adminRequest(`/coordinators/${id}`);
};

/**
 * Create new coordinator
 * @param {Object} coordinatorData - Coordinator data
 * @returns {Promise<Object>} Created coordinator object
 */
export const createCoordinator = async (coordinatorData) => {
  return await adminRequest('/coordinators', {
    method: 'POST',
    body: JSON.stringify(coordinatorData),
  });
};

/**
 * Update coordinator status (active/inactive)
 * @param {string} id - Coordinator ID
 * @param {boolean} active - Active status
 * @returns {Promise<Object>} Updated coordinator
 */
export const updateCoordinatorStatus = async (id, active) => {
  return await adminRequest(`/coordinators/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ active }),
  });
};

/**
 * Delete coordinator
 * @param {string} id - Coordinator ID
 * @returns {Promise<void>}
 */
export const deleteCoordinator = async (id) => {
  return await adminRequest(`/coordinators/${id}`, {
    method: 'DELETE',
  });
};

/**
 * Get departments dropdown list
 * @returns {Promise<Array>} Array of department strings
 */
export const fetchDepartments = async () => {
  return await adminRequest('/coordinators/departments');
};

/**
 * Get degree programmes dropdown list
 * @returns {Promise<Array>} Array of degree programme strings
 */
export const fetchDegreeProgrammes = async () => {
  return await adminRequest('/coordinators/degree-programmes');
};

// =====================================================
// Event Management
// =====================================================

/**
 * Get all events (admin view)
 * @returns {Promise<Array>} Array of event objects
 */
export const fetchAdminEvents = async () => {
  return await adminRequest('/events');
};

/**
 * Get event by ID (admin view)
 * @param {string} id - Event ID
 * @returns {Promise<Object>} Event object
 */
export const fetchAdminEventById = async (id) => {
  return await adminRequest(`/events/${id}`);
};

/**
 * Filter events by category
 * @param {string} category - Event category
 * @returns {Promise<Array>} Array of filtered events
 */
export const filterEventsByCategory = async (category) => {
  return await adminRequest(`/events/filter?category=${category}`);
};

/**
 * Approve pending event
 * @param {string} id - Event ID
 * @returns {Promise<Object>} Approved event
 */
export const approveEvent = async (id) => {
  return await adminRequest(`/events/${id}/approve`, {
    method: 'POST',
  });
};

/**
 * Reject pending event
 * @param {string} id - Event ID
 * @returns {Promise<Object>} Rejected event
 */
export const rejectEvent = async (id) => {
  return await adminRequest(`/events/${id}/reject`, {
    method: 'POST',
  });
};

/**
 * Get count of pending events
 * @returns {Promise<Object>} Object with count property
 */
export const fetchPendingEventsCount = async () => {
  return await adminRequest('/events/pending/count');
};

/**
 * Delete event
 * @param {string} id - Event ID
 * @returns {Promise<void>}
 */
export const deleteEvent = async (id) => {
  return await adminRequest(`/events/${id}`, {
    method: 'DELETE',
  });
};

// =====================================================
// User Management
// =====================================================

/**
 * Get all users
 * @returns {Promise<Array>} Array of user objects
 */
export const fetchUsers = async () => {
  return await adminRequest('/users');
};

/**
 * Get university students only
 * @returns {Promise<Array>} Array of university student objects
 */
export const fetchUniversityStudents = async () => {
  return await adminRequest('/users/university-students');
};

/**
 * Get external users only
 * @returns {Promise<Array>} Array of external user objects
 */
export const fetchExternalUsers = async () => {
  return await adminRequest('/users/external-users');
};

/**
 * Get users pending ID verification
 * @returns {Promise<Array>} Array of users pending verification
 */
export const fetchPendingVerificationUsers = async () => {
  return await adminRequest('/users/pending-verification');
};

/**
 * Get user statistics
 * @returns {Promise<Object>} User stats object
 */
export const fetchUserStats = async () => {
  return await adminRequest('/users/stats');
};

/**
 * Update user status (active/inactive)
 * @param {string} id - User ID
 * @param {boolean} active - Active status
 * @returns {Promise<Object>} Updated user
 */
export const updateUserStatus = async (id, active) => {
  return await adminRequest(`/users/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ active }),
  });
};

/**
 * Verify student ID (approve/reject)
 * @param {string} id - User ID
 * @param {string} status - VERIFIED or REJECTED
 * @returns {Promise<Object>} Updated user
 */
export const verifyStudentId = async (id, status) => {
  return await adminRequest(`/users/${id}/verify`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
};

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {Promise<void>}
 */
export const deleteUser = async (id) => {
  return await adminRequest(`/users/${id}`, {
    method: 'DELETE',
  });
};

// =====================================================
// Product Management
// =====================================================

/**
 * Get all products (admin view)
 * @returns {Promise<Array>} Array of product objects
 */
export const fetchAdminProducts = async () => {
  return await adminRequest('/products');
};

/**
 * Get product by ID (admin view)
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const fetchAdminProductById = async (id) => {
  return await adminRequest(`/products/${id}`);
};

/**
 * Approve pending product
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Approved product
 */
export const approveProduct = async (id) => {
  return await adminRequest(`/products/${id}/approve`, {
    method: 'POST',
  });
};

/**
 * Disable/delete product
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Disabled product
 */
export const disableProduct = async (id) => {
  return await adminRequest(`/products/${id}/disable`, {
    method: 'POST',
  });
};

/**
 * Get count of pending products
 * @returns {Promise<Object>} Object with count property
 */
export const fetchPendingProductsCount = async () => {
  return await adminRequest('/products/pending/count');
};

/**
 * Delete product
 * @param {string} id - Product ID
 * @returns {Promise<void>}
 */
export const deleteProduct = async (id) => {
  return await adminRequest(`/products/${id}`, {
    method: 'DELETE',
  });
};

// =====================================================
// Payment/Transaction Management
// =====================================================

/**
 * Get payment statistics
 * @returns {Promise<Object>} Payment stats object
 */
export const fetchPaymentStats = async () => {
  return await adminRequest('/payments/stats');
};

/**
 * Get all transactions
 * @returns {Promise<Array>} Array of transaction objects
 */
export const fetchTransactions = async () => {
  return await adminRequest('/payments/transactions');
};

/**
 * Get recent transactions
 * @param {number} limit - Number of transactions to fetch (default: 10)
 * @returns {Promise<Array>} Array of recent transaction objects
 */
export const fetchRecentTransactions = async (limit = 10) => {
  return await adminRequest(`/payments/transactions/recent?limit=${limit}`);
};

// ==================== COORDINATOR EVENT MANAGEMENT ====================

/**
 * Create a new event
 * @param {Object} eventData - Event data to create
 * @param {string} token - Firebase auth token
 * @returns {Promise<Object>} Created event object
 */
export const createEvent = async (eventData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
