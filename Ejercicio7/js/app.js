// Main Application Module - Handles UI and user interaction
import { 
    findMax, 
    buildRecursionTree, 
    getDetailedSteps,
    isValidNumberArray,
    getArrayStats,
    formatTreeString
} from './algorithm.js';

// DOM Elements
const arrayInput = document.getElementById('arrayInput');
const setArrayBtn = document.getElementById('setArrayBtn');
const exampleBtn = document.getElementById('exampleBtn');
const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');
const arrayValuesSpan = document.getElementById('arrayValues');
const runAlgorithmBtn = document.getElementById('runAlgorithmBtn');
const stepByStepBtn = document.getElementById('stepByStepBtn');
const resetExecutionBtn = document.getElementById('resetExecutionBtn');
const resultDiv = document.getElementById('result');
const recursionTreeDiv = document.getElementById('recursionTree');
const logContentDiv = document.getElementById('logContent');

// State
let currentArray = [3, 8, 2, 10, 5, 7];
let currentSteps = [];
let stepMode = false;
let currentStepIndex = 0;
let recursionTree = null;

// Function to update array display
const updateArrayDisplay = () => {
    arrayValuesSpan.textContent = `[${currentArray.join(', ')}]`;
    arrayInput.value = currentArray.join(', ');
    
    // Clear previous results
    resetSearch();
    
    // Update stats in console
    const stats = getArrayStats(currentArray);
    if (stats) {
        console.log('=== Array Statistics ===');
        console.log(`Length: ${stats.length}`);
        console.log(`Min: ${stats.min}`);
        console.log(`Max: ${stats.max}`);
        console.log(`Sum: ${stats.sum}`);
        console.log(`Average: ${stats.average.toFixed(2)}`);
        console.log('=======================');
    }
};

// Function to build and render recursion tree
const renderRecursionTree = () => {
    if (!currentArray.length) {
        recursionTreeDiv.innerHTML = '<p style="text-align: center; color: #999;">Empty array. Add some numbers to see the recursion tree.</p>';
        return;
    }
    
    recursionTree = buildRecursionTree(currentArray);
    
    const renderNode = (node) => {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'tree-node';
        
        const rangeText = node.range[0] === node.range[1] 
            ? `Position ${node.range[0]}`
            : `Range [${node.range[0]}-${node.range[1]}]`;
        
        nodeDiv.innerHTML = `
            <div class="node-content">
                <div class="node-range">${rangeText}</div>
                <div class="node-values">[${node.values.join(', ')}]</div>
                <div class="node-max">Max: ${node.max}</div>
            </div>
        `;
        
        if (node.left || node.right) {
            const childrenDiv = document.createElement('div');
            childrenDiv.className = 'tree-children';
            
            if (node.left) {
                childrenDiv.appendChild(renderNode(node.left));
            }
            if (node.right) {
                childrenDiv.appendChild(renderNode(node.right));
            }
            
            nodeDiv.appendChild(childrenDiv);
        }
        
        return nodeDiv;
    };
    
    recursionTreeDiv.innerHTML = '';
    recursionTreeDiv.appendChild(renderNode(recursionTree));
};

// Function to run the algorithm
const runAlgorithm = () => {
    if (!currentArray.length) {
        resultDiv.innerHTML = `
            <div class="result">
                <strong>⚠️ Error!</strong><br>
                Array is empty. Please add some numbers.
            </div>
        `;
        return;
    }
    
    if (!isValidNumberArray(currentArray)) {
        resultDiv.innerHTML = `
            <div class="result">
                <strong>⚠️ Error!</strong><br>
                Array contains invalid values. Please use only numbers.
            </div>
        `;
        return;
    }
    
    // Get detailed steps
    currentSteps = getDetailedSteps(currentArray);
    
    // Find maximum
    const max = findMax(currentArray);
    const stats = getArrayStats(currentArray);
    
    resultDiv.innerHTML = `
        <div class="result success">
            <strong>✅ Maximum Number Found!</strong>
            <div class="max-number">${max}</div>
            <small>Array length: ${stats.length} | Total recursive calls: ${currentSteps.length}</small>
        </div>
    `;
    resultDiv.className = 'result success';
    
    // Display all steps in log
    displayAllSteps();
    
    stepMode = false;
    currentStepIndex = 0;
};

// Function to display all steps
const displayAllSteps = () => {
    if (currentSteps.length === 0) {
        logContentDiv.innerHTML = '<p class="empty-log">No steps yet. Run the algorithm to see the recursive process.</p>';
        return;
    }
    
    const stepsHTML = currentSteps.map((step, index) => {
        let icon = '';
        let className = '';
        
        switch(step.type) {
            case 'divide':
                icon = '✂️';
                className = 'recursive-call';
                break;
            case 'base':
                icon = '📌';
                className = 'base-case';
                break;
            case 'combine':
                icon = '🔄';
                className = 'combine';
                break;
            default:
                icon = '📝';
                className = '';
        }
        
        return `
            <div class="log-entry ${className}">
                <strong>Step ${index + 1}:</strong> ${icon} ${step.message}
            </div>
        `;
    }).join('');
    
    logContentDiv.innerHTML = stepsHTML;
};

