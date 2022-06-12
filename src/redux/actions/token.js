


import ActionTypes from './actionTypes' ;
import axios from 'axios';
// import { setItem } from '../../utils/helper';
import * as config from '../../static/constants';
import { getItem } from '../../utils/helper';
// import { useNavigate } from 'react-router-dom';

export const GetAllTokens = () => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+ getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_API_URL}token/get`, {  }, header);
        if(res.status === 200){
            dispatch({
                type: ActionTypes.GetAllTokens,
                payload: res.data.data
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: ActionTypes.GetAllTokensError,
            payload: err
        });
    }
}


export const SearchToken = (str) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+ getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_API_URL}token/search`, { search_str : str }, header);
        if(res.status === 200){
            dispatch({
                type: ActionTypes.SearchToken,
                payload: res.data.data
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: ActionTypes.SearchTokenError,
            payload: err
        });
    }
}

export const ApproveToken = (id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+ getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_API_URL}token/approve/${id}`, {  }, header);
        if(res.status === 200){
            res = await axios.post(`${config.BACKEND_API_URL}token/get`, {  }, header);
            dispatch({
                type: ActionTypes.ApproveToken,
                payload: res.data.data
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: ActionTypes.ApproveTokenError,
            payload: err
        });
    }
}

export const DenyToken = (id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+ getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_API_URL}token/deny/${id}`, {  }, header);
        if(res.status === 200){
            res = await axios.post(`${config.BACKEND_API_URL}token/get`, {  }, header);
            dispatch({
                type: ActionTypes.DenyToken,
                payload: res.data.data
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: ActionTypes.DenyTokenError,
            payload: err
        });
    }
}

export const RemoveToken = (id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+ getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_API_URL}token/delete/${id}`, {  }, header);
        if(res.status === 200){
            res = await axios.post(`${config.BACKEND_API_URL}token/get`, {  }, header);
            dispatch({
                type: ActionTypes.DeleteToken,
                payload: res.data.data
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: ActionTypes.DeleteTokenError,
            payload: err
        });
    }
}

export const UploadPdf = (formData, id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+ getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_API_URL}token/upload/${id}`, formData, header);
        if(res.status === 200){
            console.log(res);
            res = await axios.post(`${config.BACKEND_API_URL}token/get`, {  }, header);
            dispatch({
                type: ActionTypes.UploadPdf,
                payload: res.data.data
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: ActionTypes.UploadPdfError,
            payload: err
        });
    }
}

export const AddToken = (formData) => async dispatch => {
    try {
        console.log('Add');
        let res = await axios.post(`${config.BACKEND_API_URL}token/add` , formData) ;
        console.log(res);
        if(res.status === 200){
            res = await axios.post(`${config.BACKEND_API_URL}token/get`, {  });
            console.log('get success'+res);
            dispatch({
                type : ActionTypes.AddToken ,
                payload : res.data.data
            })
        } else {
            console.log("error1"+res);
            dispatch({
                type : ActionTypes.AddTokenError ,
                payload : "ERROR"
            })
        }
    }
    catch (err) {
        console.log("error2"+err);
        dispatch({
            type : ActionTypes.AddTokenError ,
            payload : "ERROR"
        })
    }
}


export const UpdateToken = (id, data) => async dispatch => {
    try {
        let res = await axios.post(`${config.BACKEND_API_URL}token/update/${id}` , data) ;
        console.log(res);
        if(res.status === 200){
            res = await axios.post(`${config.BACKEND_API_URL}token/get`, {  });
            console.log('get success'+res);
            dispatch({
                type : ActionTypes.UpdateToken ,
                payload : res.data.data
            })
        } else {
            console.log("error1"+res);
            dispatch({
                type : ActionTypes.UpdateTokenError ,
                payload : "ERROR"
            })
        }
    }
    catch (err) {
        console.log("error2"+err);
        dispatch({
            type : ActionTypes.UpdateTokenError ,
            payload : "ERROR"
        })
    }
}


export const ConfirmAddToken = (confirmMessage) => async dispatch => {
    dispatch({
        type : ActionTypes.ConfirmAddToken ,
        payload : confirmMessage
    })
}


export const ConfirmUpdateToken = (confirmMessage) => async dispatch => {
    dispatch({
        type : ActionTypes.ConfirmUpdateToken ,
        payload : confirmMessage
    })
}

export const SetSelectedTokenID = (id) => async dispatch => {
    dispatch({
        type : ActionTypes.SetSelectedTokenID,
        payload : id
    })
}