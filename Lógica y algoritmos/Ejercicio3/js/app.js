// Products Data
const products = [
    { id: 1, name: "Laptop", price: 1999.99, category: "Electronica", inStock: true, rating: 4.5 },
    { id: 2, name: "Iphone 19", price: 1699.99, category: "Electronica", inStock: true, rating: 4.7 },
    { id: 3, name: "QCY30 PRO", price: 689.99, category: "Electronica", inStock: true, rating: 4.3 },
    { id: 4, name: "Cafetera", price: 945.99, category: "Hogar", inStock: false, rating: 4.1 },
    { id: 5, name: "Lampara de escritorio", price: 725.50, category: "Hogar", inStock: true, rating: 4.0 },
    { id: 6, name: "Juego de pesas", price: 875.00, category: "Deportes", inStock: true, rating: 4.4 },
    { id: 7, name: "Mochila camping", price: 949.99, category: "Accessorios", inStock: true, rating: 4.2 },
    { id: 8, name: "Smart Watch", price: 499.99, category: "Electronica", inStock: true, rating: 4.6 },
    { id: 9, name: "Juego de cuchillos", price: 315.99, category: "Cocina", inStock: true, rating: 4.8 },
    { id: 10, name: "Tapete de Yoga", price: 129.99, category: "Deportes", inStock: true, rating: 4.3 }
];

// DOM Elements
const productsListDiv = document.getElementById('productsList');
const resultsCountSpan = document.getElementById('resultsCount');
const categoryFilterSelect = document.getElementById('categoryFilter');

// State
let currentFilter = 'all';
let currentSort = 'name';
let currentCategory = 'all';

// Populate category filter
const populateCategoryFilter = () => {
    const categories = [...new Set(products.map(p => p.category))];
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilterSelect.appendChild(option);
    });
};

// Filter products
const filterProducts = () => {
    let filtered = [...products];
    
    if (currentFilter === 'under500') {
        filtered = filtered.filter(p => p.price < 500);
    } else if (currentFilter === 'under1500') {
        filtered = filtered.filter(p => p.price < 1500);
    } else if (currentFilter === 'over1500') {
        filtered = filtered.filter(p => p.price >= 1500);
    }
    
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    return filtered;
};

// Sort products
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

// Escape HTML
const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// Render products
const renderProducts = () => {
    let filteredProducts = filterProducts();
    const sortedProducts = sortProducts(filteredProducts);
    
    resultsCountSpan.textContent = `Mostrando ${sortedProducts.length} productos`;
    
    if (sortedProducts.length === 0) {
        productsListDiv.innerHTML = '<div class="empty-state">No hay productos que coincidan con los filtros 🛍️</div>';
        return;
    }
    
    const productsHTML = sortedProducts.map(product => {
        
        return `
            <div class="product-card">
                <div class="product-name">${escapeHtml(product.name)}</div>
                <div class="product-price">${product.price.toFixed(2)}</div>
                <div class="product-category">${product.category}</div>
                <div style="margin-top: 10px; font-size: 1rem; font-weigth: bold;">
                    ⭐ ${product.rating} 
                    ${product.inStock ? 'Existente' : 'Sin piezas'}
                </div>
            </div>
        `;
    }).join('');
    
    productsListDiv.innerHTML = productsHTML;
};

// Update active buttons
const updateActiveButtons = () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
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

// Show array methods in console
const showArrayMethodsDemo = () => {
    console.clear();
    console.log('=== ARRAY METHODS DEMO ===');
    
    // filter
    const under100 = products.filter(p => p.price < 100);
    console.log('filter() - Products under $100:', under100.length);
    
    // map
    const names = products.map(p => p.name);
    console.log('map() - Product names:', names);
    
    // reduce
    const totalValue = products.reduce((sum, p) => sum + p.price, 0);
    console.log('reduce() - Total value:', totalValue.toFixed(2));
    
    // some
    const hasExpensive = products.some(p => p.price > 500);
    console.log('some() - Has products over $500?', hasExpensive);
    
    // every
    const allInStock = products.every(p => p.inStock);
    console.log('every() - All in stock?', allInStock);
    
    // includes
    const categories = products.map(p => p.category);
    console.log('includes() - Has Electronics?', categories.includes('Electronics'));
    
    // find
    const laptop = products.find(p => p.name === 'Laptop');
    console.log('find() - Found laptop:', laptop);
    
    console.log('========================');
};

// Initialize
const init = () => {
    populateCategoryFilter();
    renderProducts();
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => handleFilterChange(btn.dataset.filter));
    });
    
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => handleSortChange(btn.dataset.sort));
    });
    
    categoryFilterSelect.addEventListener('change', handleCategoryChange);
    
    showArrayMethodsDemo();
    console.log('App lista - revisa la consola para ver los métodos de array');
};

init();