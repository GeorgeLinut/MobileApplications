import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { PersistGate } from "redux-persist/es/integration/react";
import Router from './Router';
import configureStore from './redux/Store';
import {Text} from "react-native";

class App extends Component {
    componentWillMount() {
        console.log('ok');
        const config = {
            apiKey: 'AIzaSyAPkjgtzjd2KyP1eTZz3LBr5BWIiczpdmo',
            authDomain: 'manager-38e40.firebaseapp.com',
            databaseURL: 'https://manager-38e40.firebaseio.com',
            projectId: 'manager-38e40',
            storageBucket: '',
            messagingSenderId: '783432349046'
          };
          firebase.initializeApp(config);
    }
    render() {
        const { persistor, store } = configureStore();
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        return (
                <PersistGate
                    persistor={persistor}
                    loading={<Text>Loading</Text>}
                >
                    <Provider store={store}>
                    <Router />
                    </Provider>
                </PersistGate>
        );
    }
}

export default App;
