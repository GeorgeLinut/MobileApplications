import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    AUTH_REFRESH,
    LOGOUT
 } from '../actions/types';

const INITIAL_STATE = { 
    email: '', 
    password: '', 
    user: null,
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGOUT:
            return INITIAL_STATE;
        case AUTH_REFRESH:
            return { ...INITIAL_STATE, user: state.user };
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, error: '', loading: false };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentification Failed', loading: false };
        case LOGIN_USER:
            return { ...state, loading: true };
        default:
            return state;
    }
};
