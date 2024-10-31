document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const preview = document.getElementById('preview');
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            handleInput(this.textContent);
        });
    });

    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        if (!isNaN(key) || key === '.') {
            handleInput(key);
        } else if (key === 'Enter' || key === '=') {
            handleInput('=');
        } else if (key === 'Backspace') {
            handleInput('⌫');
        } else if (key === 'Escape') {
            handleInput('DEL');
        } else if (['+', '-', '*', '/'].includes(key)) {
            handleInput(key.replace('*', '×').replace('/', '÷'));
        }
    });

    function adjustFontSize() {
        const maxFontSize = 2;
        const minFontSize = 1;
        const maxLength = 20;
    
        const currentLength = display.value.length;
        let fontSize = maxFontSize;
    
        if (currentLength > 12) {
            fontSize = maxFontSize - ((currentLength - 12) * (maxFontSize - minFontSize) / (maxLength - 12));
            fontSize = Math.max(minFontSize, fontSize); 
        }
    
        display.style.fontSize = `${fontSize}em`;
    }
    
    function handleInput(value) {
        if (value === '=') {
            try {
                const expression = display.value.replace('×', '*').replace('÷', '/').replace(/,/g, '.');
                
                if (expression.includes('/0')) {
                    preview.textContent = 'Tidak dapat dibagi dengan 0';
                    return; 
                }
                
                let result = eval(expression);
                if (isNaN(result) || !isFinite(result)) {
                    display.value = '';
                } else {
                    display.value = parseFloat(result.toFixed(12)).toString().replace('.', ',');
                }
                preview.textContent = '';
            } catch {
                display.value = '';
                preview.textContent = '';
            }
        } else if (value === 'DEL') {
            display.value = '';
            preview.textContent = '';
        } else if (value === '⌫') {
            display.value = display.value.slice(0, -1);
            updatePreview();
        } else {
            display.value += value;
            updatePreview();
        }
    }
    
    function updatePreview() {
        const expression = display.value.replace('×', '*').replace('÷', '/').replace(/,/g, '.');
        if (expression.includes('/0')) {
            preview.textContent = 'Tidak dapat dibagi dengan 0';
        } else {
            try {
                let result = eval(expression);
                if (!isNaN(result) && isFinite(result)) {
                    preview.textContent = parseFloat(result.toFixed(12)).toString().replace('.', ',');
                } else {
                    preview.textContent = '';
                }
            } catch {
                preview.textContent = '';
            }
        }
    }
});