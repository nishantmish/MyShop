import {SIGNUP, LOGIN, AUTHENTICATE,LOGOUT} from '../actions/auth';

const initalState = {
    token: null,
    userId: null
};

export default (state = initalState, action) => {
    switch (action.type) {
        // case SIGNUP:
        //     return{
        //         token: action.token,
        //         userId: action.userId
        //     };            
        //     break;

        case AUTHENTICATE:
            return{
                token: action.token,
                userId: action.userId
            };
            break;

        case LOGOUT:
            return initalState;
            break;

        default:
            return state;
            break;
    }
    return state;
};