import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ShopNavigator from './navigation/ShopNavigator';
import NavigationContainer from './navigation/NavigationContainer';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { composeWithDevTools } from 'redux-devtools-extension';
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer
});
// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFonts = () =>{
  return Font.loadAsync({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
};

export default function App() {
  const [fontLoaded,setFontLoaded] = useState(false);
  if(!fontLoaded){
    <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => {
        setFontLoaded(true);
      }}
    />
  }
  return (
    <Provider store={store}>
        <ShopNavigator/>
        {/* <NavigationContainer /> */}
    </Provider>
  );
}

const styles = StyleSheet.create({

});
