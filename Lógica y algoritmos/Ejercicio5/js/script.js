const textInput = document.getElementById('textInput');
const findBtn = document.getElementById('findBtn');
const resultSection = document.querySelector('.result-section');
const resultDiv = document.getElementById('result');

function slidingWindowToFindLongestWord(arr) {
    
    if (arr.length === 0) {
        return { largeWord: "No hay palabras en el texto" };
    }
    
    if (arr.length === 1) {
        return { largeWord: arr[0] };
    }
    
    if (arr.length === 2) {
        let longest = arr[0].length >= arr[1].length ? arr[0] : arr[1];
        return { largeWord: longest };
    }
    
    let word = arr[0];  
    let first = 0;
    let second = 1;
    let third = 2;
    
    
    while (third < arr.length) {
        if (arr[first].length > word.length) {
            word = arr[first];
        }
        if (arr[second].length > word.length) {
            word = arr[second];
        }
        if (arr[third].length > word.length) {
            word = arr[third];
        }
        
        first++;
        second++;
        third++;
    }
    
    return { largeWord: word };
}

function cleanText(text) {
    let cleanedText = text.replace(/[.,!?;:()"'-]/g, ' ');
    let words = cleanedText.split(/\s+/);
    words = words.filter(word => word.length > 0);
    return words;
}

function findLongestWord() {
    const text = textInput.value.trim();
    
    if (text === "") {
        resultDiv.innerHTML = '<span class="placeholder">Por favor, ingresa algún texto para buscar</span>';
        resultSection.style.display = "block";
        return;
    }
    
    const wordsArray = cleanText(text);
    
    if (wordsArray.length === 0) {
        resultDiv.innerHTML = '<span class="placeholder">No se encontraron palabras válidas en el texto</span>';
        resultSection.style.display = "block";
        return;
    }
    
    const result = slidingWindowToFindLongestWord(wordsArray);
    
    resultDiv.innerHTML = `
        <strong>Palabra más larga:</strong> "${result.largeWord}"<br>
        <strong>Longitud:</strong> ${result.largeWord.length} caracteres<br>
    `;
    
    resultSection.style.display = "block";
}

findBtn.addEventListener('click', findLongestWord);

textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        findLongestWord();
    }
});

