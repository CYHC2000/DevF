// Módulo de lista de compras
// Usa un arreglo como estructura principal

// Inicializa arreglo vacío para la lista de compras
const shoppingList = [];

// Función para agregar un producto
// Evita duplicados sin distinguir mayúsculas/minúsculas
export const addProduct = (product) => {
    // Elimina espacios y valida
    const trimmedProduct = product.trim();
    
    if (!trimmedProduct) {
        throw new Error('No se puede agregar un producto vacío');
    }
    
    // Convierte a minúsculas para comparar
    const productLower = trimmedProduct.toLowerCase();
    
    // Verifica duplicados
    const isDuplicate = shoppingList.some(item => 
        item.name.toLowerCase() === productLower
    );
    
    if (isDuplicate) {
        throw new Error(`¡"${trimmedProduct}", ya está en tu lista!`);
    }
    
    // Crea objeto producto con datos adicionales
    const newProduct = {
        id: Date.now(),
        name: trimmedProduct,
        addedAt: new Date().toLocaleString(),
        completed: false
    };
    
    // Agrega al arreglo
    shoppingList.push(newProduct);
    return newProduct;
};

// Función para eliminar un producto
// Permite eliminar por nombre o ID
export const removeProduct = (identifier) => {
    // Busca el índice del producto
    const index = shoppingList.findIndex(item => 
        item.id === identifier || 
        item.name.toLowerCase() === identifier.toLowerCase()
    );
    
    if (index === -1) {
        throw new Error('No se puede eliminar lo que no existe');
    }
    
    // Elimina el producto del arreglo
    const removedProduct = shoppingList.splice(index, 1)[0];
    return removedProduct;
};

// Función para eliminar por ID
export const removeProductById = (id) => {
    const index = shoppingList.findIndex(item => item.id === id);
    
    if (index === -1) {
        throw new Error('Error al eliminar el producto');
    }
    
    const removedProduct = shoppingList.splice(index, 1)[0];
    return removedProduct;
};

// Función para obtener todos los productos
export const getAllProducts = () => {
    // Devuelve copia para evitar modificaciones directas
    return [...shoppingList];
};

// Función para contar productos
export const getProductCount = () => {
    return shoppingList.length;
};

// Función para verificar existencia de un producto
export const productExists = (productName) => {
    return shoppingList.some(item => 
        item.name.toLowerCase() === productName.toLowerCase()
    );
};

// Función para limpiar todos los productos
export const clearAllProducts = () => {
    shoppingList.length = 0; // Vacía el arreglo
};

// Función para ordenar alfabéticamente
export const sortProductsAlphabetically = () => {
    shoppingList.sort((a, b) => a.name.localeCompare(b.name));
    return [...shoppingList];
};

// Función para obtener producto por ID
export const getProductById = (id) => {
    return shoppingList.find(item => item.id === id);
};

// Función para buscar productos
export const searchProducts = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return shoppingList.filter(item => 
        item.name.toLowerCase().includes(term)
    );
};