import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-oreders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Name"
                },
                value: 'Scot'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Street"
                },
                value: 'Scot'
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Zipcode"
                },
                value: 'Scot'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Country"
                },
                value: 'Scot'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Your Email"
                },
                value: 'Scot'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                value: 'Scot'
            },
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
                <Input elementType="..." elementConfig="..." value="..."/>
                <Input inputtype='input' type="text" name="email" placeholder="Your email"/>
                <Input inputtype='input' type="text" name="street" placeholder="Your street"/>
                <Input
                    inputtype='input'
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