// Function for step-by-step execution
const runStepByStep = () => {
    if (!currentArray.length) {
        resultDiv.innerHTML = `
            <div class="result">
                <strong>⚠️ Error!</strong><br>
                Array is empty. Please add some numbers.
            </div>
        `;
        return;
    }
    
    if (!isValidNumberArray(currentArray)) {
        resultDiv.innerHTML = `
            <div class="result">
                <strong>⚠️ Error!</strong><br>
                Array contains invalid values. Please use only numbers.
            </div>
        `;
        return;
    }
    
    // If steps are empty or we're starting fresh
    if (currentSteps.length === 0 || !stepMode) {
        currentSteps = getDetailedSteps(currentArray);
        stepMode = true;
        currentStepIndex = 0;
        resultDiv.innerHTML = `
            <div class="result">
                <strong>👣 Step-by-Step Mode</strong><br>
                Click "Step by Step" again to see each recursive call.
            </div>
        `;
    }
    
    if (currentStepIndex < currentSteps.length) {
        const step = currentSteps[currentStepIndex];
        
        // Update result display
        resultDiv.innerHTML = `
            <div class="result">
                <strong>👣 Step ${currentStepIndex + 1} of ${currentSteps.length}</strong><br>
                ${step.message}
            </div>
        `;
        
        // Highlight the step in the log
        highlightCurrentStep(currentStepIndex);
        
        currentStepIndex++;
        
        // If we've reached the end
        if (currentStepIndex === currentSteps.length) {
            const max = findMax(currentArray);
            resultDiv.innerHTML = `
                <div class="result success">
                    <strong>✅ Algorithm Complete!</strong>
                    <div class="max-number">Maximum: ${max}</div>
                    <small>Total recursive calls: ${currentSteps.length}</small>
                </div>
            `;
            stepMode = false;
        }
    }
};

// Function to highlight current step
const highlightCurrentStep = (stepIndex) => {
    const logEntries = document.querySelectorAll('.log-entry');
    logEntries.forEach((entry, idx) => {
        entry.style.background = idx === stepIndex ? '#2c5282' : '#1a202c';
        if (idx === stepIndex) {
            entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
};

// Function to reset search
const resetSearch = () => {
    currentSteps = [];
    stepMode = false;
    currentStepIndex = 0;
    resultDiv.innerHTML = '<p>Click "Run Algorithm" to find the maximum number! 🎯</p>';
    resultDiv.className = 'result';
    logContentDiv.innerHTML = '<p class="empty-log">No steps yet. Run the algorithm to see the recursive process.</p>';
    
    // Re-render tree
    renderRecursionTree();
};

// Function to set array from input
const setArrayFromInput = () => {
    const inputValue = arrayInput.value.trim();
    
    if (!inputValue) {
        alert('Please enter numbers separated by commas');
        return;
    }
    
    const numbers = inputValue.split(',').map(item => {
        const num = parseFloat(item.trim());
        return isNaN(num) ? null : num;
    });
    
    if (numbers.some(n => n === null)) {
        alert('Invalid input. Please enter only numbers separated by commas (e.g., 3, 8, 2, 10, 5, 7)');
        return;
    }
    
    if (numbers.length === 0) {
        alert('Please enter at least one number');
        return;
    }
    
    currentArray = numbers;
    updateArrayDisplay();
    resetSearch();
};

// Function to load example array
const loadExample = () => {
    currentArray = [3, 8, 2, 10, 5, 7];
    updateArrayDisplay();
    resetSearch();
    showTemporaryMessage('📋 Loaded example array: [3, 8, 2, 10, 5, 7]', 'info');
};

// Function to generate random array
const generateRandom = () => {
    const length = Math.floor(Math.random() * 8) + 3; // 3 to 10 elements
    const randomArray = [];
    for (let i = 0; i < length; i++) {
        randomArray.push(Math.floor(Math.random() * 100) + 1); // 1 to 100
    }
    currentArray = randomArray;
    updateArrayDisplay();
    resetSearch();
    showTemporaryMessage(`🎲 Generated random array: [${randomArray.join(', ')}]`, 'info');
};

// Function to reset to default
const resetToDefault = () => {
    currentArray = [3, 8, 2, 10, 5, 7];
    updateArrayDisplay();
    resetSearch();
    showTemporaryMessage('🔄 Reset to default array', 'info');
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
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
};

// Event listeners
setArrayBtn.addEventListener('click', setArrayFromInput);
exampleBtn.addEventListener('click', loadExample);
randomBtn.addEventListener('click', generateRandom);
resetBtn.addEventListener('click', resetToDefault);
runAlgorithmBtn.addEventListener('click', runAlgorithm);
stepByStepBtn.addEventListener('click', runStepByStep);
resetExecutionBtn.addEventListener('click', resetSearch);

// Enter key support
arrayInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setArrayFromInput();
    }
});

// Initialize
updateArrayDisplay();
renderRecursionTree();

// Display initial info in console
console.log('🎯 Divide and Conquer - Find Maximum Algorithm');
console.log('==============================================');
console.log('Default array:', currentArray);
console.log('Maximum:', findMax(currentArray));
console.log('Recursion tree:');
console.log(formatTreeString(buildRecursionTree(currentArray)));