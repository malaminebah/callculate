class Calculate {
    constructor() {
        this.currentValue = 0;
        this.previousValue = 0;
        this.operation = null;
    }
    add(value) {
        this.currentValue = value;
    }
    substract(value) {
        this.currentValue = value;
    }
    multiply(value) {
        this.currentValue = value;
    }
    division(value) {
        if (value === 0) {
            throw new Error("Division imposible par le choffre 0");
        }
        this.currentValue /= value;
    }
    setOperation(ope) {
        if (this.operation !== null) {
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.currentValue = 0;
        this.operation = ope;
    }
    getOperation() {
        return this.operation;
    }
    calculate() {
        switch (this.operation) {
            case '+':
                this.currentValue = this.previousValue + this.currentValue;
                break;
            case "-":
                this.currentValue = this.previousValue - this.currentValue;
                break;
            case "*":
                this.currentValue = this.previousValue * this.currentValue;
                break;
            case "/":
                if (this.currentValue === 0) {
                    throw new Error("division par zero impossible");
                }
                this.currentValue = this.previousValue / this.currentValue;
                break;
            default:
                throw new Error("Opération non valide");
        }
        this.operation = null;
        return this.currentValue;
    }
    reset() {
        this.currentValue = 0;
        this.previousValue = 0;
        this.operation = null;
    }
    getValue() {
        return this.currentValue;
    }
}
const calc = new Calculate();
const display = document.getElementById('display');
if (!display) {
    throw new Error("display est null");
}
function handleNumber(num) {
    display.value = display.value === "0" ? num : display.value + num;
}
function handleOperation(op) {
    if (display.value !== '') {
        calc.add(parseFloat(display.value));
    }
    calc.setOperation(op);
    display.value = "0";
}
function handleEqual() {
    if (calc.getOperation() !== null) {
        calc.add(parseFloat(display.value));
        display.value = calc.calculate().toString();
    }
}
function handleClear() {
    calc.reset();
    display.value = '0';
}
window.handleNumber = handleNumber;
window.handleOperation = handleOperation;
window.handleEqual = handleEqual;
window.handleClear = handleClear;
export {};
