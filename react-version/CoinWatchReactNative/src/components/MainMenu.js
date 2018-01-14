import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Button as Btn, Text } from 'native-base';
import { Card } from './common/Card';
import { CardSection } from './common/CardSection';
import { Button } from './common/Button';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';

class MainMenu extends Component {

    componentWillMount() {
    }

    displayCoins() {
        Actions.coins();
    }

    displayMyCoins() {
        Actions.myCoins();
    }

    displayPosts() {
        console.log('ok');
        Actions.posts();
    }


    renderMyCoins() {
        if (this.props.vip) {
            return (
                <Btn block warning onPress={this.displayMyCoins.bind(this)} style={styles.buttonStyle}>
                    <Text>My Coins</Text>
                </Btn>
            );
        }
    }

    render() {
        return (
            <Card>
                <Btn block onPress={this.displayCoins.bind(this)}>
                    <Text>Cryptocurrency</Text>
                </Btn>

                {this.renderMyCoins()}

                <Btn block success onPress={this.displayPosts.bind(this)} style={styles.buttonStyle}>
                    <Text>Users posts</Text>
                </Btn>
            </Card>
        );
    }
}

const styles = {
    buttonStyle: {
        marginTop: 10,
    },
};

const mapStateToProps = state => {
    const { vip } = state.auth;
    return {
        vip,
    };
};

export default connect(mapStateToProps, {})(MainMenu);
