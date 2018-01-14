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
    apiKey: "AIzaSyBmkg6RaSMZytue5bdT9g7DWDk1YQmAjrE",
    authDomain: "coinwatch-89aa3.firebaseapp.com",
    databaseURL: "https://coinwatch-89aa3.firebaseio.com",
    projectId: "coinwatch-89aa3",
    storageBucket: "coinwatch-89aa3.appspot.com",
    messagingSenderId: "544157269566"
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
