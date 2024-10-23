import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [firstOperand, setFirstOperand] = useState(null);
  const [secondOperand, setSecondOperand] = useState(false);
  const [currentOperator, setCurrentOperator] = useState(null);

  const appendNumber = (number) => {
      if (secondOperand) {
          setDisplay(number);
          setSecondOperand(false);
      } else {
          setDisplay(prev => prev + number);
      }
  };

  const appendDecimal = () => {
      if (!display.includes('.')) {
          setDisplay(prev => prev + '.');
      }
  };

  const chooseOperator = (operator) => {
      if (currentOperator && !secondOperand) {
          calculate();
      }
      setFirstOperand(parseFloat(display));
      setCurrentOperator(operator);
      setSecondOperand(true);
  };

  const clearDisplay = () => {
      setDisplay('');
      setFirstOperand(null);
      setCurrentOperator(null);
      setSecondOperand(false);
  };

  const deleteLast = () => {
      setDisplay(prev => prev.slice(0, -1));
  };

  const calculate = () => {
      const second = parseFloat(display);

      if (isNaN(firstOperand) || isNaN(second)) return;

      let result;
      switch (currentOperator) {
          case '+':
              result = firstOperand + second;
              break;
          case '-':
              result = firstOperand - second;
              break;
          case '*':
              result = firstOperand * second;
              break;
          case '/':
              result = second !== 0 ? firstOperand / second : 'Error';
              break;
          default:
              return;
      }

      setDisplay(result.toString());
      setFirstOperand(result); // Save the result as the first operand for further calculations
      setCurrentOperator(null);
      setSecondOperand(false);
  };

  return (
      <div className="box-calculator">
          <input type="text" className="display" value={display} disabled />
          <div className="buttons">
              <button onClick={() => appendNumber('7')}>7</button>
              <button onClick={() => appendNumber('8')}>8</button>
              <button onClick={() => appendNumber('9')}>9</button>
              <button onClick={() => chooseOperator('/')}>÷</button>
              <button onClick={() => appendNumber('4')}>4</button>
              <button onClick={() => appendNumber('5')}>5</button>
              <button onClick={() => appendNumber('6')}>6</button>
              <button onClick={() => chooseOperator('*')}>*</button>
              <button onClick={() => appendNumber('1')}>1</button>
              <button onClick={() => appendNumber('2')}>2</button>
              <button onClick={() => appendNumber('3')}>3</button>
              <button onClick={() => chooseOperator('-')}>-</button>
              <button onClick={() => appendNumber('0')}>0</button>
              <button onClick={appendDecimal}>.</button>
              <button onClick={() => chooseOperator('+')}>+</button>
              <button className="equals" onClick={calculate}>=</button>
              <button className="delete" onClick={deleteLast}>DEL</button>
              <button className="ce" onClick={() => setDisplay('')}>CE</button>
              <button className="c" onClick={clearDisplay}>C</button>
          </div>
      </div>
  );
};


export default Calculator;
