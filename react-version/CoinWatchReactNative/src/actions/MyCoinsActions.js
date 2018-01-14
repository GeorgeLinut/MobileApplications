import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import {
    MY_COINSS_FETCH_SUCCESS,
    MY_COINS_CREATE,
    MY_COINS_SAVE_SUCCES,
    MY_COINS_UPDATE,
    MY_COINS_ERROR,
    MY_COINS_FORM_REFRESH,
    CALCULATE_INVESTMENT,
} from './types';

export const formRefresh = () => {
    return { type: MY_COINS_FORM_REFRESH };
};

export const myCoinUpdate = ({ prop, value }) => {
    return {
        type: MY_COINS_UPDATE,
        payload: { prop, value },
    };
};

export const myCoinCreate = ({ name, price }) => {
    const { currentUser } = firebase.auth();
    console.log(currentUser);
    let error = validateCoin({ name, price });
    if (error) {
        return ({
            type: MY_COINS_ERROR,
            payload: error,
        });
    }
    return (dispatch) => {
        console.log('inceput coin');
        firebase.database().ref(`/users/${currentUser.uid}/myCoins`)
            .push({ name, price });
        dispatch({
            type: MY_COINS_CREATE,
        });
        myCoinsFetch();
        Actions.myCoinsList({ type: 'reset' });

    };
};

export const myCoinsFetch = () => {
    console.log('myCoinsFetch');
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/myCoins`)
            .on('value', snapshot => {
                dispatch({ type: MY_COINSS_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const myCoinSave = ({ name, price, uid }) => {
    const { currentUser } = firebase.auth();
    let error = validateCoin({ name, price });
    if (error) {
        return ({
            type: MY_COINS_ERROR,
            payload: error,
        });
    }
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/myCoins/${uid}`)
            .set({ name, price });
        dispatch({ type: MY_COINS_SAVE_SUCCES });
        myCoinsFetch();
        Actions.myCoinsList({ type: 'reset' });

    };
};

export const myCoinDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/myCoins/${uid}`)
            .remove();
        myCoinsFetch();
        Actions.myCoinsList({ type: 'reset' });
    };
};

export const myCoinSaveSuccess = () => {
    return {
        type: MY_COINS_SAVE_SUCCES,
    };
};

export const calculateInvestment = (myCoins, coins) => {
    let investmentCoins = [];
    let total_value = 0;
    _.forEach(myCoins, (value) => {
        let searchedCoin = _.find(coins, (coin) => {
            return coin.name === value.name;
        });
        if (searchedCoin !== undefined) {
            investmentCoins.push({
                name: value.name,
                value: Number(value.price) * searchedCoin.price_usd,
                price: value.price,
                uid: value.uid,
            });
            total_value += Number(value.price) * searchedCoin.price_usd;
        }
    });
    return {
        type: CALCULATE_INVESTMENT,
        payload: {
            coins: investmentCoins,
            total_value: total_value,
        },
    };
};

const validateCoin = ({ name, price }) => {
    let error = '';
    if (isNaN(Number(price))) {
        error = 'Value is invalid!';
    }
    return error;
};
