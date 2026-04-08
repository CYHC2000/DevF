// Módulo principal - Maneja interfaz y eventos
import { 
    addProduct, 
    removeProductById, 
    getAllProducts, 
    getProductCount,
    clearAllProducts,
} from './shoppingManager.js';

// Elementos del DOM
const productInput = document.getElementById('productInput');
const addBtn = document.getElementById('addBtn');
const shoppingListDiv = document.getElementById('shoppingList');
const itemCountSpan = document.getElementById('itemCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const sampleItemsBtn = document.getElementById('sampleItemsBtn');
const sortBtn = document.getElementById('sortBtn');
const errorMessage = document.getElementById('errorMessage');

// Muestra mensaje de error
const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.color = '#dc3545';
    
    // Limpia el mensaje después de 3 segundos
    setTimeout(() => {
        if (errorMessage.textContent === message) {
            errorMessage.textContent = '';
        }
    }, 3000);
};

// Muestra mensaje de éxito
const showSuccess = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.color = '#28a745';
    
    // Limpia el mensaje después de 2 segundos
    setTimeout(() => {
        if (errorMessage.textContent === message) {
            errorMessage.textContent = '';
        }
    }, 2000);
};

// Renderiza la lista de compras
const renderShoppingList = () => {
    const products = getAllProducts();
    const count = getProductCount();
    
    // Actualiza el contador
    itemCountSpan.textContent = `Productos en total: ${count}`;
    
    // Verifica si está vacía
    if (products.length === 0) {
        shoppingListDiv.innerHTML = '<p class="empty-message">Agrega productos necesarios para un adulto independiente...</p>';
        return;
    }
    
    // Genera HTML por producto
    const productsHTML = products.map(product => {
        // Formatea fecha y hora
        const addedDate = new Date(product.addedAt).toLocaleDateString();
        const addedTime = new Date(product.addedAt).toLocaleTimeString();
        
        return `
            <div class="product-item" data-id="${product.id}">
                <div class="product-name">
                    <span style = "text-transform: uppercase;">${escapeHtml(product.name)}</span>
                </div>
                <div class="product-actions">
                    <button class="delete-product" data-id="${product.id}">Quitar</button>
                </div>
            </div>
        `;
    }).join('');
    
    shoppingListDiv.innerHTML = productsHTML;
    
    // Asigna eventos a botones de eliminar
    document.querySelectorAll('.delete-product').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(button.dataset.id);
            try {
                removeProductById(id);
                renderShoppingList();
                showSuccess('¡Producto eliminado correctamente!');
            } catch (error) {
                showError(error.message);
            }
        });
    });
};

// Escapa HTML para evitar XSS
const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// Agrega producto desde el input
const handleAddProduct = () => {
    const productName = productInput.value;
    
    try {
        const newProduct = addProduct(productName);
        renderShoppingList();
        showSuccess(`"${newProduct.name}". ¡Anotado!`);
        productInput.value = ''; // Limpia input
        productInput.focus(); // Regresa foco
    } catch (error) {
        showError(error.message);
        productInput.classList.add('error');
        setTimeout(() => productInput.classList.remove('error'), 500);
    }
};

// Maneja limpiar lista
const handleClearAll = () => {
    if (getProductCount() === 0) {
        showError('Tu lista está vacía');
        return;
    }
    
    // Confirma antes de eliminar
    const confirmClear = confirm('¿Estás seguro de eliminar tu lista de compras?');
    
    if (confirmClear) {
        clearAllProducts();
        renderShoppingList();
        showSuccess('Se ha vaciado tu lista');
    }
};

// Maneja tecla Enter
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleAddProduct();
    }
};

// Inicializa la aplicación
const init = () => {
    // Carga estado inicial
    renderShoppingList();
    
    // Asigna eventos
    addBtn.addEventListener('click', handleAddProduct);
    productInput.addEventListener('keypress', handleKeyPress);
    clearAllBtn.addEventListener('click', handleClearAll);
    sampleItemsBtn.addEventListener('click', addSampleItems);
    sortBtn.addEventListener('click', handleSort);
    
    // Enfoca el input
    productInput.focus();
    
    // Agrega estilos para error
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

// Inicia al cargar el DOM
document.addEventListener('DOMContentLoaded', init);