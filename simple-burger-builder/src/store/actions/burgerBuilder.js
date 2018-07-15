import * as actionTypes from './actionTypes';
import axios from '../../axios-oreders'

export const addIngredient = (name) => {
    return {type: actionTypes.ADD_INGREDIENT, ingredientName: name}
}

export const removeIngredient = (name) => {
    return {type: actionTypes.REMOVE_INGREDIENT, ingredientName: name}
}

const setIngredients = (ingredients) => {
    return {type: actionTypes.SET_INGREDIENTS, ingredients: ingredients}
}

const fetchIngredientFaild = () => {
    return {type: actionTypes.FETCH_INGREDIENTS_FAILD}
}

export const initIngredients = () => {
    return dispatch => {
        axios
            .get('https://burgerapp-6122a.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response.data)
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientFaild());
            })
    }
}