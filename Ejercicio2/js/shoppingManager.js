// Shopping List Manager Module
// Using array as the main data structure

// Initialize empty array for shopping list - Using const for array reference
const shoppingList = [];

// Function to add a product (arrow function)
// Prevents duplicate products (case-insensitive)
export const addProduct = (product) => {
    // Trim whitespace and validate
    const trimmedProduct = product.trim();
    
    if (!trimmedProduct) {
        throw new Error('Product name cannot be empty');
    }
    
    // Convert to lowercase for case-insensitive comparison
    const productLower = trimmedProduct.toLowerCase();
    
    // Check for duplicates (using some method)
    const isDuplicate = shoppingList.some(item => 
        item.name.toLowerCase() === productLower
    );
    
    if (isDuplicate) {
        throw new Error(`"${trimmedProduct}" is already in your shopping list!`);
    }
    
    // Create product object with additional info
    const newProduct = {
        id: Date.now(), // Unique ID for each product
        name: trimmedProduct,
        addedAt: new Date().toLocaleString(),
        completed: false
    };
    
    // Add to array
    shoppingList.push(newProduct);
    return newProduct;
};

// Function to remove a product (arrow function)
// Can remove by name or by ID
export const removeProduct = (identifier) => {
    // Find the index of the product
    const index = shoppingList.findIndex(item => 
        item.id === identifier || 
        item.name.toLowerCase() === identifier.toLowerCase()
    );
    
    if (index === -1) {
        throw new Error('Product not found in the shopping list');
    }
    
    // Remove product from array
    const removedProduct = shoppingList.splice(index, 1)[0];
    return removedProduct;
};

// Function to remove product by ID (arrow function)
export const removeProductById = (id) => {
    const index = shoppingList.findIndex(item => item.id === id);
    
    if (index === -1) {
        throw new Error('Product not found');
    }
    
    const removedProduct = shoppingList.splice(index, 1)[0];
    return removedProduct;
};

// Function to get all products (arrow function)
export const getAllProducts = () => {
    // Return a copy of the array to avoid direct manipulation
    return [...shoppingList];
};

// Function to get product count (arrow function)
export const getProductCount = () => {
    return shoppingList.length;
};

// Function to check if product exists (arrow function)
export const productExists = (productName) => {
    return shoppingList.some(item => 
        item.name.toLowerCase() === productName.toLowerCase()
    );
};

// Function to clear all products (arrow function)
export const clearAllProducts = () => {
    shoppingList.length = 0; // Clear the array
};

// Function to sort products alphabetically (arrow function)
export const sortProductsAlphabetically = () => {
    shoppingList.sort((a, b) => a.name.localeCompare(b.name));
    return [...shoppingList];
};

// Function to add multiple products at once (arrow function)
export const addMultipleProducts = (products) => {
    const addedProducts = [];
    const errors = [];
    
    products.forEach(product => {
        try {
            const added = addProduct(product);
            addedProducts.push(added);
        } catch (error) {
            errors.push(`${product}: ${error.message}`);
        }
    });
    
    return {
        added: addedProducts,
        errors: errors
    };
};

// Function to get product by ID (arrow function)
export const getProductById = (id) => {
    return shoppingList.find(item => item.id === id);
};

// Function to search products (arrow function)
export const searchProducts = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return shoppingList.filter(item => 
        item.name.toLowerCase().includes(term)
    );
};