import * as actionTypes from './actionTypes';
import axios from 'axios';
//https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]


export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START,
    }
}
export const authSuccess = (authData)=>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken:authData.idToken,
        userId: authData.localId,
    }
}
export const authFail = (err)=>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: err,
    }
}

export const logout = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
}

export const checkAuthTimeout = (expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        }, parseInt(expirationTime,10)*1000)

    };
}

export const auth= (email, password, isSignup)=>{
    const key = "AIzaSyBzynw-yfOdHv1-JzH6w9TUCMVCsYIlfvI";
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+key;
    if (!isSignup)
    {
        url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+key;
    }
    return dispatch=>{
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken:true,
        }
        axios.post(url,
                authData)
            .then(response=>{
                console.log(response);
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err=>{
                console.log("BASE ERROR", err.response.data.error);
                dispatch(authFail(err.response.data.error));
            })
    }

}