import {
    CALCULATE_INVESTMENT
} from '../actions/types';

const INITIAL_STATE = {
    coins: [],
    total_value: 0.0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CALCULATE_INVESTMENT:
            return { ...state, coins: action.payload.coins, total_value: action.payload.total_value };
        default:
            return state;
    }
};