let btn = document.querySelectorAll('.btn');
for (let i = 0; i < btn.length; i++) {
    let button = btn[i];
    button.addEventListener('click', checkValidInput);
}


function outputChecker(reg, userInput) {
    if (userInput == "") {
        alert("it's empty!");
    } else if (reg.test(userInput)) {
        alert("input type valid!");
    } else {
        alert("input type invalid!");
    }
}

function checkValidInput(event) {
    let e = event.target;
    let regularExpressionFormate;
    let switchCase = ["Email", "Phone Number(BD)", "Post Code(BD)", "Credit card number"];

    switch (e.textContent) {
        case switchCase[0]:
            regularExpressionFormate = /^([a-zA-Z0-9].?)+[^.]@([a-zA-Z0-9].?)+[^.]$/;
            break;
        case switchCase[1]:
            regularExpressionFormate = /^(\+)?(88)?01([0-9]){9}$/;
            break;
        case switchCase[2]:
            regularExpressionFormate = /^[0-9]{4}$/;
            break;
        case switchCase[3]:
            regularExpressionFormate = /^[0-9]{4} ?[0-9]{4} ?[0-9]{4} ?[0-9]{4}$/;
            break;
        default:
            alert("None of them selected!");
            break;
    }

    // console.log(regularExpressionFormate);
    let userInput = prompt("Please check your input validity:");
    outputChecker(regularExpressionFormate, userInput);
}