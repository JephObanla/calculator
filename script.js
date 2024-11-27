const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
}

function updateDisplay() {
    let display = document.querySelector(".screen")
    display.value = calculator.displayValue;
    // console.log(display)
}

const keys = document.querySelector(".keys")
keys.addEventListener('click', (event) => {
    let target = event.target

    if (!target.matches('input')) {
        return
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value)
        updateDisplay()
        return;
    }

    if (target.classList.contains('clear-screen')) {
        resetCalculator()
        updateDisplay()
        return
    }
    inputDigit(target.value)
    updateDisplay()
})
// When the display is zero the if statement runs,but if the display already has a digit,the next clicked digit will be concatenated to the first one in the display
function inputDigit(digit) {
    // if(calculator.displayValue == '0'){ 
    //     calculator.displayValue = digit
    // } else {
    //     calculator.displayValue += digit
    // }
    let displayValue = calculator.displayValue
    let waitingForSecondOperand = calculator.waitingForSecondOperand

    if (waitingForSecondOperand == true) {
        calculator.displayValue = digit
        calculator.waitingForSecondOperand = false
    } else {
        calculator.displayValue = calculator.displayValue == '0' ? digit : calculator.displayValue += digit  //for concatenation
    }
    console.log(calculator)
}
function resetCalculator() {
    calculator.displayValue = "0"
    calculator.firstOperand = "null"
    calculator.waitingForSecondOperand = false
    calculator.operator = null
}

// function resetCalc() {
//     resetCalculator()
//     updateDisplay()
//     const displayElement = document.getElementById("display");
//     displayElement.textContent = calculator.displayValue;
// }
function calculate(firstOperand, secondOperand, operator) {
    if (operator == '+') {
        return firstOperand + secondOperand
    } else if (operator == '-') {
        return firstOperand - secondOperand
    } else if (operator == 'x') {
        return firstOperand * secondOperand
    } else if (operator == '/') {
        return firstOperand / secondOperand
    }
}
function handleOperator(nextOperator) {
    const firstOperand = calculator.firstOperand
    const displayValue = calculator.displayValue
    const operator = calculator.operator
    const inputValue = parseFloat(displayValue)

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator
        return
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator)
        calculator.displayValue = `${parseFloat(result)}`
        calculator.firstOperand = result
    }
    calculator.waitingForSecondOperand = true
    calculator.operator = nextOperator
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand == true) {
        return
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot
    }
}

updateDisplay()


//