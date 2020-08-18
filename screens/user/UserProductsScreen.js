import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/color';
import * as ProductActions from '../../store/actions/products';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct',{productId: id});
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?','Do you really want to delete this item?',[
            {
                text: 'No',
                style: 'default'
            },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    dispatch(ProductActions.deleteProduct(id));
                }
            }
        ]);
    }

    if(userProducts.length === 0){
        return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>No Products Found, maybe start creating some?</Text>
        </View>
    }

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={
                itemData => <ProductItem
                imageUrl = {itemData.item.imageUrl}
                title = {itemData.item.title}
                price = {itemData.item.price}
                onSelect={() => {}}
                >
                        <Button 
                        color={Colors.primary} 
                        title="Edit" 
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }} />

                    <Button 
                        color={Colors.primary} 
                        title="Delete" 
                        onPress={() => {
                            deleteHandler.bind(this,itemData.item.id);
                            }
                        } />
                    </ProductItem>
            }/>
    );
};

UserProductsScreen.navigationOptions = navData => {
    return{
        headerTitle:'Your Product',
        headerLeft:(<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
            title='Menu' 
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>
        ),
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Add' iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => {
                navData.navigation.navigate('EditProduct');
            }}/>
        </HeaderButtons>
        )
    };
}

const styles = StyleSheet.create({

});

export default UserProductsScreen;