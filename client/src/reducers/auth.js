import {AUTH, LOGOUT} from '../constants/actionTypes';

const authReducer = (state = {authData: null }, action) => {
    switch(action.type){
        case AUTH:
            let auth_response =  {...action?.data}
            if (auth_response){
                if (auth_response.success){
                    localStorage.setItem('profile', JSON.stringify({...action?.data}));
                    return {...state, authData: action?.data};
                }else{
                    alert(auth_response.message)
                }
            }else{
                alert(auth_response.message)
            }
           
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;
    }
};

export default authReducer;