import { POST_CREATE, POST_UPDATE } from '../actions/types';

const INITIAL_STATE = {
    message: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_UPDATE:
            //action.payload = { prop: 'name', value: 'bitcoin' }
            console.log('reducer', action.payload.value);
            return { ...state, [action.payload.prop]: action.payload.value };
        case POST_CREATE:
            return INITIAL_STATE;
        default:
            return state;
    }
};