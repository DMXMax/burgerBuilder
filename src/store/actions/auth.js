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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn *1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err=>{
                console.log("BASE ERROR", err.response.data.error);
                dispatch(authFail(err.response.data.error));
            })
    }

};

export const setAuthRedirectPath =(path)=>
{
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path,
    }
}

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if( token )
        {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if( new Date() > expirationDate )
                dispatch(logout())
            else{
                const userId = localStorage.getItem('userId')
                const vals = {}
                vals["idToken"]=token;
                vals["userId"]=userId;
                dispatch(authSuccess(vals));
                dispatch(checkAuthTimeout,(expirationDate.getTime() - new Date().getTime())/1000 )
            }
        }
        else
        {
            dispatch(logout());
        }

    }
}