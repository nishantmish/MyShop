import React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform,SafeAreaView,Button, View } from 'react-native';
import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductsDetailScreen from '../screens/shop/ProductsDetailScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import CartScreen from '../screens/shop/CartScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/StartUpScreen';
import Colors from '../constants/color';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import * as authAction from '../store/actions/auth';


const defaultNavOptions = {
    headerStyle:{
        backgroundColor:Platform.OS === 'android' ? Colors.primary : Colors.primary
    },
    headerTitleStyle:{
        fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans-regular'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.titleColor   
};

//const ProductItem = props => {};

const ProductNavigator = createStackNavigator({
    ProductsOverView: ProductsOverViewScreen,
    ProductDetail: ProductsDetailScreen,
    Cart: CartScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart' }
        size={23}
        color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list' }
        size={23}
        color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavOptions
});


const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create' }
        size={23}
        color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
},{
    contentOptions:{
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch();

        return <View style={{flex:1,padding:20}}>
            <SafeAreaView forceInset={{top: 'always',horizontal:'never'}}>  
                <DrawerItems {...props} />
                <Button title="LogOut" color={Colors.primary}
                onPress={() => {
                    dispatch(authAction.logOut());
                    // props.navigation.navigate('Auth');
                }}/>
            </SafeAreaView>
        </View>
    }
});


const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
},{
    defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createSwitchNavigator({
    StartUp: StartUpScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
// export default createAppContainer(ShopNavigator);
// export default createAppContainer(ProductNavigator);