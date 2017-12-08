import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import CoinList from './components/coin/CoinList';
import CoinChart from './components/coin/CoinChart';
import CoinMenu from './components/coin/CoinMenu';
import SendEmailWithCoinDetails from './components/SendEmailWithCoinDetails';
import SendTextWithCoinDetails from './components/SendTextWithCoinDetails';
import MainMenu from './components/MainMenu';
import MyCoinList from "./components/myCoins/MyCoinList";
import MyCoinCreate from "./components/myCoins/MyCoinCreate";
import MyCoinEdit from "./components/myCoins/MyCoinEdit";
import Investment from "./components/myCoins/Investment";

const RouterComponenet = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }} >
            <Scene key="auth">
                <Scene key="login" component={LoginForm} title="Please Login" initial />
            </Scene>
            <Scene key="menu">
                <Scene
                    onLeft={() => Actions.auth({ type: 'reset' })}
                    leftTitle="Log out"
                    key="mainMenu"
                    component={MainMenu}
                    title="Main Menu"
                    initial
                />
            </Scene>
            <Scene key="coins">
                <Scene
                    onLeft={() => Actions.menu({ type: 'reset' })}
                    leftTitle="Menu"
                    key="coinList"
                    component={CoinList}
                    title="Coins"
                    initial
                />
                <Scene
                    key="coinMenu"
                    component={CoinMenu}
                    title="Coin menu"
                />
                <Scene
                    key="coinChart"
                    component={CoinChart}
                    title="Chart"
                />
                <Scene
                    key="sendEmailCoin"
                    component={SendEmailWithCoinDetails}
                    title="Send email"
                />
                <Scene
                    key="sendTextCoin"
                    component={SendTextWithCoinDetails}
                    title="Send sms"
                />
                <Scene
                    key="addCoinToMyCoinsCreate"
                    component={MyCoinCreate}
                    title="Add Coin"
                />
            </Scene>
            <Scene key="myCoins">
                <Scene
                    onRight={() => Actions.myCoinsCreate()}
                    rightTitle="Add"
                    onLeft={() => Actions.menu({ type: 'reset' })}
                    leftTitle="Menu"
                    key="myCoinsList"
                    component={MyCoinList}
                    title="My Coins"
                    initial
                />
                <Scene
                    key="myCoinsCreate"
                    component={MyCoinCreate}
                    title="Add Coin"
                />
                <Scene
                    key="myCoinsEdit"
                    component={MyCoinEdit}
                    title="Edit Coin"
                />
                <Scene
                    key="investment"
                    component={Investment}
                    title="Investment"
                />
            </Scene>
        </Router>
    );
};

export default RouterComponenet;
