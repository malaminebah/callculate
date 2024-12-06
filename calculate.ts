export {};

declare global {
    interface Window {
        handleNumber: (num: string) => void;
        handleOperation: (op: string) => void;
        handleEqual: () => void;
        handleClear: () => void;
    }
}
 class Calculate {
    private currentValue = 0;
    private previousValue = 0;
    private operation : string | null = null;

    add(value : number): void {
        this.currentValue = value
    }
    substract(value : number): void{
        this.currentValue = value
    }
    multiply(value: number): void {
        this.currentValue = value
    }
    division(value : number): void{
        if(value === 0){
            throw new Error("Division imposible par le choffre 0")
        }
        this.currentValue /= value
    }
    setOperation(ope : string): void {
        if(this.operation !== null){
            this.calculate()
        }
        this.previousValue = this.currentValue
        this.currentValue = 0;
        this.operation = ope
    }
    getOperation(): string | null{
        return this.operation
    }

    calculate( ) : number{
        switch (this.operation) {
            case '+':
                this.currentValue =  this.previousValue + this.currentValue 
                break;
                case "-":
                    this.currentValue = this.previousValue - this.currentValue
                    break;
                case "*":
                    this.currentValue = this.previousValue * this.currentValue
                    break;
                case "/":
                if(this.currentValue === 0){
                    throw new Error("division par zero impossible")
                }
                this.currentValue = this.previousValue / this.currentValue    
                break;
            default:
                throw new Error("Opération non valide")
        }
        this.operation = null;
        return this.currentValue
    }
    reset(): void {
        this.currentValue = 0;
        this.previousValue = 0;
        this.operation = null;
    }
    getValue(): number{
        return this.currentValue
    }
}
const calc = new Calculate();
const display = document.getElementById('display') as HTMLInputElement

if(!display){
    throw new Error("display est null")
}


function handleNumber(num : string): void{
    display.value = display.value === "0" ? num : display.value +num;
}

function handleOperation(op: string){
    if(display.value !== ''){

        calc.add(parseFloat(display.value))
    }
 calc.setOperation(op);
 display.value = "0"
}
function handleEqual(){
    if(calc.getOperation() !== null){

        calc.add(parseFloat(display.value));
        display.value = calc.calculate().toString();
    }

}
function handleClear(){
    calc.reset();
    display.value= '0'
}
window.handleNumber = handleNumber;
window.handleOperation = handleOperation;
window.handleEqual = handleEqual;
window.handleClear = handleClear;
