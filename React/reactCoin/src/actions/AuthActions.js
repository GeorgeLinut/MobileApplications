import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    AUTH_REFRESH,
    MY_COINS_REFRESH
} from './types';

export const authRefresh = () => {
    return {
        type: AUTH_REFRESH
    };
};

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ lastUser, email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                user.password = password;
                dispatch({
                    type: MY_COINS_REFRESH
                });
                loginUserSucces(dispatch, user);
            })
            .catch((err) => {
                console.log(err);
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => {
                        dispatch({
                            type: MY_COINS_REFRESH
                        });
                        loginUserSucces(dispatch, { ...user, password: password })
                    })
                    .catch(() => {
                        if (lastUser !== null && lastUser.email === email && lastUser.password === password){
                            loginUserSucces(dispatch, lastUser)
                        } else{
                            loginUserFail(dispatch)
                        }
                    });
            });
    };
};

const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    });
};

const loginUserSucces = (dispatch, user) => {
    console.log(user);
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.menu();
};
