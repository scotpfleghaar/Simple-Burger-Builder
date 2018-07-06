import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(
            x => {
                return <li key={x}><span style={{textTransform: 'capitalize'}}>{x}</span>: {props.ingredients[x]}</li>
            }
        );

    // <li>Salad: 1</li>
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicius Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)} </strong></p>
            <p>Continue to Checkout</p>
            <Button buttonType={'Danger'} clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button buttonType={'Success'} clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;