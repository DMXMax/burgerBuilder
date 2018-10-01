import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/",

};

const authStart = (state ) => updateObject(state, { error: null, loading: true });
const authSuccess = (state, action) => updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false }
    );

const authFail = (state, action)=> updateObject(state, {
    loading: false,
    error: action.error,

});

const authLogout = (state)=> updateObject(state,{
    token: null,
    userId: null,
});

const setAuthRedirect = (state, action)=>{
    console.log("UPDATE PATH", action.path);
    return updateObject(state,{authRedirectPath:action.path,
})};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: state = authStart(state); break;
        case actionTypes.AUTH_SUCCESS: state = authSuccess(state,action); break;
        case actionTypes.AUTH_FAIL: state = authFail(state,action); break;
        case actionTypes.AUTH_LOGOUT: state = authLogout(state);break;
        case actionTypes.SET_AUTH_REDIRECT: state = setAuthRedirect(state,action);break;
        default:
    }

    return state;

}

export default reducer