import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    NORMAL_ROLE,
    VIP_ROLE,
    LOGOUT,
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    vip: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGOUT:
            return { ...state, email: '', password: '', user: null, error: '', loading: false };
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, error: '', loading: false };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.payload, loading: false };
        case LOGIN_USER:
            return { ...state, loading: true };
        case NORMAL_ROLE:
            return { ...state, vip: false };
        case VIP_ROLE:
                return { ...state, vip: true };
        default:
            return state;
    }
};
