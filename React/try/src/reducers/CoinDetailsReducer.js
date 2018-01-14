import {
    COIN_HISTORY,
    COIN_CHART_COIN_SELECTED,
    COIN_CHART_LOADING,
    COIN_HISTORY_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    coinHistory: [
        {x: -10, y: 0},
        {x: -9, y: 0},
        {x: -8, y: 0},
        {x: -7, y: 0},
        {x: -6, y: 0},
        {x: -5, y: 0},
        {x: -4, y: 0},
        {x: -3, y: 0},
        {x: -2, y: 0},
        {x: -1, y: 0},
        {x: -0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0},
        {x: 4, y: 0},
        {x: 5, y: 0},
        {x: 6, y: 0},
        {x: 7, y: 0},
        {x: 8, y: 0},
        {x: 9, y: 0},
        {x: 10, y: 0}
    ],
    loading: false,
    selectedCoinSymbol: '',
    failed: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COIN_CHART_LOADING:
            return { ...state, loading: true };
        case COIN_HISTORY:
            return { ...state, coinHistory:action.payload, loading: false, failed: false};
        case COIN_HISTORY_FAILED:
            return { ...state, loading: false, failed: true};
        case COIN_CHART_COIN_SELECTED:
            return { ...state, selectedCoinSymbol: action.payload};
        default:
            return state;
    }
};
