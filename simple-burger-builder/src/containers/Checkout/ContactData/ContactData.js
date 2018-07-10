import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-oreders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.price,
            customer: {
                name: 'Scot',
                address: {
                    street: 'test',
                    zip: '12345',
                    country: "USA"
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios
            .post('/orders.json', order)
            .then(reponse => {
                console.log(reponse)
                this.setState({loading: false});
                this
                    .props
                    .history
                    .push('/')
            })
            .catch(error => {
                console.error(error.message);
                this.setState({loading: false});
            });
    }

    render() {

        let form = (
            <form action="">
                <input
                    className={classes.Input}
                    type="text"
                    name="name"
                    placeholder="Your Name"/>
                <input
                    className={classes.Input}
                    type="text"
                    name="email"
                    placeholder="Your email"/>
                <input
                    className={classes.Input}
                    type="text"
                    name="street"
                    placeholder="Your street"/>
                <input
                    className={classes.Input}
                    type="text"
                    name="postalcode"
                    placeholder="Your Postal Code"/>
                <Button clicked={this.orderHandler} buttonType="Success">ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;