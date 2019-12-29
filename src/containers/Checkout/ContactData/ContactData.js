import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

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
        // console.log(this.props.ingredients);
        console.log(this.props);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: Number.parseFloat(this.props.totalPrice).toFixed(2),
            customer: {
                name: 'Clover',
                address: {
                    street: 'street',
                    zipCode: '12345',
                    country: 'country'
                },
                email: '123@123'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(res => {
                // console.log(res)
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch(err => {
                // console.log(err)
                this.setState({ loading: false });
            });

    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="Your PostalCode" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {
                    form
                }
            </div>
        );
    }
}

export default ContactData;