import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {connect} from "react-redux";
import { Card, CardSection, Button } from '../common/index';
import CoinDetails from './CoinDetails';
import {getCoinHistory} from "../../actions";

class CoinMenu extends Component {

    sendEmail() {
        Actions.sendEmailCoin({ coin: this.props.coin });
    }

    sendText() {
        Actions.sendTextCoin({ coin: this.props.coin });
    }

    displayChart() {
        this.props.getCoinHistory(this.props.coin.symbol);
        Actions.coinChart({ coin: this.props.coin });
    }

    addToMyCoins() {
        Actions.myCoins({ type: 'reset' });
        Actions.myCoinsCreate({ newCoinName: this.props.coin.name })
    }

    render() {
        return (
            <Card>
                <CoinDetails {...this.props.coin} />
                <CardSection>
                    <Button onPress={this.addToMyCoins.bind(this)}>Add to my coins</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.sendEmail.bind(this)}>Send email</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.sendText.bind(this)}>Send sms</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.displayChart.bind(this)}>History</Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return { coinHistory: state.coinDetails.coinHistory };
};

export default connect(mapStateToProps, { getCoinHistory })(CoinMenu);

