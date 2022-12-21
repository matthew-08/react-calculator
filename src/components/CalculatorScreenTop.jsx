import "./calc-screen.css"
const CalculatorScreenTop = ({ numberOne, numberTwo, operand, equalPressed, total, equalNumberOne, equalNumberTwo, equalOperand }) => {
    return (
        <div className="calc-screen-top-container">
            <span className="top-screen-output">
                {equalNumberOne && <span>{equalNumberOne} {equalOperand} {equalNumberTwo} = </span>}
                {!equalPressed && <span>{numberOne} {operand}</span>}
            </span>
        </div>
    )
}

export default CalculatorScreenTop