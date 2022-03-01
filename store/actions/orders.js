import Order from "../../models/order"

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const responce = await fetch('https://rn-test-medyk-default-rtdb.firebaseio.com/orders/u1.json')

            if (!responce.ok) {
                throw new Error("Something goes wrong!")
            }

            const responceData = await responce.json();

            const loadedOrders = []

            for (const key in responceData) {
                loadedOrders.push(
                    new Order (
                        key,
                        responceData[key].cartItems,
                        responceData[key].totalAmount,
                        new Date(responceData[key].date)
                    )
                );
            }

            dispatch({ type: SET_ORDERS, orders: loadedOrders })
        } catch (err) {
            throw err;
        }
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date()
        const responce = await fetch('https://rn-test-medyk-default-rtdb.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        })

        if (!responce.ok) {
            throw new Error('Something went wrong')
        }

        const responceData = await responce.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: responceData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        });
    }
};