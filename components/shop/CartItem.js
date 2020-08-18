import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../../constants/color';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
    return (
        <View style={styles.cartItemStyle}>
            <Text style={styles.itemDataStyle}>
                <Text style={styles.quantityStyle}>{props.quantity}</Text>
                <Text style={styles.titleStyle}> {props.title}</Text>
            </Text>
            <View style={styles.itemDataStyle}>
                <Text style={styles.titleStyle}>${props.amount.toFixed(2)}</Text>
                { props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color="red" />
                </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItemStyle: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemDataStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantityStyle: {
        fontFamily: 'open-sans-regular',
        color: '#888',
        fontSize: 16
    },
    titleStyle: {
        fontSize: 16,
        fontFamily: 'open-sans-bold'

    },
    amountStyle: {

    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;