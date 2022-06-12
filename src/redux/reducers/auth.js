
import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    isAuthenticated : false ,
    access_token : '' ,
    user_id : '',
    userdata : {},
    error: {},
    message : "IDLE" ,
}

export default ( state={INITIAL_STATE} , action={} ) => {
    switch(action.type) {
        case (ActionTypes.SignInUser):
            console.log(action.payload.data.user._id);
            return ({
                ...state,
                access_token: action.payload.token,
                isAuthenticated: true,
                user_id: action.payload.data.user._id,
                userdata : action.payload.data.user,
            });
        
        case ActionTypes.SigninUserError:
            return ({
                ...state,
                error: action.payload
            });
        
        case (ActionTypes.ChangePassword):
            return ({
                ...state,
                message : "SUCCESS"
            });
        
        case ActionTypes.ChangePasswordError:
            return ({
                ...state,
                error: action.payload,
                message : "ERROR"
            });
        case ActionTypes.ConfirmChangePassword:
            return ({
                ...state,
                message : "IDLE"
            });
        default :
            return state ;
    }
}