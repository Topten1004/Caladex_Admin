


import ActionTypes from './actionTypes' ;
import axios from 'axios';
// import { setItem } from '../../utils/helper';
import * as config from '../../static/constants';
import { getItem } from '../../utils/helper';
// import { useNavigate } from 'react-router-dom';

export const GetAllStakes = () => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+ getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_API_URL}stake/get`, {  }, header);
        if(res.status === 200){
            dispatch({
                type: ActionTypes.GetAllStakes,
                payload: res.data.data
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: ActionTypes.GetAllStakesError,
            payload: err
        });
    }
}


export const SearchStake = (str) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+ getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_API_URL}stake/search`, { search_str : str }, header);
        if(res.status === 200){
            dispatch({
                type: ActionTypes.SearchStake,
                payload: res.data.data
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: ActionTypes.SearchStakeError,
            payload: err
        });
    }
}

export const RemoveStake = (id) => async dispatch => {
    try {
        const header = {
            headers: { Authorization: `Bearer `+ getItem('access_token') }
        };
        let res = await axios.post(`${config.BACKEND_API_URL}stake/delete/${id}`, {  }, header);
        if(res.status === 200){
            res = await axios.post(`${config.BACKEND_API_URL}stake/get`, {  }, header);
            dispatch({
                type: ActionTypes.DeleteStake,
                payload: res.data.data
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: ActionTypes.DeleteStakeError,
            payload: err
        });
    }
}

export const AddStake = (data) => async dispatch => {
    try {
        console.log('Add');
        let res = await axios.post(`${config.BACKEND_API_URL}stake/add` , data) ;
        console.log(res);
        if(res.status === 200){
            res = await axios.post(`${config.BACKEND_API_URL}stake/get`, {  });
            console.log('get success'+res);
            dispatch({
                type : ActionTypes.AddStake ,
                payload : res.data.data
            })
        } else {
            console.log("error1"+res);
            dispatch({
                type : ActionTypes.AddStakeError ,
                payload : "ERROR"
            })
        }
    }
    catch (err) {
        console.log("error2"+err);
        dispatch({
            type : ActionTypes.AddStakeError ,
            payload : "ERROR"
        })
    }
}


export const UpdateStake = (id, data) => async dispatch => {
    try {
        let res = await axios.post(`${config.BACKEND_API_URL}stake/update/${id}` , data) ;
        console.log(res);
        if(res.status === 200){
            res = await axios.post(`${config.BACKEND_API_URL}stake/get`, {  });
            console.log('get success'+res);
            dispatch({
                type : ActionTypes.UpdateStake ,
                payload : res.data.data
            })
        } else {
            console.log("error1"+res);
            dispatch({
                type : ActionTypes.UpdateStakeError ,
                payload : "ERROR"
            })
        }
    }
    catch (err) {
        console.log("error2"+err);
        dispatch({
            type : ActionTypes.UpdateStakeError ,
            payload : "ERROR"
        })
    }
}


export const ConfirmAddStake = (confirmMessage) => async dispatch => {
    dispatch({
        type : ActionTypes.ConfirmAddStake ,
        payload : confirmMessage
    })
}


export const ConfirmUpdateStake = (confirmMessage) => async dispatch => {
    dispatch({
        type : ActionTypes.ConfirmUpdateStake ,
        payload : confirmMessage
    })
}

export const SetSelectedStakeID = (id) => async dispatch => {
    dispatch({
        type : ActionTypes.SetSelectedStakeID,
        payload : id
    })
}