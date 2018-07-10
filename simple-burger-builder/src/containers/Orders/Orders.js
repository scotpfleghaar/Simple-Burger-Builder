import React, {Component} from 'react'
import Order from './Order/Order'
import axios from '../../axios-oreders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHander'
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {

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

                this.setState({loading: false, orders: fetchOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render() {
        return (
            <div>
                <Order/>
                <Order/>
            </div>
        )
    }
}
export default withErrorHandler(Orders, axios);