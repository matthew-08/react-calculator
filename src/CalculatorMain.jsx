import './calc-main.css'
import CalculatorScreen from './components/CalculatorScreen';
import CalculatorScreenTop from './components/CalculatorScreenTop'
import Buttons from "./components/Buttons"
import OperandButtons from './components/OperandButtons';
import { useState } from 'react';
import { useEffect } from 'react';

const initialState = {
    numberOne: null,
    numberTwo: null,
    operand: null,
    savedOperand: null,
}

function CalculatorMain() {
    const [numberInput, storeNumberInput] = useState([])
    const [storeNumber, setStoreNumber] = useState([initialState])
    const [tempTotal, setTempTotal] = useState(false)
    const [equalPressed, setEqualPressed] = useState(false)
    const [equalValues, setEqualValues] = useState({})

    const handleNumberInput = (value) => {
        storeNumberInput([...numberInput, value])
    }

    function sendTempTotal() {
        setTempTotal(true)
    }

    const handleCalculation = (passedOperand) => {
        let operandToPass
        if (storeNumber[0].savedOperand === "=") {
            setEqualPressed(true)
        }
        const total = getTotal(storeNumber[0].operand, storeNumber[0].numberOne, storeNumber[0].numberTwo)
        sendTempTotal()
        setStoreNumber(storeNumber.map((obj) => {
            obj.numberOne = total
            obj.numberTwo = null
            obj.operand = obj.savedOperand
            obj.savedOperand = null
            return { ...obj }
        }
        )
        )
    }

    const handleEquals = () => {
        if (equalValues.numberOne) {
            return
        }
        const currentValue = parseInt(numberInput.join(''))
        const numberOne = storeNumber[0].numberOne
        const numberTwo = storeNumber[0].numberTwo
        const operand = storeNumber[0].operand
        setEqualValues({
            ...equalValues,
            numberOne: numberOne,
            numberTwo: currentValue,
            operand: operand,
            total: getTotal(operand, numberOne, currentValue)
        })
        if (!storeNumber[0].operand) {
            return console.log("error")
        } else if (storeNumber[0].numberOne) {
            setStoreNumber(storeNumber.map((obj) => {
                obj.numberOne = null
                obj.numberTwo = null
                obj.operand = null
                obj.savedOperand = null
                return { ...obj }
            }))
        }
    }

    useEffect(() => {
        console.log(equalValues)
    }, [equalValues])

    const clearEqualValues = () => {
        setEqualValues((current) => {
            console.log(current);
            const copy = { ...current }
            delete copy.numberOne
            delete copy.numberTwo
            delete copy.operand
            delete copy.total
            return copy
        })
    }

    const handleSetNumberOne = () => {
        return equalValues.total

    }

    const handleOperand = (passedOperand) => {
        let equalTotal
        if (passedOperand === "=") {
            return handleEquals()
        } else {
            if (equalValues.numberOne) {
                equalTotal = handleSetNumberOne()
                clearEqualValues()
            }
            const currentValue = parseInt(numberInput.join(''))
            setStoreNumber(
                storeNumber.map((obj) => {
                    if (equalTotal) {
                        obj.numberOne = equalTotal
                        obj.operand = passedOperand
                        return { ...obj }
                    }
                    if (!numberInput.length) {
                        return { ...obj, operand: passedOperand }
                    } else {
                        if (obj.numberOne === null) {
                            obj.numberOne = currentValue
                        } else obj.numberTwo = currentValue
                        if (obj.operand == null) {
                            obj.operand = passedOperand
                        } else obj.savedOperand = passedOperand
                        return { ...obj }
                    }
                })
            )
        }
        //clear current number
        storeNumberInput(numberInput.filter(num => num !== num))
    }

    const clearAll = () => {
        setStoreNumber((storeNumber.map(obj => {
            return {
                ...obj,
                numberOne: null,
                numberTwo: null,
                operand: null,
                savedOperand: null,
            }
        })))
        storeNumberInput(numberInput.filter(num => num !== num))
        setTempTotal(false)
        clearEqualValues()
    }

    useEffect(() => {
        if (storeNumber[0].equalTotal) {
            setEqualPressed(true)
        }
        if (storeNumber[0].numberOne !== null && storeNumber[0].numberTwo !== null) {
            console.log(storeNumber)
            handleCalculation()
        }
        if (storeNumber[0].operand === "=") {

        }
        console.log(storeNumber);
    }, [storeNumber])

    return (
        <div className="calculator-container">
            <div className="calc-screen-wrapper">
                <CalculatorScreenTop
                    numberOne={storeNumber[0].numberOne}
                    operand={storeNumber[0].operand}
                    numberTwo={storeNumber[0].numberTwo}
                    equalNumberOne={null || equalValues.numberOne}
                    equalNumberTwo={null || equalValues.numberTwo}
                    equalOperand={null || equalValues.operand}
                    total={null || equalValues.total}
                />
                <CalculatorScreen
                    numberOutput={numberInput}
                    tempTotal={tempTotal}
                    numberOne={storeNumber[0].numberOne}
                    tempEqual={null || equalValues.total}
                />
            </div>
            <div className="buttons-container">
                <div className="operand-container">
                    <OperandButtons
                        handleOperand={handleOperand}
                    ></OperandButtons>
                </div>
                <Buttons
                    setTempTotal={setTempTotal}
                    storeNumberInput={handleNumberInput}
                    clearAll={clearAll}
                    handleOperand={handleOperand}
                />
            </div>
        </div>
    );
}

function getTotal(operand, n1, n2, equal) {
    let total
    switch (operand) {
        case "+":
            total = operations.add(n1, n2)
            break;
        case "-":
            total = operations.subtract(n1, n2)
            break;
        case "x":
            total = operations.multiply(n1, n2)
            break;
        case "÷":
            total = operations.divide(n1, n2)
            break;
    }
    return total
}

const operations = {
    add(n, n2) {
        return n + n2
    },
    subtract(n, n2) {
        return n - n2
    },
    divide(n, n2) {
        return n / n2
    },
    multiply(n, n2) {
        return n * n2
    },

}

export default CalculatorMain;
