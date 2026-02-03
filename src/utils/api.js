// API utility for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * Validate email and user type before registration
 * @param {string} email - User's email address
 * @param {string} userType - 'student' or 'external'
 * @returns {Promise<Object>} Validation response
 */
export const validateRegistration = async (email, userType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, userType }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Validation failed');
    }
    
    return data;
  } catch (error) {
    console.error('Validation error:', error);
    throw error;
  }
};

/**
 * Complete student registration with backend
 * @param {string} token - Firebase ID token
 * @param {Object} userData - Student registration data
 * @returns {Promise<Object>} Registration response
 */
export const completeStudentRegistration = async (token, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/student/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Student registration failed');
    }
    
    return data;
  } catch (error) {
    console.error('Student registration error:', error);
    throw error;
  }
};

/**
 * Complete external user registration with backend
 * @param {string} token - Firebase ID token
 * @param {Object} userData - External user registration data
 * @returns {Promise<Object>} Registration response
 */
export const completeExternalUserRegistration = async (token, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/external/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'External user registration failed');
    }
    
    return data;
  } catch (error) {
    console.error('External user registration error:', error);
    throw error;
  }
};

/**
 * Get current user data from backend
 * @param {string} token - Firebase ID token
 * @returns {Promise<Object>} User data including role
 */
export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch user data');
    }
    
    return data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

/**
 * Get user session information
 * @param {string} token - Firebase ID token
 * @returns {Promise<Object>} Session information
 */
export const getSession = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/session`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch session');
    }
    
    return data;
  } catch (error) {
    console.error('Get session error:', error);
    throw error;
  }
};
