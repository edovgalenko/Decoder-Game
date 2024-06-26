const startGameButton = document.getElementById('newgame')
const enterButton = document.getElementById('enter')
const deleteButton = document.getElementById('del')
const logElement = document.getElementById('log')
const codeElement = document.getElementById('code')
const keyboardElement = document.getElementById('keyboard')

const game = (function() {
    function generateCode() {
        var digits = [];
        while (digits.length < 4) {
            var digit = Math.floor(Math.random() * 10);
            if (digits.indexOf(digit) === -1) {
                digits.push(digit);
            }
        }
        return digits.join('');
    }

    function compareCode(input, secretCode) {
        return input === secretCode;
    }

    return {
        generate: generateCode,
        compare: compareCode
    };
})();

enterButton.addEventListener("click", checkCode)
function checkCode () {
    let secretCode = game.secretCode;
    let inputCode = codeElement.value;

    let correctDigits = 0;
    let correctDigitsAndPosition = 0;

    for (let i = 0; i < secretCode.length; i++) {
        if (inputCode[i] === secretCode[i]) {
            correctDigitsAndPosition++;
        }
        if (secretCode.includes(inputCode[i])) {
            correctDigits++;
        }
    }

    inputCode === secretCode ? codeElement.classList.add("correct") : codeElement.classList.add("wrong")

    let logMessage = `
        <div class="log-message">
            <div>Trying: ${inputCode}</div>
                ${inputCode === secretCode ? `<div style="color:#ccffcc">Right code! You win!</div>` : `
                <div style="color:#ffcccc">Wrong code!</div>
                `}
                <div style="color:#ccccff">Right numbers: ${correctDigits}</div>
                <div style="color:#ccccff">In right position: ${correctDigitsAndPosition}</div>
        </div>
    `;

    logElement.innerHTML += logMessage;
}



startGameButton.addEventListener("click", startGame)
function startGame() {
    let secretCode = game.generate();
    logElement.innerHTML = `<p>A new secret code has been generated.<p>Try to guess it!`
    game.secretCode = secretCode; // Store the secret code in the game object
}

keyboardElement.addEventListener('click', function(event) {
    let target = event.target;
    if (target.classList.contains('key')) {
        addChar(target.textContent);
    }
});

deleteButton.addEventListener("click", deleteCode)
function deleteCode () {
    codeElement.value = ''
    codeElement.classList.remove(...codeElement.classList);
}

function addChar(x) {
    let currentValue = codeElement.value;
    if (currentValue.length < 4 && currentValue.indexOf(x) === -1) {
        codeElement.value += x;
    }
}