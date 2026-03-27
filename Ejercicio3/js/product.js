// Products Data Module
// Array of product objects with name, price, and category

export const products = [
    {
        id: 1,
        name: "Laptop",
        price: 999.99,
        category: "Electronics",
        inStock: true,
        rating: 4.5
    },
    {
        id: 2,
        name: "Smartphone",
        price: 699.99,
        category: "Electronics",
        inStock: true,
        rating: 4.7
    },
    {
        id: 3,
        name: "Headphones",
        price: 89.99,
        category: "Electronics",
        inStock: true,
        rating: 4.3
    },
    {
        id: 4,
        name: "Coffee Maker",
        price: 45.99,
        category: "Home Appliances",
        inStock: false,
        rating: 4.1
    },
    {
        id: 5,
        name: "Desk Lamp",
        price: 25.50,
        category: "Home Decor",
        inStock: true,
        rating: 4.0
    },
    {
        id: 6,
        name: "Running Shoes",
        price: 75.00,
        category: "Sports",
        inStock: true,
        rating: 4.4
    },
    {
        id: 7,
        name: "Backpack",
        price: 49.99,
        category: "Accessories",
        inStock: true,
        rating: 4.2
    },
    {
        id: 8,
        name: "Smart Watch",
        price: 199.99,
        category: "Electronics",
        inStock: true,
        rating: 4.6
    },
    {
        id: 9,
        name: "Cookbook",
        price: 15.99,
        category: "Books",
        inStock: true,
        rating: 4.8
    },
    {
        id: 10,
        name: "Yoga Mat",
        price: 29.99,
        category: "Sports",
        inStock: true,
        rating: 4.3
    }
];

// Function to get products under $100 using filter()
export const getProductsUnder100 = () => {
    // Using filter() to get products with price less than 100
    const under100 = products.filter(product => product.price < 100);
    
    console.log('=== FILTER METHOD ===');
    console.log(`Products under $100 (${under100.length} products):`);
    under100.forEach(product => {
        console.log(`  - ${product.name}: $${product.price}`);
    });
    console.log('=====================\n');
    
    return under100;
};

// Function to sort products alphabetically using sort()
export const sortProductsAlphabetically = (productArray) => {
    // Using sort() to order products by name alphabetically
    // Creating a copy to avoid mutating the original array
    const sorted = [...productArray].sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    
    console.log('=== SORT METHOD ===');
    console.log('Products sorted alphabetically:');
    sorted.forEach(product => {
        console.log(`  - ${product.name} ($${product.price})`);
    });
    console.log('===================\n');
    
    return sorted;
};

// Function to get array of product names using map()
export const getProductNames = (productArray) => {
    // Using map() to extract only the names
    const names = productArray.map(product => product.name);
    
    console.log('=== MAP METHOD ===');
    console.log('Product names only:');
    names.forEach(name => console.log(`  - ${name}`));
    console.log('=================\n');
    
    return names;
};

// Additional Array Methods for practice

// Using reduce() - Calculate total value of inventory
export const getTotalInventoryValue = () => {
    const total = products.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.price;
    }, 0);
    
    console.log('=== REDUCE METHOD ===');
    console.log(`Total inventory value: $${total.toFixed(2)}`);
    console.log(`Average product price: $${(total / products.length).toFixed(2)}`);
    console.log('====================\n');
    
    return total;
};

// Using some() - Check if there are any expensive products (over $500)
export const hasExpensiveProducts = () => {
    const hasExpensive = products.some(product => product.price > 500);
    
    console.log('=== SOME METHOD ===');
    console.log(`Are there any products over $500? ${hasExpensive ? 'Yes ✅' : 'No ❌'}`);
    if (hasExpensive) {
        const expensiveProducts = products.filter(p => p.price > 500);
        expensiveProducts.forEach(p => {
            console.log(`  - ${p.name}: $${p.price}`);
        });
    }
    console.log('=================\n');
    
    return hasExpensive;
};

// Using every() - Check if all products have a price (always true in our case)
export const allProductsHavePrice = () => {
    const allHavePrice = products.every(product => product.price !== undefined && product.price > 0);
    
    console.log('=== EVERY METHOD ===');
    console.log(`Do all products have a valid price? ${allHavePrice ? 'Yes ✅' : 'No ❌'}`);
    console.log('==================\n');
    
    return allHavePrice;
};

// Using includes() - Check if a specific category exists
export const categoryExists = (categoryName) => {
    const categories = products.map(product => product.category);
    const exists = categories.includes(categoryName);
    
    console.log('=== INCLUDES METHOD ===');
    console.log(`Does the category "${categoryName}" exist? ${exists ? 'Yes ✅' : 'No ❌'}`);
    console.log('=====================\n');
    
    return exists;
};

// Bonus: Using find() - Find a product by name
export const findProductByName = (productName) => {
    const product = products.find(product => 
        product.name.toLowerCase() === productName.toLowerCase()
    );
    
    console.log('=== FIND METHOD ===');
    if (product) {
        console.log(`Found product: ${product.name} - $${product.price} (${product.category})`);
    } else {
        console.log(`Product "${productName}" not found`);
    }
    console.log('================\n');
    
    return product;
};

// Get category statistics using reduce()
export const getCategoryStats = () => {
    const stats = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = {
                count: 0,
                totalValue: 0,
                products: []
            };
        }
        acc[product.category].count++;
        acc[product.category].totalValue += product.price;
        acc[product.category].products.push(product.name);
        return acc;
    }, {});
    
    console.log('=== CATEGORY STATISTICS (using reduce) ===');
    Object.keys(stats).forEach(category => {
        console.log(`${category}:`);
        console.log(`  - Products: ${stats[category].count}`);
        console.log(`  - Total Value: $${stats[category].totalValue.toFixed(2)}`);
        console.log(`  - Items: ${stats[category].products.join(', ')}`);
    });
    console.log('========================================\n');
    
    return stats;
};

// Execute all demonstrations (will run when module loads)
export const demonstrateAllMethods = () => {
    console.clear();
    console.log('🎯 PRODUCT STORE - ARRAY METHODS DEMONSTRATION');
    console.log('===============================================\n');
    
    // 1. filter() - Products under $100
    const under100 = getProductsUnder100();
    
    // 2. sort() - Sort those products alphabetically
    const sortedUnder100 = sortProductsAlphabetically(under100);
    
    // 3. map() - Get only names
    const productNames = getProductNames(sortedUnder100);
    
    // 4. reduce() - Total inventory value
    getTotalInventoryValue();
    
    // 5. some() - Check for expensive products
    hasExpensiveProducts();
    
    // 6. every() - Check all products have prices
    allProductsHavePrice();
    
    // 7. includes() - Check category existence
    categoryExists('Electronics');
    categoryExists('Toys');
    
    // 8. find() - Find a specific product
    findProductByName('Laptop');
    findProductByName('Tablet');
    
    // 9. Advanced reduce - Category statistics
    getCategoryStats();
    
    console.log('✅ All array methods demonstrated successfully!');
    console.log('===============================================\n');
};