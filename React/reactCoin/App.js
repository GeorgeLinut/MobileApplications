import React from 'react';
import Main from './components/Main.js';
import {StackNavigator} from 'react-navigation';
import AddAsset from './components/AddAsset'
global.dataArray = [
    {
        id:1,
        Coin:'Bitcoin',
        Price:7200
    },
    {
        id:2,
        Coin:'Ethereum',
        Price:300
    },
    {
        id:3,
        Coin:'Ripple',
        Price:0.21
    }
]
global.id = 4;
const ModalStack = StackNavigator({
    Home: {
        screen: Main,
    },
    Profile: {
        path: 'addOrder/:order',
        screen: AddAsset,
    },
});

export default ModalStack;