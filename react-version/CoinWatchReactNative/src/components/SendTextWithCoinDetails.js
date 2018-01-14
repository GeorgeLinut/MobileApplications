import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Communications from 'react-native-communications';
import {CardSection, Input, Button} from './common';

class SendTextWithCoinDetails extends Component {
    state = { sms: "" };

    sendSMS() {
        Communications.textWithoutEncoding(this.state.sms,
            `Dates about ${this.props.coin.name}\nName: ${this.props.coin.name}\nSymbol: ${this.props.coin.symbol}\nRank: ${this.props.coin.rank}\nPrice usd: ${this.props.coin.price_usd}\nPrice btc: ${this.props.coin.price_btc}\nMarket capital usd: ${this.props.coin.price_btc}\nPercent change 1h: ${this.props.coin.percent_change_1h}\nPercent change 24h: ${this.props.coin.percent_change_24h}\nPercent change 7d: ${this.props.coin.percent_change_7d}`);
    }

    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="phone number"
                        value={this.state.sms}
                        onChangeText={text => this.setState({ sms: text })}
                    />
                </CardSection>

                <CardSection>
                    <Button onPress={this.sendSMS.bind(this)}>Send sms</Button>
                </CardSection>

            </View>
        )
    }
}

export default SendTextWithCoinDetails;
