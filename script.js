document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const translateToBrailleBtn = document.getElementById('translateToBrailleBtn');
    const translateToTextBtn = document.getElementById('translateToTextBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const fontSizeInput = document.getElementById('fontSize');
    const darkModeBtn = document.getElementById('darkModeBtn');

    translateToBrailleBtn.addEventListener('click', () => translate(toBraille));
    translateToTextBtn.addEventListener('click', () => translate(toText));
    clearBtn.addEventListener('click', clearAll);
    copyBtn.addEventListener('click', copyToClipboard);
    fontSizeInput.addEventListener('change', changeFontSize);
    darkModeBtn.addEventListener('click', toggleDarkMode);

    function translate(translationFn) {
        output.textContent = translationFn(input.value);
    }

    function toBraille(text) {
        return text.toLowerCase().split('').map(char => brailleMap[char] || char).join('');
    }

    function toText(braille) {
        return braille.split('').map(char => reverseBrailleMap[char] || char).join('');
    }

    function clearAll() {
        input.value = '';
        output.textContent = '';
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(output.textContent)
            .then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => copyBtn.textContent = 'Copy to Clipboard', 2000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    }

    function changeFontSize() {
        output.style.fontSize = `${fontSizeInput.value}px`;
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        darkModeBtn.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        
        const heading = document.querySelector('h1');
        heading.style.color = isDarkMode ? '#ecf0f1' : '#2c3e50';
    }
});