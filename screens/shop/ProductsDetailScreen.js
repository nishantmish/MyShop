import React from 'react';
import { View, Text, StyleSheet, Butto, Image, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { } from 'redux';

import Colors from '../../constants/color';
import * as CartActions from '../../store/actions/cart';


const ProductsDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
    const dispatch = useDispatch();
    return(
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.actionBtn}>
            <Button color={Colors.primary} title="Add to Cart" onPress={() => {
                dispatch(CartActions.addToCart(selectedProduct));
            }}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductsDetailScreen.navigationOptions = navData =>{
    return{
        headerTitle: navData.navigation.getParam('productTitle')
    };
}
const styles = StyleSheet.create({
    price: {
        fontFamily:'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign:'center',
        marginVertical:20
    },
    description:{
        fontFamily:'open-sans-regular',
        textAlign:'center',
        fontSize:15,
        marginHorizontal:20
    },
    image: {
        width: '100%',
        height: 300
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    actionBtn:{
        marginVertical:10,
        alignItems: 'center',
    }
});

export default ProductsDetailScreen;