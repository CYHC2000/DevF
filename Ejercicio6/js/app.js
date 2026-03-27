// List of gifts (our array to search through)
const gifts = ["Muñeca", "Carro de juguete", "Rompecabezas", "Lego", "Pelota"];

// DOM Elements
const giftListElement = document.getElementById('giftList');
const giftInput = document.getElementById('giftInput');
const searchBtn = document.getElementById('searchBtn');
const resultMessage = document.getElementById('resultMessage');
const explainBtn = document.getElementById('explainBtn');
const recursionSteps = document.getElementById('recursionSteps');

// Function to display the gift list in the UI
function displayGiftList() {
    giftListElement.innerHTML = '';
    gifts.forEach((gift, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${gift}`;
        giftListElement.appendChild(li);
    });
}

// RECURSIVE FUNCTION: Searches for a gift in the array
// Parameters:
// - gifts: array of gifts
// - giftName: the gift we're looking for
// - index: current position we're checking (starts at 0)
function findGift(gifts, giftName, index = 0, steps = []) {
    // Store the current step for visualization
    steps.push(`Checking position ${index}: Is it "${giftName}"?`);
    
    // CASE BASE 1: We've reached the end of the array
    // If index equals the length of the array, the gift wasn't found
    if (index === gifts.length) {
        steps.push(`❌ Reached end of list. "${giftName}" not found.`);
        return {
            found: false,
            message: `${giftName} no está en la lista.`,
            steps: steps
        };
    }
    
    // CASE BASE 2: We found the gift at current position
    // If the current element matches the gift we're searching for
    if (gifts[index] === giftName) {
        steps.push(`✅ Found "${giftName}" at position ${index}!`);
        return {
            found: true,
            position: index,
            message: `🎉 ${giftName} está en la posición ${index + 1}. 🎉`,
            steps: steps
        };
    }
    
    // RECURSIVE STEP: If we haven't found it and haven't reached the end
    // We call the function again with index + 1 to check the next position
    steps.push(`🔄 "${giftName}" not at position ${index}. Moving to position ${index + 1}...`);
    return findGift(gifts, giftName, index + 1, steps);
}

// Function to handle the search when user clicks the button
function handleSearch() {
    const giftToFind = giftInput.value.trim();
    
    // Input validation
    if (!giftToFind) {
        showResultMessage('Please enter a gift name!', 'error');
        return;
    }
    
    // Clear previous result and hide steps
    resultMessage.innerHTML = '';
    recursionSteps.classList.add('hidden');
    
    // Show loading state
    searchBtn.textContent = 'Searching...';
    searchBtn.disabled = true;
    
    // Use setTimeout to show the recursive process (simulate thinking time)
    setTimeout(() => {
        // Call our recursive function
        const result = findGift(gifts, giftToFind);
        
        // Display the result message
        if (result.found) {
            showResultMessage(result.message, 'success');
        } else {
            showResultMessage(result.message, 'error');
        }
        
        // Store steps for explanation button
        recursionSteps.dataset.steps = JSON.stringify(result.steps);
        
        // Reset button
        searchBtn.textContent = 'Search Recursively';
        searchBtn.disabled = false;
    }, 100);
}

// Function to show result message with animation
function showResultMessage(message, type) {
    resultMessage.innerHTML = message;
    resultMessage.className = `result-message ${type}`;
}

// Function to explain the recursion process
function explainRecursion() {
    const stepsData = recursionSteps.dataset.steps;
    
    if (!stepsData) {
        recursionSteps.innerHTML = '<p>🔍 First, search for a gift to see the recursion steps!</p>';
        recursionSteps.classList.remove('hidden');
        return;
    }
    
    const steps = JSON.parse(stepsData);
    
    let html = '<h4>🧩 Recursion Steps:</h4>';
    html += '<p><strong>How the recursion works:</strong></p>';
    
    steps.forEach((step, i) => {
        let stepClass = '';
        if (step.includes('✅') || step.includes('❌')) {
            stepClass = 'step-base';
        } else {
            stepClass = 'step-recursive';
        }
        html += `<p class="${stepClass}">${i + 1}. ${step}</p>`;
    });
    
    html += '<p style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #4a5568;">';
    html += '<strong>💡 Explanation:</strong> The function keeps calling itself with index+1 ';
    html += 'until it either finds the gift (base case 2) or reaches the end of the array (base case 1).';
    html += '</p>';
    
    recursionSteps.innerHTML = html;
    recursionSteps.classList.remove('hidden');
}

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
explainBtn.addEventListener('click', explainRecursion);

// Allow pressing Enter key to search
giftInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Initialize the app
function init() {
    displayGiftList();
    // Optional: Add a welcome message
    showResultMessage('✨ Enter a gift name and click Search to use recursion! ✨', 'success');
    setTimeout(() => {
        if (resultMessage.innerHTML.includes('Enter')) {
            resultMessage.innerHTML = '';
        }
    }, 3000);
}

// Start the app
init();