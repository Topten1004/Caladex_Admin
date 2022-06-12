


import ActionTypes from './actionTypes' ;
import axios from 'axios';
import { setItem } from '../../utils/helper';
import * as config from '../../static/constants';
import { getItem } from '../../utils/helper';
// import { getItem } from '../../utils/helper';
// import { useNavigate } from 'react-router-dom';


export const SigninUser = (user, history) => async dispatch => {
    try {
        let res = await axios.post(`${config.BACKEND_API_URL}auth/login`, { ...user });

        //const navigate = useNavigate();

        setItem('access_token', res.data.token);
        console.log(res);
        if(res.status === 200){
            console.log(res.data.data.user.email);
            dispatch({
                type: ActionTypes.SignInUser,
                payload: res.data
            });
            history('/');
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: ActionTypes.SigninUserError,
            payload: err
        });
    }
}


export const ChangePassword = (user) => async dispatch => {
    try {

        
        const header = {
            headers: { Authorization: `Bearer `+ getItem('access_token') }
        };
        
        let res = await axios.post(`${config.BACKEND_API_URL}auth/changepassword`, { ...user }, header);

        //const navigate = useNavigate();
        console.log(res);
        if(res.status === 200){
            dispatch({
                type: ActionTypes.ChangePassword,
                payload: res.data
            });
        }else {
            dispatch({
                type: ActionTypes.ChangePasswordError,
                payload: "ERROR"
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: ActionTypes.ChangePasswordError,
            payload: err
        });
    }
}

export const SignOut = (history) => dispatch => {

    // delete token function call here
    console.log("logout");
    setItem('access_token');
    setItem('user_id');
    window.location.href = "/login";
    console.log("aa");
    dispatch({
        type: ActionTypes.SignOut
    })
}

export const ConfirmChangePassword = (confirmMessage) => async dispatch => {
    dispatch({
        type : ActionTypes.ConfirmChangePassword ,
        payload : confirmMessage
    })
}
