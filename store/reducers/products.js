import PRODUCTS from '../../data/dummy-data';
import {DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS} from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: [],
     userProducts: []
    //userProducts: PRODUCTS
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return{
                availableProducts: action.products,
                userProducts:action.userProducts
            };
            break;
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.pid
                    ),
                    availableProducts: state.availableProducts.filter(
                        product => product.id !== action.pid
                        )
            };
            break;

        case CREATE_PRODUCT:
            const newProduct = new Product(
                // new Date().toString(),
                action.productData.id,
                action.productData.ownerId,
                action.productData.title,
                action.productData.description,
                action.productData.imageUrl,
                action.productData.price);
                return{
                    ...state,
                    availableProducts: state.availableProducts.concat(newProduct),   
                    userProducts: state.userProducts.concat(newProduct)
                };
            break;

        case UPDATE_PRODUCT:
                const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
                const updatedProduct = new Product(
                    action.pid,
                    state.userProducts[productIndex].ownerId,
                    action.productData.title,
                    action.productData.imageUrl,
                    action.productData.description,
                    state.userProducts[productIndex].price,
                );
                const upadtedUserProducts = [...state.userProducts];
                
                upadtedUserProducts[productIndex] = updatedProduct;
                
                const availableProductIndex = state.availableProducts.findIndex(
                    prod => prod.id === action.pid
                );

                const updatedAvailableProducts = [...state.availableProducts];
                updatedAvailableProducts[productIndex] = updatedProduct;

                return{
                    ...state,
                    availableProducts: updatedAvailableProducts,
                    userProducts: upadtedUserProducts
                }

            break;
            
    }
    return state;
}