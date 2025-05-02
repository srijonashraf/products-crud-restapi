// Common functions for all pages

// Function to show messages
function showMessage(message, type = 'info') {
  console.log('Showing message:', message, type);
  const messageBox = document.getElementById('message-box');
  if (messageBox) {
    messageBox.textContent = message;
    messageBox.className = `alert alert-${type}`;
    messageBox.classList.remove('d-none');

    // Hide message after 5 seconds
    setTimeout(() => {
      messageBox.classList.add('d-none');
    }, 5000);
  } else {
    console.warn('Message box element not found');
  }
}

// Function to calculate total price
function calculateTotal() {
  const unitPriceInput = document.getElementById('unitPrice');
  const quantityInput = document.getElementById('quantity');
  const totalPriceInput = document.getElementById('totalPrice');

  if (unitPriceInput && quantityInput && totalPriceInput) {
    const unitPrice = parseFloat(unitPriceInput.value) || 0;
    const quantity = parseInt(quantityInput.value) || 0;
    const totalPrice = unitPrice * quantity;

    totalPriceInput.value = totalPrice.toFixed(2);
  }
}

// Add event listener to log API errors to console
window.addEventListener('error', function(event) {
  console.error('Global error:', event.error);
});

// Log page load for debugging
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded:', window.location.pathname);
  console.log('Base URL:', window.location.origin);
});
