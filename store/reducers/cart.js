import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import {ADD_ORDER} from '../actions/order';
import CartItem from '../../models/cart-item';
import {DELETE_PRODUCT} from '../actions/products';
const initalState = {
    items: {},
    totalAmount: 0
};

export default (state = initalState, action) =>{
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

                let updatedOrNewCartItem;
                let countItem = Object.keys(state.items).length;
            if(state.items[addedProduct.id] === undefined && countItem > 0){
                var lastKey = Object.keys(state.items).sort().reverse()[0];
                //already have the item in the cart
                updatedOrNewCartItem = new CartItem(
                    // state.items[addedProduct.id].quantity + 1,
                    countItem + 1,
                    prodPrice,
                    prodTitle,
                    // state.items[addedProduct.id].sum + prodPrice
                    state.items[lastKey].sum + prodPrice
                );
            }else{
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }
            return {
                ...state,
                items:{ ...state.items, [addedProduct.id]: updatedOrNewCartItem},
                totalAmount: state.totalAmount + prodPrice
            };
            break;

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            const currentQty = selectedCartItem.quantity;
            let updateCartItems;
            if(currentQty > 1){
                //need to reduce it, not erase it 
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1, 
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice);
                    updateCartItems = {...state.items,[action.pid]: updateCartItems};

            }else{
                updateCartItems = { ...state.items },
                delete updateCartItems[action.pid];
            }
            return{
                ...state,
                items:updateCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            };
            break;
        case ADD_ORDER:
            return initalState;
            break;
        case DELETE_PRODUCT:
            if(!state.items[action.pid]){
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal = state.items[actions.pid].sum;
            delete updatedItems[action.pid];
            return{
                ...state,
                items: updatedItems,
                totalAmount:state.totalAmount - itemTotal
            }
            break;
            
        default:
            break;
    }
    return state;
};