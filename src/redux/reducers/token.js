
import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    message : "IDLE" ,
    updateMessage : "IDLE",
    tokensData : [],
    selectedID : -1,
    error: {},
}

export default ( state={INITIAL_STATE} , action={} ) => {
    switch(action.type) {
        case (ActionTypes.GetAllTokens):
            return ({
                ...state,
                tokensData : action.payload.data,
            });
        case ActionTypes.GetAllTokensError:
            return ({
                ...state,
                error: action.payload
            });
        case (ActionTypes.ApproveToken):
            console.log('approved');
            return ({
                ...state,
                tokensData : action.payload.data,
            });
        case ActionTypes.ApproveTokenError:
            return ({
                ...state,
                error: action.payload
            });
        case (ActionTypes.DenyToken):
            return ({
                ...state,
                tokensData : action.payload.data,
            });
        case ActionTypes.DenyTokenError:
            return ({
                ...state,
                error: action.payload
            });
        case (ActionTypes.DeleteToken):
            return ({
                ...state,
                tokensData : action.payload.data,
            });
        case ActionTypes.DeleteTokenError:
            return ({
                ...state,
                error: action.payload
            });
        case (ActionTypes.UploadPdf):
            return ({
                ...state,
                tokensData : action.payload.data,
            });
        case ActionTypes.UploadPdfError:
            return ({
                ...state,
                error: action.payload
            });
        case (ActionTypes.SearchToken):
            return ({
                ...state,
                tokensData : action.payload.data,
            });
        case ActionTypes.SearchTokenError:
            return ({
                ...state,
                error: action.payload
            });
        case (ActionTypes.AddToken):
            return ({
                ...state,
                tokensData : action.payload.data,
                message : "SUCCESS"
            });
        case ActionTypes.AddTokenError:
            return ({
                ...state,
                error: action.payload,
                message : "ERROR"
            });
        case (ActionTypes.UpdateToken):
            console.log("Success");
            return ({
                ...state,
                tokensData : action.payload.data,
                updateMessage : "SUCCESS"
            });
        case ActionTypes.UpdateTokenError:
            return ({
                ...state,
                error: action.payload,
                updateMessage : "ERROR"
            });
        case ActionTypes.ConfirmAddToken:
            console.log("IDLE add");
            return ({
                ...state,
                message : "IDLE"
            });
        case ActionTypes.ConfirmUpdateToken:
            console.log("IDLE Update");
            return ({
                ...state,
                updateMessage : "IDLE"
            });
        case ActionTypes.SetSelectedTokenID:
            return({
                ...state,
                selectedID : action.payload
            });
        default :
            return state ;
    }
}