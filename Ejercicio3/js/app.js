// Main Application Module - Handles UI and user interaction
import { 
    products, 
    getProductsUnder100, 
    sortProductsAlphabetically,
    getProductNames,
    demonstrateAllMethods
} from './products.js';

// DOM Elements
const productsListDiv = document.getElementById('productsList');
const resultsCountSpan = document.getElementById('resultsCount');
const statsDiv = document.getElementById('stats');
const categoryFilterSelect = document.getElementById('categoryFilter');

// State
let currentFilter = 'all'; // all, under50, under100, over100
let currentSort = 'name'; // name, price-low, price-high, category
let currentCategory = 'all';

// Function to display statistics using reduce()
const displayStatistics = () => {
    // Using reduce to calculate total value
    const totalValue = products.reduce((sum, product) => sum + product.price, 0);
    
    // Using reduce to get category count
    const categoryCount = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});
    
    // Using filter to get counts by price range
    const under50 = products.filter(p => p.price < 50).length;
    const under100 = products.filter(p => p.price < 100).length;
    const over100 = products.filter(p => p.price >= 100).length;
    
    // Using reduce to get average price
    const averagePrice = totalValue / products.length;
    
    // Using some to check if all products are in stock
    const allInStock = products.every(p => p.inStock === true);
    
    const statsHTML = `
        <div class="stat-card">
            <h3>Total Products</h3>
            <div class="stat-value">${products.length}</div>
        </div>
        <div class="stat-card">
            <h3>Total Value</h3>
            <div class="stat-value">$${totalValue.toFixed(2)}</div>
        </div>
        <div class="stat-card">
            <h3>Average Price</h3>
            <div class="stat-value">$${averagePrice.toFixed(2)}</div>
        </div>
        <div class="stat-card">
            <h3>Categories</h3>
            <div class="stat-value">${Object.keys(categoryCount).length}</div>
        </div>
        <div class="stat-card">
            <h3>Under $50</h3>
            <div class="stat-value">${under50}</div>
        </div>
        <div class="stat-card">
            <h3>Under $100</h3>
            <div class="stat-value">${under100}</div>
        </div>
        <div class="stat-card">
            <h3>$100 & Above</h3>
            <div class="stat-value">${over100}</div>
        </div>
        <div class="stat-card">
            <h3>All In Stock?</h3>
            <div class="stat-value">${allInStock ? '✅ Yes' : '❌ No'}</div>
        </div>
    `;
    
    statsDiv.innerHTML = statsHTML;
};

// Function to populate category filter
const populateCategoryFilter = () => {
    // Using map and Set to get unique categories
    const categories = [...new Set(products.map(p => p.category))];
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilterSelect.appendChild(option);
    });
};

// Function to filter products based on current filters
const filterProducts = () => {
    let filtered = [...products];
    
    // Apply price filter
    if (currentFilter === 'under50') {
        filtered = filtered.filter(p => p.price < 50);
    } else if (currentFilter === 'under100') {
        filtered = filtered.filter(p => p.price < 100);
    } else if (currentFilter === 'over100') {
        filtered = filtered.filter(p => p.price >= 100);
    }
    
    // Apply category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    return filtered;
};

// Function to sort products
const sortProducts = (productsArray) => {
    const sorted = [...productsArray];
    
    if (currentSort === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        sorted.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'category') {
        sorted.sort((a, b) => a.category.localeCompare(b.category));
    }
    
    return sorted;
};

// Function to render products
const renderProducts = () => {
    // Filter products
    let filteredProducts = filterProducts();
    
    // Sort products
    const sortedProducts = sortProducts(filteredProducts);
    
    // Update results count
    resultsCountSpan.textContent = `Showing ${sortedProducts.length} products`;
    
    // Check if no products
    if (sortedProducts.length === 0) {
        productsListDiv.innerHTML = '<div class="empty-state">No products match your filters 🛍️</div>';
        return;
    }
    
    // Using map to generate HTML for each product
    const productsHTML = sortedProducts.map(product => {
        // Determine price badge
        let priceBadge = '';
        if (product.price < 50) priceBadge = 'Budget';
        else if (product.price < 100) priceBadge = 'Mid-Range';
        else priceBadge = 'Premium';
        
        return `
            <div class="product-card">
                <div class="price-badge">${priceBadge}</div>
                <div class="product-name">${escapeHtml(product.name)}</div>
                <div class="product-price">${product.price.toFixed(2)}</div>
                <div class="product-category">${product.category}</div>
                <div style="margin-top: 10px; font-size: 0.85em;">
                    ⭐ ${product.rating} ★ 
                    ${product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                </div>
            </div>
        `;
    }).join('');
    
    productsListDiv.innerHTML = productsHTML;
};

// Helper function to escape HTML
const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// Function to update active button states
const updateActiveButtons = () => {
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update sort buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        if (btn.dataset.sort === currentSort) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

// Event handlers
const handleFilterChange = (filter) => {
    currentFilter = filter;
    updateActiveButtons();
    renderProducts();
};

const handleSortChange = (sort) => {
    currentSort = sort;
    updateActiveButtons();
    renderProducts();
};

const handleCategoryChange = (event) => {
    currentCategory = event.target.value;
    renderProducts();
};

// Function to show console results
const showConsoleResults = () => {
    demonstrateAllMethods();
    alert('✅ Check the browser console (F12) to see all array method results!');
};

// Initialize application
const init = () => {
    // Display statistics
    displayStatistics();
    
    // Populate category filter
    populateCategoryFilter();
    
    // Render initial products
    renderProducts();
    
    // Add event listeners for filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => handleFilterChange(btn.dataset.filter));
    });
    
    // Add event listeners for sort buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => handleSortChange(btn.dataset.sort));
    });
    
    // Add event listener for category filter
    categoryFilterSelect.addEventListener('change', handleCategoryChange);
    
    // Add event listener for console button
    const showConsoleBtn = document.getElementById('showConsoleBtn');
    if (showConsoleBtn) {
        showConsoleBtn.addEventListener('click', showConsoleResults);
    }
    
    // Initial console demonstration
    console.log('🎯 Product Store Loaded!');
    console.log('Click "Show Console Results" to see all array methods in action!\n');
    demonstrateAllMethods();
};

// Start the application
init();