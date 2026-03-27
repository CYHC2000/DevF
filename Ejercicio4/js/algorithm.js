// Two Pointers Algorithm Module
// This algorithm finds the first pair of consecutive guests whose names start with the same letter

/**
 * Find the first matching pair of consecutive guests using two pointers
 * @param {Array} arr - Array of guest names (sorted alphabetically)
 * @returns {Array|null} - Array with the pair of names or null if not found
 */
export const encontrarPareja = (arr) => {
    // Validate input
    if (!Array.isArray(arr) || arr.length < 2) {
        console.log('⚠️ Need at least 2 guests to find a pair');
        return null;
    }
    
    // Initialize two pointers
    let inicio = 0;      // Left pointer - points to current guest
    let siguiente = 1;   // Right pointer - points to next guest
    
    // Track steps for visualization
    const steps = [];
    
    // Loop through the array until the right pointer reaches the end
    while (siguiente < arr.length) {
        // Get first letters (case-insensitive)
        const letra1 = arr[inicio][0].toUpperCase();
        const letra2 = arr[siguiente][0].toUpperCase();
        
        // Record step for visualization
        steps.push({
            leftIndex: inicio,
            rightIndex: siguiente,
            leftName: arr[inicio],
            rightName: arr[siguiente],
            leftLetter: letra1,
            rightLetter: letra2,
            match: letra1 === letra2
        });
        
        // Compare initials
        if (letra1 === letra2) {
            // Found matching pair!
            console.log(`✅ Found matching pair: "${arr[inicio]}" and "${arr[siguiente]}" (both start with ${letra1})`);
            return {
                pair: [arr[inicio], arr[siguiente]],
                indices: [inicio, siguiente],
                steps: steps
            };
        }
        
        // Move both pointers forward
        inicio++;
        siguiente++;
    }
    
    // No matching pair found
    console.log('❌ No consecutive guests found with matching initials');
    return {
        pair: null,
        indices: null,
        steps: steps
    };
};

/**
 * Enhanced version that finds all matching pairs (not just first)
 * @param {Array} arr - Array of guest names
 * @returns {Array} - Array of all matching pairs
 */
export const encontrarTodasLasParejas = (arr) => {
    const pairs = [];
    
    for (let i = 0; i < arr.length - 1; i++) {
        const letra1 = arr[i][0].toUpperCase();
        const letra2 = arr[i + 1][0].toUpperCase();
        
        if (letra1 === letra2) {
            pairs.push({
                pair: [arr[i], arr[i + 1]],
                indices: [i, i + 1],
                letter: letra1
            });
        }
    }
    
    return pairs;
};

/**
 * Get statistics about guest initials
 * @param {Array} arr - Array of guest names
 * @returns {Object} - Statistics object
 */
export const getInitialStats = (arr) => {
    const stats = {};
    
    arr.forEach(name => {
        const initial = name[0].toUpperCase();
        stats[initial] = (stats[initial] || 0) + 1;
    });
    
    return stats;
};

/**
 * Validate if the guest list is sorted alphabetically
 * @param {Array} arr - Array of guest names
 * @returns {boolean} - True if sorted, false otherwise
 */
export const isSorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
};

/**
 * Find potential seats (matching pairs) with visualization steps
 * @param {Array} arr - Array of guest names
 * @returns {Object} - Result with steps and pair
 */
export const findMatchingSeats = (arr) => {
    const steps = [];
    let left = 0;
    let right = 1;
    
    while (right < arr.length) {
        const currentStep = {
            step: steps.length + 1,
            leftPointer: left,
            rightPointer: right,
            leftName: arr[left],
            rightName: arr[right],
            leftInitial: arr[left][0].toUpperCase(),
            rightInitial: arr[right][0].toUpperCase(),
            isMatch: arr[left][0].toUpperCase() === arr[right][0].toUpperCase()
        };
        
        steps.push(currentStep);
        
        if (currentStep.isMatch) {
            return {
                found: true,
                pair: [arr[left], arr[right]],
                indices: [left, right],
                steps: steps,
                message: `🎉 Found match! "${arr[left]}" and "${arr[right]}" both start with "${currentStep.leftInitial}"`
            };
        }
        
        left++;
        right++;
    }
    
    return {
        found: false,
        pair: null,
        indices: null,
        steps: steps,
        message: '❌ No matching consecutive guests found'
    };
};