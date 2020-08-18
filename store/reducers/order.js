import { ADD_ORDER, SET_ORDERS } from '../actions/order';
import Order from '../../models/order';

const initalState = {
    orders: []
};

export default (state = initalState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                // new Date().toString(), 
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };
            break;

        case SET_ORDERS:
            return {
                orders: action.orders
            };
            break;

        default:
            break;
    }
    return state;
};
