import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './Burgeringredient/BurgerIngredient';


const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(x => {
            return [...Array(props.ingredients[x])].map(((__, i) => {
                return <BurgerIngredient key={x + i} type={x}/>
            }));
        });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;