import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {connect} from "react-redux";
import {Card} from "./common/Card";
import {CardSection} from "./common/CardSection";
import {Button} from "./common/Button";
import {coinsFetch, myCoinsFetch} from '../actions';

class MainMenu extends Component {

    componentWillMount() {
        this.props.myCoinsFetch();
        this.props.coinsFetch();
    }

    displayCoins() {
        Actions.coins();
    }

    displayMyCoins() {
        Actions.myCoins();
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Button onPress={this.displayCoins.bind(this)}>Cryptocurrency</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.displayMyCoins.bind(this)}>My coins</Button>
                </CardSection>
            </Card>
        );
    }
}
export default connect(
    null,
    { coinsFetch, myCoinsFetch }
)(MainMenu);

