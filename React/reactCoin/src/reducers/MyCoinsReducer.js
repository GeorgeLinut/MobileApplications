import {
    MY_COINSS_FETCH_SUCCESS,
    MY_COINS_REFRESH
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MY_COINS_REFRESH:
            return INITIAL_STATE;
        case MY_COINSS_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};