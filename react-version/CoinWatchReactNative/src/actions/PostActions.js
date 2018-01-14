import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { POST_CREATE, POST_FETCH_SUCCESS, POST_UPDATE } from './types';
import FirebaseConstants from '../FirebaseConstants';

const API_URL = 'https://fcm.googleapis.com/fcm/send';


export const postUpdate = ({ prop, value }) => {
    console.log('action', prop, value);
    return {
        type: POST_UPDATE,
        payload: { prop, value },
    };
};


export const postCreate = (message, token) => {
    const { currentUser } = firebase.auth();
    const post = {
        email: currentUser.email,
        date: new Date().toLocaleString(),
        likes: 0,
        message: message,
        active: false,
    };
    console.log('create', post);
    sendNotification(post, token);
    return (dispatch) => {
        console.log('inceput post', post);
        firebase.database().ref(`/posts`)
            .push(post);
        dispatch({
            type: POST_CREATE,
        });
        Actions.postList({ type: 'reset' });
    };
};

export const postFetch = () => {
    console.log('post fetch');
    return (dispatch) => {
        firebase.database().ref(`/posts`)
            .on('value', snapshot => {
                dispatch({ type: POST_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

const sendNotification = (post, token) => {
    console.log('token', token);
    const body = {
        'to': '/topics/posts',
        'notification':{
            'title': 'Coin Watch',
            'body': '',
            'sound': 'default'
        },
        'data':{
            'title': post.email,
            'message': post.message,
        },
        'priority': 'high'
    };

    let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'key=' + FirebaseConstants.KEY
    });

    fetch(API_URL, { method: 'POST', headers, body: JSON.stringify(body) })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};

