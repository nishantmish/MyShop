import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView,Platform,Alert, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products';
import { set } from 'react-native-reanimated';
import Colors from '../../constants/color';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state,action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input] : action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedformIsValid = true;
        for(const key in updatedValidities){
            updatedformIsValid = updatedformIsValid && updatedValidities[key];
        }
        return{
            formIsValid: updatedformIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};


const EditProductScreen = props => {
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState();


    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));
    
    const dispatch = useDispatch();
   const [formState, dispatchFormState] = useReducer(formReducer,{
        inputValues:{
            title: editedProduct ? editedProduct.title : '',
            imageUrl:editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price:''
        },
        inputValidities:{
            title:editedProduct ? true : false,
            imageUrl:editedProduct ? true : false,
            description:editedProduct ? true : false,
            price:editedProduct ? true : false
        },
        formIsValid:editedProduct ? true : false
    });

    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    // const [titleIsValid, setTitleIsValid] = useState(false);
    // const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    // const [price, setPrice] = useState(editedProduct ? editedProduct.price : '');
    // const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
    useEffect(() => {
        if(error){
            console.log(error);
            Alert.alert('An error occurred',error,[{
                type:'Okay'
            }])
        }
    },[error]);

    const submitHandler = useCallback(async () => {
        
        if(!formState.formIsValid){
            Alert.alert('Wrong input!','Please check the errors in the form.',[
                {text: 'Okay'}
            ]);
            return;
        }

        setError(null);
        setIsLoading(true);
        try {

            if(editedProduct){
                await dispatch(
                     productActions.updateProduct(
                         prodId,
                         formState.inputValues.title,
                         formState.inputValues.description,
                         formState.inputValues.imageUrl));
             }else{
                await dispatch(
                     productActions.createProduct(
                         formState.inputValues.title,
                         formState.inputValues.description,
                         formState.inputValues.imageUrl,
                         +formState.inputValues.price)
                 );
             }
             props.navigation.goBack();
        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);

    },[dispatch,prodId,formState]);
    
    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        });
    },[submitHandler]);

    const textChangeHandler = (inputIdentitifier,text) => {
        let isValid = false;
        if(text.trim().length > 0){
            isValid=true;
            //setTitleIsValid(false);
        }else{
            //setTitleIsValid(true);
        }
       // setTitle(text);
       dispatchFormState({
           type: FORM_INPUT_UPDATE,
           value:text,
           isValid: isValid,
           input:inputIdentitifier
       });
    };

    if(isLoading){
        return <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
    </View>
    }

    return (
        <ScrollView>
            <View style={styles.form}>

                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                    style={styles.input} 
                    value={formState.inputValues.title} 
                    onChangeText={textChangeHandler.bind(this,'title')} 
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect
                    returnKeyType='next'
                    onEndEditing={() => {console.log('onEdndEditing');}}
                    onSubmitEditing={() => {console.log('onSubmitEditing');}}
                    />
                    {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.label}>Image</Text>
                    <TextInput style={styles.input} value={formState.inputValues.imageUrl} onChangeText={textChangeHandler.bind(this,'imageUrl')} />
                </View>
                {editedProduct ? null : 
                <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                    style={styles.input} 
                    value={formState.inputValues.price} 
                    onChangeText={textChangeHandler.bind(this,'price')} 
                    keyboardType = 'decimal-pad'
                    />
                </View>
                }
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={formState.inputValues.description} onChangeText={textChangeHandler.bind(this,'description')} />
                </View>

            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const subitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Save' iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={subitFn} />
        </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    centered:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    }
});

export default EditProductScreen;