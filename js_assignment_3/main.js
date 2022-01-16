const randNumber = Math.ceil(Math.random() * 10)
console.log(randNumber)

let chanceRemaining = 3
document.getElementById('remaining').innerText = `Your Chance Remaining: ${chanceRemaining}`;

document.querySelector('#get_btn').addEventListener('click', guessNumber);

function guessNumber() {
    let toast_modal = document.querySelector('.toast');
    let outputText = document.querySelector('#modalMSG');
    let userNumber = parseInt(document.querySelector('#get_number').value);

    chanceRemaining -= 1;
    document.getElementById('remaining').innerText = `Your Chance Remaining: ${chanceRemaining}`;
    if (chanceRemaining == 0) {
        if (userNumber === randNumber) {
            document.querySelector('#get_number').value = '';
            outputText.innerText = 'You Win The Game!'
            toast_modal.style.display = 'flex';
            document.querySelector('#get_btn').disabled = true;
        } else {
            document.querySelector('#get_number').value = '';
            outputText.innerText = `You Loss, The number was ${randNumber}. Game Over!`;
            toast_modal.style.display = 'flex';
            document.querySelector('#get_number').disabled = true;
            document.querySelector('#get_btn').disabled = true;
            document.getElementById('remaining').innerText = `Your Chance Remaining: ${chanceRemaining}`;
        }
    } else {
        gameNumberChecker(toast_modal, outputText, userNumber, randNumber);
    }

}

document.querySelector('.btn-close').addEventListener('click', closeModal);

function closeModal() {
    let toast = document.querySelector('.toast');
    toast.style.display = 'none';
}

function gameNumberChecker(toast_modal, outputText, userNumber) {
    if (userNumber <= 0 || userNumber > 10 || isNaN(userNumber)) {
        document.querySelector('#get_number').value = '';
        outputText.innerText = 'You entered wrong input!'
        toast_modal.style.display = 'flex';
    } else {
        if (userNumber > randNumber) {
            document.querySelector('#get_number').value = '';
            outputText.innerText = 'You entered higher number!'
            toast_modal.style.display = 'flex';
        } else if (userNumber < randNumber) {
            document.querySelector('#get_number').value = '';
            outputText.innerText = 'You entered lower number!'
            toast_modal.style.display = 'flex';
        } else if (userNumber === randNumber) {
            document.querySelector('#get_number').value = '';
            outputText.innerText = 'You Win The Game!'
            toast_modal.style.display = 'flex';
            document.querySelector('#get_btn').disabled = true;
        }
    }
}