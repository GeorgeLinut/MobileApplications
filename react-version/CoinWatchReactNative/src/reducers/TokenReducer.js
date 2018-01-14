import { UPDATE_TOKEN } from '../actions/types';

const INITIAL_STATE = {
    value: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_TOKEN:
            return { ...state, value: action.payload};
        default:
            return state;
    }
};