import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    MY_COINS_REFRESH,
    LOGOUT,
    NORMAL_ROLE,
    VIP_ROLE,
} from './types';
import { myCoinsFetch } from './MyCoinsActions';
import { coinsFetch } from './CoinActions';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text,
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text,
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                user.password = password;
                dispatch({
                    type: MY_COINS_REFRESH,
                });
                fetchRole(dispatch);
                loginUserSucces(dispatch, user);
            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => {
                        dispatch({
                            type: MY_COINS_REFRESH,
                        });
                        user.password = password;
                        addNormalRole();
                        loginUserSucces(dispatch, user);
                    })
                    .catch(() => {
                        loginUserFail(dispatch, 'Authentication Failed');
                    });
            });
    };
};

export const fetchRole = (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/role`)
        .on('value', snapshot => {
            const role = _.map(snapshot.val(), (val, uid) => {
                return { ...val, uid };
            });
            if (role[0].vip) {
                reloadRole(dispatch, 'vip');
            } else {
                reloadRole(dispatch, 'false');
            }
        });
};

export const registerAndLoginVip = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                loginUserFail(dispatch, 'User already exists');
            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => {
                        dispatch({
                            type: MY_COINS_REFRESH,
                        });
                        user.password = password;
                        addVIPRole(dispatch);
                        loginUserSucces(dispatch, user);
                    })
                    .catch((err) => {
                        console.log(err);
                        loginUserFail(dispatch, 'Authentication Failed');
                    });
            });
    };
};

export const addVIPRole = (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/role`)
        .push({ vip: true });
    reloadRole(dispatch, 'vip');
};

export const reloadRole = (dispatch, role) => {
    if (role === 'vip') {
        dispatch({
            type: VIP_ROLE,
        });
    } else {
        dispatch({
            type: NORMAL_ROLE,
        });
    }
};

export const addNormalRole = (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/role`)
        .push({ vip: false });
    reloadRole(dispatch, 'normal');
};

const loginUserFail = (dispatch, error) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error,
    });
};

const loginUserSucces = (dispatch, user) => {
    console.log(user);
    myCoinsFetch();
    coinsFetch();
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user,
    });

    Actions.menu();
};

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT,
        });
        Actions.auth();
    };
};
