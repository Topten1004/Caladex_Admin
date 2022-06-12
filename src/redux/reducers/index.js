import  { combineReducers } from 'redux' ;

import authReducer from './auth' ;
import tokenReducer from './token' ;
import stakeReducer from './stake';

export default combineReducers({
    auth : authReducer,
    token : tokenReducer,
    stake : stakeReducer,
})