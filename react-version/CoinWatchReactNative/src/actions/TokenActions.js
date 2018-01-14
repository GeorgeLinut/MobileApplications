import { UPDATE_TOKEN } from './types';

export const tokenUpdate = (token) => {
    return {
        type: UPDATE_TOKEN,
        payload: token,
    };
};