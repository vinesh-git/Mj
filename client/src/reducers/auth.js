import {AUTH, LOGOUT} from '../constants/actionTypes';

const authReducer = (state = {authData: null }, action) => {
    switch(action.type){
        case AUTH:
            console.log({...action?.data})
            let auth_response =  {...action?.data}
            if (auth_response){
                if (auth_response.success){
                    localStorage.setItem('profile', JSON.stringify({...action?.data}));
                    return {...state, authData: action?.data};
                }else{
                    alert("invalid details")
                }
            }else{
                alert("invalid details")
            }
           
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;
    }
};

export default authReducer;