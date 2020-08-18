import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button,ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/color';
import CartItem from '../../components/shop/CartItem'; 
import * as cartActions from '../../store/actions/cart';
import * as ordersAction from '../../store/actions/order';


const CartScreen = props => {
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState();

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformCartItems = [];
        for(const key in state.cart.items){ 
            transformCartItems.push({
                productId:key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformCartItems.sort((a,b) => 
            a.productId > b.productId ? 1 : -1
        );
    });


    const dispatch = useDispatch();
    
    const sendOrderHandler = async () => {
        setIsLoading(true);
       await dispatch(ordersAction.addOrder(cartItems,cartTotalAmount));
       setIsLoading(false);
        props.navigation.navigate('Orders');

    };
    // if(isLoading){
    //     return <View style={styles.centered}>
    //         <ActivityIndicator size='large' color={Colors.primary} />
    //     </View>
    // }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '} <Text style={styles.summaryAmount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ?  <ActivityIndicator size='small' color={Colors.primary} /> : 
                                <Button 
                                color={Colors.accent} title="Oder Now" 
                                disabled={cartItems.length === 0}
                                onPress={sendOrderHandler}
                            />
                }
            </View>
            <View>
                <FlatList 
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={itemData => <CartItem 
                        quantity={itemData.item.quantity}
                        productTitle={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                    /> }
                />
            </View>
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle:'Your Cart'
};

const styles = StyleSheet.create({
    screen:{
        margin:20
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18
    },
    summaryAmount:{
        color:Colors.primary
    },
    centered:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    }
});

export default CartScreen;