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
        authData 
    }
}
export const authFail = (authData)=>{
    return {
        type: actionTypes.AUTH_FAIL,
        authData
    }
}

export const auth= (email, password)=>{
    const key = "AIzaSyBzynw-yfOdHv1-JzH6w9TUCMVCsYIlfvI";
    return dispatch=>{
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken:true,
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+key,
                authData)
            .then(response=>{
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err=>{
                console.log(err);
                dispatch(authFail(err));
            })
    }

}