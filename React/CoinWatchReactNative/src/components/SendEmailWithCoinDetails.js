import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Communications from 'react-native-communications';
import {CardSection, Input, Button} from './common';

class SendEmailWithCoinDetails extends Component {
    state = { email: "", error: "" };

    sendEmail() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(this.state.email) === false) {
            this.setState({ error: "Email is incorrect"})
        }
        else {
            this.setState({ error: ""});
            Communications.email(this.state.email, "", "", "Dates about " + this.props.coin.name,
            `Name: ${this.props.coin.name}\nSymbol: ${this.props.coin.symbol}\nRank: ${this.props.coin.rank}\nPrice usd: ${this.props.coin.price_usd}\nPrice btc: ${this.props.coin.price_btc}\nMarket capital usd: ${this.props.coin.price_btc}\nPercent change 1h: ${this.props.coin.percent_change_1h}\nPercent change 24h: ${this.props.coin.percent_change_24h}\nPercent change 7d: ${this.props.coin.percent_change_7d}`);
        }
    }

    renderError() {
        if (this.state.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.details}>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="user@gmail.com"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                </CardSection>

                {this.renderError()}
                <CardSection>
                    <Button onPress={this.sendEmail.bind(this)}>Send Email</Button>
                </CardSection>

            </View>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default SendEmailWithCoinDetails;
