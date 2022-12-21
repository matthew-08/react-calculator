import { useEffect } from "react"
const Buttons = ({ storeNumberInput, setTempTotal, clearAll, handleOperand }) => {

    const handleInput = (input) => {
        storeNumberInput(input)
        setTempTotal(false)
    }


    const numbersArray = []



    for (let i = 1; i <= 9; i++) {
        numbersArray.push(<button value={i} onClick={(e) => { handleInput(e.target.value) }}>{i}</button>)
    }


    return (
        <div className="calc-mid-container">
            <div className="numbers">{numbersArray}
                <button>.</button>
                <button value={0} onClick={e => handleInput(e.target.value)}>0</button>
                <button onClick={(e) => clearAll(e)}>AC</button>
            </div>
            <div className="equal">
                <button onClick={(e) => { handleOperand(e.target.innerHTML) }}>=</button>
            </div>
        </div>
    )
}

export default Buttons