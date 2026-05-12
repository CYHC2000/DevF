import { 
    addDestination, 
    calculateCost, 
    getAllDestinations, 
    deleteDestination,
    formatCurrency,
    isDateValid
} from './travelManager.js';

// DOM
const form = document.getElementById('destinationForm');
const list = document.getElementById('itineraryList');
const calculateBtn = document.getElementById('calculateBtn');
const result = document.getElementById('costResult');
const submitBtn = document.getElementById('submit');

// Render lista
const render = () => {
    const data = getAllDestinations();

    if (data.length === 0) {
        list.innerHTML = `<p class="empty-message">Aún no tienes viajes registrados</p>`;
        return;
    }

    list.innerHTML = data.map(d => `
        <div class="travel-card">
            <h3>${d.name.toUpperCase()}</h3>
            <p>Fecha: ${d.date}</p>
            <p>Noches: ${d.nights}</p>
            <p>Personas: ${d.people}</p>
            <button class="btn btn-danger" data-id="${d.id}">Eliminar</button>
        </div>
    `).join('');

    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', () => {
            deleteDestination(parseInt(btn.dataset.id));
            render();
            showMessage('Destino eliminado', 'success');
        });
    });
};

// Mensaje tipo toast
const showMessage = (message, type = 'info') => {  
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const messageDiv = document.createElement('div'); 
    messageDiv.classList.add('toast');
    messageDiv.textContent = message; 

    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 50px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-size: 14px;
    `;

    document.body.appendChild(messageDiv);  

    setTimeout(() => { 
        messageDiv.remove(); 
    }, 3000); 
};

// Calcular costo
calculateBtn.addEventListener('click', () => {
    const destination = document.getElementById('destination').value;
    const transport = document.getElementById('transport').value;
    const nights = parseInt(document.getElementById('nights').value, 10);
    const people = parseInt(document.getElementById('people').value, 10);

    if (!destination || !transport || nights <= 0 || people <= 0) {
        showMessage('Llena todos los campos', 'error');
        return;
    }

    const cost = calculateCost(destination, transport, nights, people);

    result.style.display = 'block';
    submitBtn.style.display = 'block';

    result.innerHTML = `
        <strong>Costo estimado:</strong> ${formatCurrency(cost.finalCost)}
    `;
});

// Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const transport = document.getElementById('transport').value;
    const nights = parseInt(document.getElementById('nights').value, 10);
    const people = parseInt(document.getElementById('people').value, 10);

    if (!destination || !transport || nights <= 0 || people <= 0) {
        showMessage('Datos inválidos', 'error');
        return;
    }

    if (!isDateValid(date)) {
        showMessage('Elige una fecha válida', 'error');
        return;
    }

    const newDestination = addDestination(destination, date, transport, nights, people);

    showMessage(`✨ Nuevo destino ${newDestination.name.toUpperCase()}`, 'success');

    form.reset();
    result.style.display = 'none';
    submitBtn.style.display = 'none';

    render();
});

// Init
const init = () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    render();
};

init();