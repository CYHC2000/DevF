// Main Application Module - Handles UI and user interaction
import { 
    encontrarPareja, 
    encontrarTodasLasParejas, 
    getInitialStats,
    isSorted,
    findMatchingSeats
} from './algorithm.js';

// Default guest list (sorted alphabetically)
const defaultGuests = ["Ana", "Carlos", "Cecilia", "Daniel", "Diana", "Eduardo"];

// Application state
let guests = [...defaultGuests];
let currentSearchResult = null;
let stepMode = false;
let currentStepIndex = 0;

// DOM Elements
const guestListDiv = document.getElementById('guestList');
const guestNameInput = document.getElementById('guestName');
const addGuestBtn = document.getElementById('addGuestBtn');
const resetListBtn = document.getElementById('resetListBtn');
const clearListBtn = document.getElementById('clearListBtn');
const runAlgorithmBtn = document.getElementById('runAlgorithmBtn');
const stepByStepBtn = document.getElementById('stepByStepBtn');
const resetSearchBtn = document.getElementById('resetSearchBtn');
const algorithmResultDiv = document.getElementById('algorithmResult');
const pointersVisualization = document.getElementById('pointersVisualization');

// Function to render guest list
const renderGuestList = () => {
    if (guests.length === 0) {
        guestListDiv.innerHTML = '<div class="empty-message" style="text-align: center; padding: 40px; color: #999;">No guests added yet. Add some guests to get started! 🎉</div>';
        return;
    }
    
    const guestsHTML = guests.map((guest, index) => {
        const initial = guest[0].toUpperCase();
        return `
            <div class="guest-card" data-index="${index}" data-name="${guest}">
                <div class="guest-initial">${initial}</div>
                <div class="guest-name">${escapeHtml(guest)}</div>
                <div class="guest-index">Position ${index}</div>
            </div>
        `;
    }).join('');
    
    guestListDiv.innerHTML = guestsHTML;
    
    // If we have a search result, highlight the matching pair
    if (currentSearchResult && currentSearchResult.pair) {
        highlightMatchingPair(currentSearchResult.indices[0], currentSearchResult.indices[1]);
    }
};

// Helper function to escape HTML
const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// Function to highlight matching pair
const highlightMatchingPair = (index1, index2) => {
    const cards = document.querySelectorAll('.guest-card');
    cards.forEach((card, idx) => {
        card.classList.remove('matching-pair');
        if (idx === index1 || idx === index2) {
            card.classList.add('matching-pair');
        }
    });
};

// Function to update pointer visualization
const updatePointerVisualization = (leftIndex, rightIndex) => {
    if (guests.length === 0) {
        pointersVisualization.innerHTML = '<p style="text-align: center; color: #999;">Add guests to see pointer visualization</p>';
        return;
    }
    
    const leftGuest = guests[leftIndex];
    const rightGuest = guests[rightIndex];
    
    const visualizationHTML = `
        <div class="pointer-indicator left">
            <div class="pointer-icon">👇</div>
            <div><strong>Left Pointer</strong></div>
            <div class="pointer-position">Position ${leftIndex}</div>
            <div>Guest: ${escapeHtml(leftGuest)}</div>
            <div>Initial: ${leftGuest ? leftGuest[0].toUpperCase() : '-'}</div>
        </div>
        <div class="pointer-indicator right">
            <div class="pointer-icon">👇</div>
            <div><strong>Right Pointer</strong></div>
            <div class="pointer-position">Position ${rightIndex}</div>
            <div>Guest: ${escapeHtml(rightGuest)}</div>
            <div>Initial: ${rightGuest ? rightGuest[0].toUpperCase() : '-'}</div>
        </div>
    `;
    
    pointersVisualization.innerHTML = visualizationHTML;
};

