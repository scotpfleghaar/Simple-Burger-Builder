import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const intitialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    }
    const updatedIngrediens = updateObject(state.ingredients, updatedIng)
    const updatedSt = {
        ingredients: updatedIngrediens,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedSt);
}
const setIngredient = (state, action) => {
    return updateObject(state, {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    })
}

const fetchIngredientsFaild = (state, action) => {
    return updateObject(state, {error: true})
}

const reducer = (state = intitialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILD:
            return fetchIngredientsFaild(state, action);
        default:
            return state;
    }

}

export default reducer;