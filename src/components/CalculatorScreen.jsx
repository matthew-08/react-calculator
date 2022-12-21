import "./calc-screen.css"

const CalculatorScreen = ({ numberOutput, tempTotal, numberOne, tempEqual }) => {
    console.log(tempEqual)
    return (
        <div className="calc-screen-container">

            <span className="number-output">{tempEqual ? tempEqual : tempTotal ? numberOne : numberOutput}</span>
        </div>
    )
}

export default CalculatorScreen