import * as actionTypes from './actionTypes';
import axios from '../../axios-oreders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {type: actionTypes.PURCHASE_BURGER_SUCCESS, orderId: id, orderData: orderData}
}

export const purchaseBurgerFail = (error) => {
    return {type: actionTypes.PURCHASE_BURGER_FAIL, error: error}
}

export const purchaseBurgerStart = () => {
    return {type: actionTypes.PURCHASE_BURGER_START}
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        purchaseBurgerStart();
        axios
            .post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {type: actionTypes.PURCHASE_INIT}
}

export const fetchOrdersSuccess = (order) => {
    return {type: actionTypes.FETCH_ORDERS_SUCCESS, orders: order}
}

export const fetchOrdersFail = (error) => {
    return {type: actionTypes.FETCH_ORDERS_FAILED, error: error}
}
export const fetchOrdersStart = () => {
    return {type: actionTypes.FETCH_ORDERS_START}
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios
            .get('/orders.json')
            .then(response => {
                const fetchOrders = []
                for (let key in response.data) {
                    fetchOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders));
                // this.setState({loading: false, orders: fetchOrders});
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
                // this.setState({loading: false});
            })
    }

}