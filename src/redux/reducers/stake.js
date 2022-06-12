
import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    message : "IDLE" ,
    updateMessage : "IDLE",
    stakesData : [],
    selectedID : -1,
    error: {},
}

export default ( state={INITIAL_STATE} , action={} ) => {
    switch(action.type) {
        case (ActionTypes.GetAllStakes):
            return ({
                ...state,
                stakesData : action.payload.data,
            });
        case ActionTypes.GetAllStakesError:
            return ({
                ...state,
                error: action.payload
            });
        case (ActionTypes.DeleteStake):
            return ({
                ...state,
                stakesData : action.payload.data,
            });
        case ActionTypes.DeleteStakeError:
            return ({
                ...state,
                error: action.payload
            });
        case (ActionTypes.SearchStake):
            return ({
                ...state,
                stakesData : action.payload.data,
            });
        case ActionTypes.SearchStakeError:
            return ({
                ...state,
                error: action.payload
            });
        case (ActionTypes.AddStake):
            return ({
                ...state,
                stakesData : action.payload.data,
                message : "SUCCESS"
            });
        case ActionTypes.AddStakeError:
            return ({
                ...state,
                error: action.payload,
                message : "ERROR"
            });
        case (ActionTypes.UpdateStake):
            console.log("Success");
            return ({
                ...state,
                stakesData : action.payload.data,
                updateMessage : "SUCCESS"
            });
        case ActionTypes.UpdateStakeError:
            return ({
                ...state,
                error: action.payload,
                updateMessage : "ERROR"
            });
        case ActionTypes.ConfirmAddStake:
            console.log("IDLE add");
            return ({
                ...state,
                message : "IDLE"
            });
        case ActionTypes.ConfirmUpdateStake:
            console.log("IDLE Update");
            return ({
                ...state,
                updateMessage : "IDLE"
            });
        case ActionTypes.SetSelectedStakeID:
            return({
                ...state,
                selectedID : action.payload
            });
        default :
            return state ;
    }
}