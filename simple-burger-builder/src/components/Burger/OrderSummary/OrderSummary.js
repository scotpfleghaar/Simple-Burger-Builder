import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] => componentWillUpdate')
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(
            x => {
                return <li key={x}><span style={{textTransform: 'capitalize'}}>{x}</span>: {this.props.ingredients[x]}</li>
            }
        );
        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicius Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${this.props.price.toFixed(2)} </strong></p>
            <p>Continue to Checkout</p>
            <Button buttonType={'Danger'} clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button buttonType={'Success'} clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        );
    }
}

export default OrderSummary;