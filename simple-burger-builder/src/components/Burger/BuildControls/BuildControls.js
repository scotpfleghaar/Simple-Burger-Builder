import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: {props.price}</p>
        { controls.map(crtl => (
            <BuildControl
                key={crtl.label}
                label={crtl.label}
                added={() => props.ingredientAdded(crtl.type)}
                remove={() => props.ingredientRemove(crtl.type)}
                disabled={props.disabled[crtl.type]}
                />
        )) }
    </div>
)

export default buildControls;