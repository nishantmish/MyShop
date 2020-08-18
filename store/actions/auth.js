import { AsyncStorage } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
let timer;

export const authenticate = (userId,token,expirationTime) => {
    return dispatch => {
        dispatch(setLogOutTimer(expirationTime));
        dispatch({
            type:AUTHENTICATE,
            userId:userId,
            token:token
        });
    };
};

export const sigup = (email,password) => {
    return async dispatch => {
       const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgxBb9qXvhem4vQ-opNmE9fswa2C36kuc',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                password:password,
                returnSecureToken:true
            })
        }
        );

        if(!response.ok){
            //throw new Error('Something went wrong!!');
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong!!";
            if(errorId === 'EMAIL_EXISTS'){
                message = 'This email exists already!!';
            }else if(errorId === 'OPERATION_NOT_ALLOWED' ){
                message = 'This password is not valid!!';
            }else if(errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER' ){

            }
            throw new Error(message);
            console.log(errorResData);
        }
        const resData = await response.json();
        console.log(resData);

        // dispatch({
        //     type:SIGNUP,
        //     token: resData.idToken,
        //     userId: resData.localId
        // });
        dispatch(authenticate(resData.localId,resData.idToken,parseInt(resData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
    };
};



export const login = (email,password) => {
    return async dispatch => {
       const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgxBb9qXvhem4vQ-opNmE9fswa2C36kuc',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                password:password,
                returnSecureToken:true
            })
        }
        );

        if(!response.ok){
            // throw new Error('Something went wrong!!');
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong!!";
            if(errorId === 'EMAIL_NOT_FOUND'){
                message = 'This email could not be found!!';
            }else if(errorId === 'INVALID_PASSWORD' ){
                message = 'This password is not valid!!';
            }else if(errorId === 'USER_DISABLED' ){

            }
            throw new Error(message);
            console.log(errorResData);
        }
        const resData = await response.json();
        console.log(resData);

        // dispatch({
        //     type:LOGIN,
        //     token: resData.idToken,
        //     userId: resData.localId
        // });
        dispatch(authenticate(resData.localId,resData.idToken,parseInt(resData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
    };
};

export const logOut = () => {
    clearLogOutTimer();
    AsyncStorage.removeItem('userData');
    return{
        type:LOGOUT
    }
};
const clearLogOutTimer = () => {
    if(timer){
        clearTimeout(timer);
    }
};
const setLogOutTimer = expirationTime => {
    return dispatch => {
       timer = setTimeout(() => {
            dispatch(logOut());
        // },expirationTime / 1000);
    },expirationTime);
    };
};


const saveDataToStorage = (token,userId,expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }));
}