// Function to run the algorithm
const runAlgorithm = () => {
    if (guests.length < 2) {
        algorithmResultDiv.innerHTML = `
            <div class="algorithm-result failure">
                <strong>⚠️ Not enough guests!</strong><br>
                Add at least 2 guests to run the algorithm.
            </div>
        `;
        algorithmResultDiv.className = 'algorithm-result failure';
        pointersVisualization.innerHTML = '<p style="text-align: center; color: #999;">Need at least 2 guests</p>';
        currentSearchResult = null;
        return;
    }
    
    // Check if list is sorted
    if (!isSorted(guests)) {
        algorithmResultDiv.innerHTML = `
            <div class="algorithm-result failure">
                <strong>⚠️ Warning!</strong><br>
                The guest list is not sorted alphabetically. The algorithm works best with sorted lists.
                Consider resetting to default or sorting your list.
            </div>
        `;
    }
    
    // Run the algorithm
    const result = findMatchingSeats(guests);
    currentSearchResult = result;
    
    if (result.found) {
        algorithmResultDiv.innerHTML = `
            <div class="algorithm-result success">
                <strong>🎉 Pair Found!</strong><br>
                "${escapeHtml(result.pair[0])}" and "${escapeHtml(result.pair[1])}" can sit together!<br>
                <small>Both names start with "${result.pair[0][0].toUpperCase()}"</small><br>
                <small>Found at positions ${result.indices[0]} and ${result.indices[1]}</small>
            </div>
        `;
        algorithmResultDiv.className = 'algorithm-result success';
        highlightMatchingPair(result.indices[0], result.indices[1]);
        
        // Show the last step in visualization
        const lastStep = result.steps[result.steps.length - 1];
        updatePointerVisualization(lastStep.leftPointer, lastStep.rightPointer);
        
        // Show all steps in console
        console.log('=== Algorithm Steps ===');
        result.steps.forEach(step => {
            console.log(`Step ${step.step}: Compare "${step.leftName}" (${step.leftInitial}) and "${step.rightName}" (${step.rightInitial}) -> ${step.isMatch ? 'MATCH! 🎉' : 'No match'}`);
        });
        
    } else {
        algorithmResultDiv.innerHTML = `
            <div class="algorithm-result failure">
                <strong>❌ No Pair Found</strong><br>
                No consecutive guests have names starting with the same letter.<br>
                <small>Try adding more guests with matching initials!</small>
            </div>
        `;
        algorithmResultDiv.className = 'algorithm-result failure';
        
        // Show the last step
        if (result.steps.length > 0) {
            const lastStep = result.steps[result.steps.length - 1];
            updatePointerVisualization(lastStep.leftPointer, lastStep.rightPointer);
        }
        
        // Show stats
        const stats = getInitialStats(guests);
        const availableInitials = Object.keys(stats).filter(initial => stats[initial] >= 2);
        
        if (availableInitials.length > 0) {
            algorithmResultDiv.innerHTML += `<br><small>💡 Tip: You have multiple guests with same initial (${availableInitials.join(', ')}), but they're not consecutive. Try sorting or adding more guests with these initials!</small>`;
        }
    }
    
    stepMode = false;
    currentStepIndex = 0;
};

// Function for step-by-step execution
const runStepByStep = () => {
    if (guests.length < 2) {
        algorithmResultDiv.innerHTML = `
            <div class="algorithm-result failure">
                <strong>⚠️ Not enough guests!</strong><br>
                Add at least 2 guests to run step by step.
            </div>
        `;
        return;
    }
    
    if (!currentSearchResult || !currentSearchResult.steps) {
        // Run algorithm first to get steps
        const result = findMatchingSeats(guests);
        currentSearchResult = result;
        stepMode = true;
        currentStepIndex = 0;
    } else {
        stepMode = true;
    }
    
    if (currentStepIndex < currentSearchResult.steps.length) {
        const step = currentSearchResult.steps[currentStepIndex];
        
        // Update visualization
        updatePointerVisualization(step.leftPointer, step.rightPointer);
        
        // Update result display
        algorithmResultDiv.innerHTML = `
            <div class="algorithm-result">
                <strong>👣 Step ${step.step} of ${currentSearchResult.steps.length}</strong><br>
                Comparing "${escapeHtml(step.leftName)}" (starts with ${step.leftInitial})<br>
                and "${escapeHtml(step.rightName)}" (starts with ${step.rightInitial})<br>
                <strong>${step.isMatch ? '✅ MATCH FOUND!' : '❌ No match - moving pointers'}</strong>
            </div>
        `;
        
        // Highlight current guests being compared
        highlightGuestsForStep(step.leftPointer, step.rightPointer);
        
        if (step.isMatch) {
            algorithmResultDiv.innerHTML = `
                <div class="algorithm-result success">
                    <strong>🎉 Found Matching Pair at Step ${step.step}!</strong><br>
                    "${escapeHtml(step.leftName)}" and "${escapeHtml(step.rightName)}" can sit together!
                </div>
            `;
            stepMode = false;
        }
        
        currentStepIndex++;
    } else {
        if (currentSearchResult.found) {
            const pair = currentSearchResult.pair;
            algorithmResultDiv.innerHTML = `
                <div class="algorithm-result success">
                    <strong>🎉 Search Complete!</strong><br>
                    Found pair: "${escapeHtml(pair[0])}" and "${escapeHtml(pair[1])}"
                </div>
            `;
        } else {
            algorithmResultDiv.innerHTML = `
                <div class="algorithm-result failure">
                    <strong>❌ Search Complete!</strong><br>
                    No matching consecutive guests found.
                </div>
            `;
        }
        stepMode = false;
    }
};

