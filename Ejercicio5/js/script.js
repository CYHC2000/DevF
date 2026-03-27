/**
 * Finds the longest word in a text using the Sliding Window technique
 * @param {string} text - The input text to analyze
 * @returns {string} - The longest word found
 */
function findLongestWord(text) {
    // Step 1: Validate input - handle empty or invalid text
    if (!text || text.trim() === '') {
        return 'Please enter some text';
    }
    
    // Step 2: Split the text into an array of words
    // The Sliding Window starts here - we'll slide through each word
    const words = text.split(' ');
    
    // Step 3: Initialize variables
    // This is where our window starts
    let longestWord = '';  // Stores the longest word found so far
    
    // Step 4: Slide through each word (this is the Sliding Window technique)
    for (let i = 0; i < words.length; i++) {
        const currentWord = words[i];
        
        // Remove punctuation for accurate length comparison
        // This cleans the word from commas, periods, etc.
        const cleanWord = currentWord.replace(/[^\w\s]/g, '');
        
        // Compare the length of the current word with the longest word found
        // This is the core comparison of the Sliding Window technique
        if (cleanWord.length > longestWord.length) {
            // Update the longest word
            longestWord = cleanWord;
        }
    }
    
    // Step 5: Return the result
    return longestWord || 'No words found';
}

/**
 * Alternative version showing the Sliding Window concept more explicitly
 * This version makes the "window" concept clearer for beginners
 */
function findLongestWordWithWindowDisplay(text) {
    if (!text || text.trim() === '') {
        return 'Please enter some text';
    }
    
    const words = text.split(' ');
    let longestWord = '';
    
    // The Sliding Window: we're creating a window that shows one word at a time
    // As we "slide" through the array, we compare each word
    console.log('=== Sliding Window Process ===');
    console.log(`Total words: ${words.length}`);
    
    for (let windowIndex = 0; windowIndex < words.length; windowIndex++) {
        // This is our current window position - it's "sliding" through each word
        const currentWordInWindow = words[windowIndex];
        const cleanWord = currentWordInWindow.replace(/[^\w\s]/g, '');
        
        console.log(`Window at position ${windowIndex + 1}: "${cleanWord}" (Length: ${cleanWord.length})`);
        
        if (cleanWord.length > longestWord.length) {
            longestWord = cleanWord;
            console.log(`  ✨ New longest word found: "${longestWord}" (Length: ${longestWord.length})`);
        } else {
            console.log(`  Current longest word remains: "${longestWord}"`);
        }
    }
    
    console.log('=== Process Complete ===');
    return longestWord || 'No words found';
}

// Function to display the result in the UI
function displayLongestWord() {
    // Get the text from the textarea
    const textInput = document.getElementById('textInput');
    const resultDiv = document.getElementById('result');
    const text = textInput.value;
    
    // Show loading state
    resultDiv.innerHTML = '<div class="placeholder">Analyzing text with Sliding Window technique...</div>';
    
    // Use setTimeout to simulate processing and allow UI to update
    setTimeout(() => {
        // Call the function to find the longest word
        const longestWord = findLongestWord(text);
        
        // Also show the console version for learning purposes
        console.log('\n=== SLIDING WINDOW DEMO ===');
        console.log('Input text:', text);
        console.log('Result:', longestWord);
        findLongestWordWithWindowDisplay(text); // This logs the detailed process
        
        // Prepare the display
        if (longestWord && longestWord !== 'Please enter some text' && longestWord !== 'No words found') {
            resultDiv.innerHTML = `
                <div class="longest-word">${longestWord}</div>
                <div class="word-info">
                    📏 Length: ${longestWord.length} characters<br>
                    🔍 Found using Sliding Window technique (check the console for details!)
                </div>
            `;
        } else if (longestWord === 'Please enter some text') {
            resultDiv.innerHTML = '<div class="placeholder">⚠️ Please enter some text to analyze</div>';
        } else {
            resultDiv.innerHTML = '<div class="placeholder">⚠️ No valid words found in the text</div>';
        }
    }, 100);
}

// Add event listener when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Get the button and attach the click event
    const findButton = document.getElementById('findBtn');
    findButton.addEventListener('click', displayLongestWord);
    
    // Optional: Allow pressing Enter (Ctrl+Enter) to trigger the search
    const textInput = document.getElementById('textInput');
    textInput.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            displayLongestWord();
        }
    });
    
    // Add a placeholder example to demonstrate the functionality
    const exampleText = "JavaScript es un lenguaje de programación increíble para aprender";
    textInput.placeholder = `Try this example:\n"${exampleText}"\n\nOr type your own text...`;
});

// Additional explanation logged to console
console.log(`
╔══════════════════════════════════════════════════════════╗
║  SLIDING WINDOW TECHNIQUE - LONGEST WORD FINDER         ║
╠══════════════════════════════════════════════════════════╣
║  How it works:                                           ║
║  1. Split text into words array using .split(' ')       ║
║  2. Initialize 'longestWord' as empty string            ║
║  3. Slide through each word (window position)           ║
║  4. Compare current word length with longestWord        ║
║  5. Update longestWord when longer word is found        ║
║  6. Return the result                                   ║
║                                                          ║
║  Time Complexity: O(n) where n is number of words       ║
║  Space Complexity: O(1) for the sliding window          ║
╚══════════════════════════════════════════════════════════╝
`);