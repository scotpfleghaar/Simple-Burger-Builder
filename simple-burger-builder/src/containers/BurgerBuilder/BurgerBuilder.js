import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions/index'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-oreders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHander'

class BurgerBuilder extends Component {
    // constructor(props){     super(props)     this.state = {     } }
    state = {
        purchasing: false,
        // loading: false, error: false
    }
    updatePurchaseState(ingredients) {
        const sum = Object
            .keys(ingredients)
            .map(x => {
                return ingredients[x];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0

    }

    componentDidMount() {
        this
            .props
            .onInitIngredients();
    }

    // addIngredientHandler = (type) => {     const oldCount =
    // this.state.ingredients[type];     const updatedCount = oldCount + 1;
    // const updatedIngredients = {         ...this.state.ingredients     }
    // updatedIngredients[type] = updatedCount;     const priceAddition =
    // INGREDIENT_PRICES[type]     const oldPrice = this.state.totalPrice;     const
    // newPrice = oldPrice + priceAddition;     this.setState({totalPrice: newPrice,
    // ingredients: updatedIngredients})
    // this.updatePurchaseState(updatedIngredients) } removeIngredientHandler =
    // (type) => {     const oldCount = this.state.ingredients[type];     if
    // (oldCount <= 0) {         return     }     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {         ...this.state.ingredients     }
    // updatedIngredients[type] = updatedCount;     const priceDeduction =
    // INGREDIENT_PRICES[type]     const oldPrice = this.state.totalPrice;     const
    // newPrice = oldPrice - priceDeduction;     this.setState({totalPrice:
    // newPrice, ingredients: updatedIngredients})
    // this.updatePurchaseState(updatedIngredients) }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.props.onInitPurchase();
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue') this.setState({loading: true}) const order = {
        // ingredients: this.state.ingredients,     price: this.state.totalPrice,
        // customer: {         name: 'Scot',         address: {             street:
        // 'test',             zip: '12345',             country: "USA"         },
        // email: 'test@test.com'     },     deliveryMethod: 'fastest' } axios
        // .post('/orders.json', order)     .then(reponse => { console.log(reponse)
        // this.setState({loading: false, purchasing: false});     }) .catch(error => {
        //  console.error(error.message); this.setState({loading: false, purchasing:
        // false});     }); const queryParams = []; for (let i in
        // this.state.ingredients) {     queryParams.push(encodeURIComponent(i) + '=' +
        // encodeURIComponent(this.state.ingredients[i])); } queryParams.push('price=' +
        // this.state.totalPrice); const queryString = queryParams.join('&');

        this
            .props
            .history
            .push({
                pathname: '/checkout',
                // search: '?' + queryString
            });
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        console.log("HERE!", this.props.error);
        let burger = this.props.error
            ? <p>Ingredients Can't be loaded!</p>
            : <Spinner/>

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                price={this.props.price}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                ingredients={this.props.ings}/>
        }
        // if (this.state.loading) {     orderSummary = <Spinner/>; }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}</Modal>
                {burger}
            </Aux>
        );
    };
}

const mapStateToProps = state => {
    return {ings: state.burgerBuilder.ingredients, price: state.burgerBuilder.totalPrice, error: state.burgerBuilder.error}
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actionTypes.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actionTypes.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actionTypes.initIngredients()),
        onInitPurchase: () => dispatch(actionTypes.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));