// Helper function to highlight guests for step-by-step
const highlightGuestsForStep = (leftIndex, rightIndex) => {
    const cards = document.querySelectorAll('.guest-card');
    cards.forEach((card, idx) => {
        card.classList.remove('pointer-start', 'pointer-next');
        if (idx === leftIndex) {
            card.classList.add('pointer-start');
        }
        if (idx === rightIndex) {
            card.classList.add('pointer-next');
        }
    });
};

// Function to reset search
const resetSearch = () => {
    currentSearchResult = null;
    stepMode = false;
    currentStepIndex = 0;
    algorithmResultDiv.innerHTML = '<p>Click "Run Algorithm" to find the first matching pair! 🎯</p>';
    algorithmResultDiv.className = 'algorithm-result';
    pointersVisualization.innerHTML = '<p style="text-align: center; color: #999;">Run the algorithm to see pointer positions</p>';
    
    // Remove all highlights
    const cards = document.querySelectorAll('.guest-card');
    cards.forEach(card => {
        card.classList.remove('pointer-start', 'pointer-next', 'matching-pair');
    });
    
    renderGuestList();
};

// Function to add guest
const addGuest = () => {
    const guestName = guestNameInput.value.trim();
    
    if (!guestName) {
        alert('Please enter a guest name');
        return;
    }
    
    if (guestName.length < 2) {
        alert('Name must be at least 2 characters');
        return;
    }
    
    // Add guest and sort alphabetically
    guests.push(guestName);
    guests.sort();
    
    // Clear input
    guestNameInput.value = '';
    
    // Reset search
    resetSearch();
    
    // Re-render
    renderGuestList();
    
    // Show success message
    showTemporaryMessage(`✅ Added "${guestName}"`, 'success');
};

// Function to reset to default list
const resetToDefault = () => {
    guests = [...defaultGuests];
    resetSearch();
    renderGuestList();
    showTemporaryMessage('📋 Reset to default guest list', 'info');
};

// Function to clear all guests
const clearAll = () => {
    if (guests.length > 0 && confirm('Are you sure you want to clear all guests?')) {
        guests = [];
        resetSearch();
        renderGuestList();
        showTemporaryMessage('🗑️ All guests removed', 'info');
    }
};

// Function to show temporary message
const showTemporaryMessage = (message, type) => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
};

// Function to display statistics in console
const displayStats = () => {
    const stats = getInitialStats(guests);
    console.log('=== Guest Initial Statistics ===');
    Object.keys(stats).sort().forEach(initial => {
        console.log(`${initial}: ${stats[initial]} guest(s)`);
    });
    console.log('================================');
};

// Event listeners
addGuestBtn.addEventListener('click', addGuest);
resetListBtn.addEventListener('click', resetToDefault);
clearListBtn.addEventListener('click', clearAll);
runAlgorithmBtn.addEventListener('click', () => {
    runAlgorithm();
    displayStats();
});
stepByStepBtn.addEventListener('click', runStepByStep);
resetSearchBtn.addEventListener('click', resetSearch);

// Enter key support
guestNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addGuest();