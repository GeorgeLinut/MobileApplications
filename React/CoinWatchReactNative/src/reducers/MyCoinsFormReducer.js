import {
    MY_COINS_UPDATE,
    MY_COINS_CREATE,
    MY_COINS_SAVE_SUCCES,
    MY_COINS_ERROR,
    MY_COINS_FORM_REFRESH
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    price: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MY_COINS_UPDATE:
            //action.payload = { prop: 'name', value: 'bitcoin' }
            return { ...state, [action.payload.prop]: action.payload.value };
        case MY_COINS_CREATE:
            return INITIAL_STATE;
        case MY_COINS_SAVE_SUCCES:
            return INITIAL_STATE;
        case MY_COINS_FORM_REFRESH:
            return INITIAL_STATE;
        case MY_COINS_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};