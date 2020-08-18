import React,{ useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../../constants/color';
import { Ionicons } from '@expo/vector-icons';
import CartItem from './CartItem';

const OrderItem = props => {
    const [showDetails,setShowDetails] = useState(false);

    return (
        <View style={styles.orderItemStyle}>
            <View style={styles.summryStyle}>
                <Text style={styles.totalAmountStyle}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.dateStyle}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title={showDetails ? 'Hide Details' : "Show Details"} onPress={() => {
                setShowDetails(prevState => !prevState);
            }}/>
            {showDetails && 
            <View style={styles.detailsItems}>
                {props.items.map(cartItem => 
                    <CartItem 
                        key={cartItem.productId}
                        quantity={cartItem.quantity} 
                        amount={cartItem.sum} 
                        title={cartItem.productTitle} 
                        />)}
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
 orderItemStyle:{
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin:20,
    padding:10,
    alignItems:'center'
 }, 
 summryStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    marginBottom:15
 },
 totalAmountStyle:{
    fontFamily:'open-sans-bold',
    fontSize:16,

 },
 dateStyle:{
    fontSize:16,
    fontFamily:'open-sans-regular',
    color:'#888'
 },
 detailsItems:{
     width:'100%'
 }
});

export default OrderItem;