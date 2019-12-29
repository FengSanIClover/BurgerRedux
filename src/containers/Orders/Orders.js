import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../withErrorHandler/WithErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {

                const fetchedOrders = [];

                for (let key in res.data) {
                    // console.log(key)
                    // console.log(...res.data[key])
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }

                this.setState({
                    orders: fetchedOrders,
                    loading: false
                })
                // console.log(res);
                // console.log(fetchedOrders)
            })
            .catch(err => {
                // console.log(err);
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        const order = this.state.orders.map(order => {
            return <Order
                key={order.id}
                price={+order.price}
                ingredients={order.ingredients} />
        })
        return (
            <div>
                {order}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);