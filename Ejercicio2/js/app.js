// Main Application Module - Handles user interface and events
import { 
    addProduct, 
    removeProductById, 
    getAllProducts, 
    getProductCount,
    clearAllProducts,
    sortProductsAlphabetically,
    addMultipleProducts
} from './shoppingManager.js';

// DOM Elements - Using const for elements that won't be reassigned
const productInput = document.getElementById('productInput');
const addBtn = document.getElementById('addBtn');
const shoppingListDiv = document.getElementById('shoppingList');
const itemCountSpan = document.getElementById('itemCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const sampleItemsBtn = document.getElementById('sampleItemsBtn');
const sortBtn = document.getElementById('sortBtn');
const errorMessage = document.getElementById('errorMessage');

// Function to show error message (arrow function)
const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.color = '#dc3545';
    
    // Clear error after 3 seconds
    setTimeout(() => {
        if (errorMessage.textContent === message) {
            errorMessage.textContent = '';
        }
    }, 3000);
};

// Function to show success message (arrow function)
const showSuccess = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.color = '#28a745';
    
    // Clear message after 2 seconds
    setTimeout(() => {
        if (errorMessage.textContent === message) {
            errorMessage.textContent = '';
        }
    }, 2000);
};

// Function to render the shopping list (arrow function)
const renderShoppingList = () => {
    const products = getAllProducts();
    const count = getProductCount();
    
    // Update item count
    itemCountSpan.textContent = `Total items: ${count}`;
    
    // Check if list is empty
    if (products.length === 0) {
        shoppingListDiv.innerHTML = '<p class="empty-message">Your shopping list is empty. Add some products! 🛍️</p>';
        return;
    }
    
    // Generate HTML for each product using map
    const productsHTML = products.map(product => {
        // Format the added date nicely
        const addedDate = new Date(product.addedAt).toLocaleDateString();
        const addedTime = new Date(product.addedAt).toLocaleTimeString();
        
        return `
            <div class="product-item" data-id="${product.id}">
                <div class="product-name">
                    <span>${escapeHtml(product.name)}</span>
                    <small style="font-size: 12px; color: #999;">(Added: ${addedDate} ${addedTime})</small>
                </div>
                <div class="product-actions">
                    <button class="delete-product" data-id="${product.id}">Remove ✖️</button>
                </div>
            </div>
        `;
    }).join('');
    
    shoppingListDiv.innerHTML = productsHTML;
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-product').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(button.dataset.id);
            try {
                removeProductById(id);
                renderShoppingList();
                showSuccess('Product removed successfully!');
            } catch (error) {
                showError(error.message);
            }
        });
    });
};

// Helper function to escape HTML (prevent XSS attacks)
const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// Function to add product from input (arrow function)
const handleAddProduct = () => {
    const productName = productInput.value;
    
    try {
        const newProduct = addProduct(productName);
        renderShoppingList();
        showSuccess(`✅ "${newProduct.name}" added to your shopping list!`);
        productInput.value = ''; // Clear input
        productInput.focus(); // Focus back on input
    } catch (error) {
        showError(error.message);
        productInput.classList.add('error');
        setTimeout(() => productInput.classList.remove('error'), 500);
    }
};

// Function to add sample items (arrow function)
const addSampleItems = () => {
    const sampleProducts = ['Milk', 'Bread', 'Eggs', 'Apples', 'Coffee'];
    
    const result = addMultipleProducts(sampleProducts);
    
    if (result.added.length > 0) {
        renderShoppingList();
        showSuccess(`Added ${result.added.length} sample products!`);
    }
    
    if (result.errors.length > 0) {
        console.log('Errors adding some products:', result.errors);
    }
};

// Function to handle sort (arrow function)
const handleSort = () => {
    sortProductsAlphabetically();
    renderShoppingList();
    showSuccess('Shopping list sorted alphabetically! 🔤');
};

// Function to handle clear all (arrow function)
const handleClearAll = () => {
    if (getProductCount() === 0) {
        showError('Shopping list is already empty!');
        return;
    }
    
    // Confirm before clearing
    const confirmClear = confirm('Are you sure you want to clear your entire shopping list?');
    
    if (confirmClear) {
        clearAllProducts();
        renderShoppingList();
        showSuccess('Shopping list cleared! 🗑️');
    }
};

// Function to handle enter key press (arrow function)
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleAddProduct();
    }
};

// Function to initialize the application (arrow function)
const init = () => {
    // Load initial state
    renderShoppingList();
    
    // Add event listeners
    addBtn.addEventListener('click', handleAddProduct);
    productInput.addEventListener('keypress', handleKeyPress);
    clearAllBtn.addEventListener('click', handleClearAll);
    sampleItemsBtn.addEventListener('click', addSampleItems);
    sortBtn.addEventListener('click', handleSort);
    
    // Focus on input field
    productInput.focus();
    
    // Add CSS class for error animation
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: #dc3545 !important;
            animation: shake 0.5s;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
};

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);