import React, { 
    useState, 
    useReducer,
    useEffect
 } from 'react';
import { 
    View, 
    TextInput,
    Text, 
    ScrollView, 
    StyleSheet, 
    KeyboardAvoidingView, 
    Button,
    ActivityIndicator,
    Alert
 } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/color';
import * as authActions from '../../store/actions/auth';
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


const AuthScreen = props => {
    const [error,setError] = useState();
    const [isLoading,setIsLoading] = useState(false);
    const [isSignup,setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer,{
        inputValues:{
            email: '',
            password: ''
        },
        inputValidities:{
            email:false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if(error){
            Alert.alert('An Error Occurred!',error,[{type: 'Okay'}]);
        }
    },[error]);

    const authHandler = async () => {
        let action;
        if(isSignup){
            action =
                 authActions.sigup(
                     formState.inputValues.email,
                     formState.inputValues.password);

        }else{
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password);
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (error) {
            setError(error.message);
            setIsLoading(false);   
        }
    };

    const inputChangeHandler = (inputIdentitifier,text) => {
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

    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}>
                <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}>
            <View style={styles.authContainer}>
                <ScrollView>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                    style={styles.input} 
                    value={formState.inputValues.email} 
                    onChangeText={inputChangeHandler.bind(this,'email')} 
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect
                    returnKeyType='next'
                    />
                    {!formState.inputValidities.title && <Text>Please enter a valid E-mail!</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                    secureTextEntry
                    style={styles.input} 
                    value={formState.inputValues.password} 
                    onChangeText={inputChangeHandler.bind(this,'password')} 
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect
                    returnKeyType='next'
                    />
                    {!formState.inputValidities.title && <Text>Please enter a Password!</Text>}
                </View>
                    <View style={styles.buttonContainer}>
                        {
                           isLoading ?    <ActivityIndicator size='small' color={Colors.primary} /> : <Button title={isSignup ? 'Sign Up' : 'Login'} color={Colors.primary}
                        onPress={authHandler}
                        />
                        }
                    </View>
                    <View style={styles.buttonContainer}>
                    <Button title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`} color={Colors.accent}
                        onPress={() => {
                            setIsSignup(prevState => !prevState);
                        }}
                        />
                    </View>
                </ScrollView>
            </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle:'Authenticate'
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center'
    },
    gradient:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    authContainer:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        width:'80%',
        maxWidth:400,
        maxHeight:400,
        padding:20
    },
    buttonContainer:{
        marginTop:10
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
});

export default AuthScreen;