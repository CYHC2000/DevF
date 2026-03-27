// Main Application Module - Handles user interaction
import { 
    addDestination, 
    calculateCost, 
    getAllDestinations, 
    deleteDestination,
    formatCurrency,
    isDateValid,
    getUniqueDestinations
} from './travelManager.js';

// DOM Elements - Using const for elements that won't be reassigned
const destinationForm = document.getElementById('destinationForm');
const itineraryList = document.getElementById('itineraryList');
const costDestinationSelect = document.getElementById('costDestination');
const costTransportSelect = document.getElementById('costTransport');
const calculateBtn = document.getElementById('calculateBtn');
const costResult = document.getElementById('costResult');

// Function to render the itinerary (arrow function)
const renderItinerary = () => {
    const destinations = getAllDestinations();
    
    if (destinations.length === 0) {
        itineraryList.innerHTML = '<p class="empty-message">No destinations registered yet. Add your first destination!</p>';
        return;
    }
    
    // Using map to create HTML for each destination
    const itineraryHTML = destinations.map(dest => {
        // Calculate cost for this destination
        const costInfo = calculateCost(dest.name, dest.transport, dest.nights, dest.people);
        
        return `
            <div class="travel-card" data-id="${dest.id}">
                <h3>📍 ${dest.name}</h3>
                <p><strong>📅 Date:</strong> ${new Date(dest.date).toLocaleDateString()}</p>
                <p><strong>🚗 Transport:</strong> ${dest.transport.charAt(0).toUpperCase() + dest.transport.slice(1)}</p>
                <p><strong>🌙 Nights:</strong> ${dest.nights}</p>
                <p><strong>👥 People:</strong> ${dest.people}</p>
                <p class="cost"><strong>💰 Estimated Cost:</strong> ${formatCurrency(costInfo.finalCost)}</p>
                ${costInfo.discount > 0 ? `<p style="color: #28a745;">✨ Group discount applied: -${formatCurrency(costInfo.discount)}</p>` : ''}
                <button class="btn btn-danger delete-btn" data-id="${dest.id}">🗑️ Delete</button>
            </div>
        `;
    }).join('');
    
    itineraryList.innerHTML = itineraryHTML;
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(button.dataset.id);
            deleteDestination(id);
            renderItinerary();
            updateDestinationDropdown();
            showMessage('Destination deleted successfully!', 'success');
        });
    });
};

// Function to update destination dropdown (arrow function)
const updateDestinationDropdown = () => {
    const destinations = getAllDestinations();
    const uniqueDestinations = [...new Set(destinations.map(d => d.name))];
    
    // Clear current options except the first one
    while (costDestinationSelect.options.length > 1) {
        costDestinationSelect.remove(1);
    }
    
    // Add new options
    uniqueDestinations.forEach(dest => {
        const option = document.createElement('option');
        option.value = dest;
        option.textContent = dest;
        costDestinationSelect.appendChild(option);
    });
};

// Function to show messages (arrow function)
const showMessage = (message, type = 'info') => {
    // Create temporary message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
};

// Event handler for form submission (arrow function)
destinationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const destination = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;
    const transport = document.getElementById('transport').value;
    const nights = document.getElementById('nights').value;
    const people = document.getElementById('people').value;
    
    // Validate date
    if (!isDateValid(date)) {
        showMessage('Please select a future date!', 'error');
        return;
    }
    
    try {
        // Add destination
        const newDestination = addDestination(destination, date, transport, nights, people);
        
        // Show success message
        showMessage(`✨ ${destination} added to your itinerary!`, 'success');
        
        // Reset form
        destinationForm.reset();
        document.getElementById('nights').value = '3';
        document.getElementById('people').value = '1';
        
        // Update UI
        renderItinerary();
        updateDestinationDropdown();
        
    } catch (error) {
        showMessage(error.message, 'error');
    }
});

// Event handler for calculate button (arrow function)
calculateBtn.addEventListener('click', () => {
    const destination = costDestinationSelect.value;
    const transport = costTransportSelect.value;
    
    if (!destination) {
        showMessage('Please select a destination first!', 'error');
        return;
    }
    
    // Calculate cost for 3 nights and 1 person by default
    const costInfo = calculateCost(destination, transport, 3, 1);
    
    costResult.innerHTML = `
        <strong>Cost Breakdown for ${destination}:</strong><br>
        🏨 Hotel (3 nights): ${formatCurrency(costInfo.breakdown.hotel)}<br>
        🚗 Transport: ${formatCurrency(costInfo.breakdown.transport)}<br>
        🗺️ Destination: ${formatCurrency(costInfo.breakdown.destination)}<br>
        ${costInfo.discount > 0 ? `✨ Discount: -${formatCurrency(costInfo.discount)}<br>` : ''}
        <strong>💰 Total: ${formatCurrency(costInfo.finalCost)}</strong>
    `;
});

// Initialize the application (arrow function)
const init = () => {
    renderItinerary();
    updateDestinationDropdown();
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
};

// Start the application
init();