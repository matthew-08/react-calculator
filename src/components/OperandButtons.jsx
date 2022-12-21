const OperandButtons = ({ handleOperand }) => {
    return (
        <div className="operand-container">
            <button onClick={(e) => { handleOperand(e.target.innerHTML) }}>+</button>
            <button onClick={(e) => { handleOperand(e.target.innerHTML) }}>-</button>
            <button onClick={(e) => { handleOperand(e.target.innerHTML) }}>x</button>
            <button onClick={(e) => { handleOperand(e.target.innerHTML) }}>÷</button>

        </div>
    )
}

export default OperandButtons