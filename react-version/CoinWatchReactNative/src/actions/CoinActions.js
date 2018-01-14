import {
    COIN_FETCH_SUCCESS,
    COIN_HISTORY,
    COIN_CHART_COIN_SELECTED,
    COIN_CHART_LOADING,
    COIN_HISTORY_FAILED
} from './types';

export const coinsFetch = () => {
    console.log('fetch all coins');
    return (dispatch) => {
        fetch("https://api.coinmarketcap.com/v1/ticker/")
            .then((response) => response.json())
            .then((data) => {
                dispatch({type: COIN_FETCH_SUCCESS, payload: data});
            })
            .catch((err) => console.log(err))
    };
};

export const coinSelected = (symbol) => {
    return {
        type: COIN_CHART_COIN_SELECTED,
        payload: symbol
    }
};

export const getCoinHistory = (symbol) => {
    return (dispatch) => {
        dispatch({type: COIN_CHART_LOADING});
        fetch(`https://apiv2.bitcoinaverage.com/indices/global/history/${symbol}USD?period=monthly&?format=json`)
            .then((response) => response.json())
            .then((data) => {
                let coinHistory = [];
                for (let i=0; i<data.length; i++) {
                    coinHistory.push({
                        x: data.length - i - 1,
                        y: data[i].average
                    });
                }
                dispatch({type: COIN_HISTORY, payload: coinHistory});
            })
            .catch((err) => dispatch({type: COIN_HISTORY_FAILED}))
    };
};


