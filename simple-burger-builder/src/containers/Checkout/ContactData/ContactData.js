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
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Street"
                },
                value: ''
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Zipcode"
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Country"
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Your Email"
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        }, {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                value: ''
            }
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
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({id: key, config: this.state.orderForm[key]})
        }

        let form = (
            <form action="">
                {formElements.map(formElement => {
                    return (<Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}/>);
                })}
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