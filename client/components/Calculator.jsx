import React from 'react'

import Screen from './Screen'
import Button from './Button'

const initialState = {
  screen: 0,
  calculator: '',
  isOperator: false,
  isTotal: false,
  operator: 'CA',
  number: 0
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)

    this.handleNumber = this.handleNumber.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
    this.handlePercent = this.handlePercent.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleEquals = this.handleEquals.bind(this)
    this.calcTotal = this.calcTotal.bind(this)
    this.checkInitialState = this.checkInitialState.bind(this)

    this.state = initialState
  }

  checkInitialState() {
    return this.state.operator === 'CA' || this.state.calculator.length === 0
  }

  calcTotal(str) {
    let total = parseFloat(eval(str))
    if (total > 9999999999 || total < -999999999) {
      total = total.toExponential(4)
    } else if (total.toString().length > 10) {
      const n = (total > 0) ? Math.floor(total) : Math.ceil(total)
      total = total.toFixed(9 - n.toString().length)
    }
    return total.toString()
  }

  handleNumber(e) {
    const newNumber = e.target.value
    this.setState(prevState => {
      let screen = ((prevState.isTotal || prevState.isOperator || !prevState.screen) ?
        newNumber :
        prevState.screen + newNumber)
      let calculator = prevState.isTotal ? newNumber : prevState.calculator + newNumber
      screen = (screen === '00' ? 0 : screen)
      calculator = (calculator === '00' ? 0 : calculator)
      return {
        screen: screen,
        calculator: calculator,
        isOperator: false,
        isTotal: false,
        operator: this.checkInitialState() ? '' : prevState.operator,
        number: screen
      }
    })
  }

  checkOperator(operator) {
    return (operator === '*' || operator === '/') 
  }

  handleOperator(e) {
    if (this.checkInitialState()) return
    const operator = e.target.value
    if (this.state.isOperator) {
      this.setState(prevState => {
        return {
          calculator: prevState.calculator.slice(0, -1)
        }
      })
    }
    this.setState(prevState => {
      return {
        calculator: (this.checkOperator(operator) ?
          this.calcTotal(prevState.calculator) + operator :
          prevState.calculator + operator),
        screen: this.calcTotal(prevState.calculator),
        isOperator: true,
        isTotal: false,
        number: prevState.number,
        operator: operator 
      }
    })
  }

  handlePercent(event) {
    if (this.checkInitialState() || this.state.isOperator) return
    this.setState(prevState => {
      const percent = this.calcTotal('(' + prevState.calculator + ')' + '/' + '100')
      return {
        calculator: percent,
        screen: percent,
        operator: '%',
        number: prevState.number
      } 
    })
  }

  handleCancel(event) {
    const regexCE = /[\d\.]+[\-\+*\/]?$/g
    this.setState(prevState => {
      return {
        screen: 0,
        calculator: prevState.calculator.replace(regexCE, u => ''),
        number: 0,
        isOperator: prevState.calculator.length > 0
      }
    })
    if (event.target.value === 'CA') {
      this.setState(initialState)
    }
  }

  handleEquals(event) {
    if (this.checkInitialState()) return
    const { calculator, isOperator, operator, number } = this.state
    if (isOperator || operator === '%') return
    if (this.state.isTotal) {
      const total = this.calcTotal(calculator + operator + number)
      return this.setState(prevState => {
        return {
          calculator: total,
          screen: total 
        }
      })
    }
    this.setState(prevState => {
      return {
        calculator: this.calcTotal(prevState.calculator),
        screen: this.calcTotal(prevState.calculator),
        isOperator: false,
        isTotal: true
      }
    })    
  }

  render() {
    return (
      <div className="calculator">
        <Screen type="small-display" value={this.state.calculator} />
        <Screen type="display" value={this.state.screen} />
        <div className="buttons">
          <Button label="CA" type="cancel" handleClick={this.handleCancel} />
          <Button label="CE" type="cancel" handleClick={this.handleCancel} />
          <Button label="%" type="percent" handleClick={this.handlePercent} />
          <Button label="/" type="operator" handleClick={this.handleOperator} />
          <Button label="7" type="number" handleClick={this.handleNumber} />
          <Button label="8" type="number" handleClick={this.handleNumber} />
          <Button label="9" type="number" handleClick={this.handleNumber} />
          <Button label="*" type="operator" handleClick={this.handleOperator} />
          <Button label="4" type="number" handleClick={this.handleNumber} />
          <Button label="5" type="number" handleClick={this.handleNumber} />
          <Button label="6" type="number" handleClick={this.handleNumber} />
          <Button label="-" type="operator" handleClick={this.handleOperator} />
          <Button label="1" type="number" handleClick={this.handleNumber} />
          <Button label="2" type="number" handleClick={this.handleNumber} />
          <Button label="3" type="number" handleClick={this.handleNumber} />
          <Button label="+" type="operator" handleClick={this.handleOperator} />
          <Button label="0" type="number zero" handleClick={this.handleNumber} />
          <Button label="." type="number" handleClick={this.handleNumber} />
          <Button label="=" type="equals" handleClick={this.handleEquals} />
        </div>
      </div>
    )
  }

}

export default Calculator
