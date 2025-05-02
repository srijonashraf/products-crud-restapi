// API communication helper functions

// Get the base URL for API calls
function getBaseUrl() {
  return window.location.origin;
}

// Generic function to handle API errors
function handleApiError(error, errorMessage) {
  console.error(errorMessage, error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    return `${errorMessage}: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`;
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received');
    return `${errorMessage}: No response from server`;
  } else {
    // Something happened in setting up the request that triggered an Error
    return `${errorMessage}: ${error.message}`;
  }
}

// Function to fetch all products
async function fetchProducts() {
  try {
    const response = await axios.get(`${getBaseUrl()}/api/v1/product`);
    
    if (response.data.status === 'success') {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: 'Failed to load products' };
    }
  } catch (error) {
    const errorMessage = handleApiError(error, 'Error loading products');
    return { success: false, message: errorMessage };
  }
}

// Function to fetch a product by ID
async function fetchProductById(id) {
  try {
    const response = await axios.get(`${getBaseUrl()}/api/v1/product/${id}`);
    
    if (response.data.status === 'success' && response.data.data.length > 0) {
      return { success: true, data: response.data.data[0] };
    } else {
      return { success: false, message: 'Failed to load product data' };
    }
  } catch (error) {
    const errorMessage = handleApiError(error, 'Error loading product');
    return { success: false, message: errorMessage };
  }
}

// Function to create a product
async function createProduct(productData) {
  try {
    const response = await axios.post(`${getBaseUrl()}/api/v1/product`, productData);
    
    if (response.data.status === 'success') {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: 'Failed to create product' };
    }
  } catch (error) {
    const errorMessage = handleApiError(error, 'Error creating product');
    return { success: false, message: errorMessage };
  }
}

// Function to update a product
async function updateProduct(id, productData) {
  try {
    const response = await axios.put(`${getBaseUrl()}/api/v1/product/${id}`, productData);
    
    if (response.data.status === 'success') {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: 'Failed to update product' };
    }
  } catch (error) {
    const errorMessage = handleApiError(error, 'Error updating product');
    return { success: false, message: errorMessage };
  }
}

// Function to delete a product
async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${getBaseUrl()}/api/v1/product/${id}`);
    
    if (response.data.status === 'success') {
      return { success: true, message: 'Product deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete product' };
    }
  } catch (error) {
    const errorMessage = handleApiError(error, 'Error deleting product');
    return { success: false, message: errorMessage };
  }
}
