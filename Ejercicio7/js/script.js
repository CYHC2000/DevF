// Divide and Conquer Algorithm Module
// Finds the maximum number in an array using recursive divide and conquer

/**
 * Find maximum number using divide and conquer approach
 * @param {Array} arr - Array of numbers
 * @param {number} left - Left index (default 0)
 * @param {number} right - Right index (default arr.length - 1)
 * @param {Array} steps - Array to store steps for visualization
 * @returns {number} - Maximum number in the array
 */
export const findMax = (arr, left = 0, right = arr.length - 1, steps = null) => {
    // Validate input
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error('Array cannot be empty');
    }
    
    // Track steps if steps array is provided
    const shouldLog = steps !== null;
    
    // Base case: only one element
    if (left === right) {
        const value = arr[left];
        
        if (shouldLog) {
            steps.push({
                type: 'base',
                left,
                right,
                value,
                message: `📌 Base case: Single element [${value}] at position ${left} → max = ${value}`
            });
        }
        
        return value;
    }
    
    // Divide: find the middle point
    const mid = Math.floor((left + right) / 2);
    
    if (shouldLog) {
        steps.push({
            type: 'divide',
            left,
            mid,
            right,
            message: `✂️ Divide: [${left}..${right}] → Left [${left}..${mid}] | Right [${mid + 1}..${right}]`
        });
    }
    
    // Conquer: recursively find max in both halves
    const leftMax = findMax(arr, left, mid, steps);
    const rightMax = findMax(arr, mid + 1, right, steps);
    
    // Combine: return the larger value
    const result = Math.max(leftMax, rightMax);
    
    if (shouldLog) {
        steps.push({
            type: 'combine',
            left,
            right,
            leftMax,
            rightMax,
            result,
            message: `🔄 Combine: max(${leftMax}, ${rightMax}) = ${result} for range [${left}..${right}]`
        });
    }
    
    return result;
};

/**
 * Find maximum with detailed recursion tree structure
 * @param {Array} arr - Array of numbers
 * @param {number} left - Left index
 * @param {number} right - Right index
 * @returns {Object} - Node object representing the recursion tree
 */
export const buildRecursionTree = (arr, left = 0, right = arr.length - 1) => {
    const node = {
        range: [left, right],
        values: arr.slice(left, right + 1),
        left: null,
        right: null,
        max: null
    };
    
    // Base case
    if (left === right) {
        node.max = arr[left];
        return node;
    }
    
    // Divide
    const mid = Math.floor((left + right) / 2);
    
    // Conquer
    node.left = buildRecursionTree(arr, left, mid);
    node.right = buildRecursionTree(arr, mid + 1, right);
    
    // Combine
    node.max = Math.max(node.left.max, node.right.max);
    
    return node;
};

/**
 * Find maximum using iterative approach (for comparison)
 * @param {Array} arr - Array of numbers
 * @returns {number} - Maximum number
 */
export const findMaxIterative = (arr) => {
    if (arr.length === 0) return null;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
};

/**
 * Validate array contains only numbers
 * @param {Array} arr - Array to validate
 * @returns {boolean} - True if all elements are numbers
 */
export const isValidNumberArray = (arr) => {
    return arr.every(item => typeof item === 'number' && !isNaN(item));
};

/**
 * Get array statistics
 * @param {Array} arr - Array of numbers
 * @returns {Object} - Statistics object
 */
export const getArrayStats = (arr) => {
    if (arr.length === 0) return null;
    
    return {
        length: arr.length,
        min: Math.min(...arr),
        max: Math.max(...arr),
        sum: arr.reduce((a, b) => a + b, 0),
        average: arr.reduce((a, b) => a + b, 0) / arr.length
    };
};

/**
 * Step-by-step execution of divide and conquer algorithm
 * @param {Array} arr - Array of numbers
 * @returns {Array} - Array of steps with detailed information
 */
export const getDetailedSteps = (arr) => {
    const steps = [];
    findMax(arr, 0, arr.length - 1, steps);
    return steps;
};

/**
 * Format the recursion tree as a readable string
 * @param {Object} node - Recursion tree node
 * @param {number} depth - Current depth (for indentation)
 * @returns {string} - Formatted string representation
 */
export const formatTreeString = (node, depth = 0) => {
    const indent = '  '.repeat(depth);
    let result = `${indent}Range [${node.range[0]}-${node.range[1]}]: ${node.values} → Max: ${node.max}\n`;
    
    if (node.left) {
        result += formatTreeString(node.left, depth + 1);
    }
    if (node.right) {
        result += formatTreeString(node.right, depth + 1);
    }
    
    return result;
};