import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { emailChanged, loginUser, passwordChanged, registerAndLoginVip } from '../actions';
import FCM, { FCMEvent } from 'react-native-fcm';
import { tokenUpdate } from '../actions';

class LoginForm extends Component {

    componentDidMount() {

        // this method generate fcm token.
        FCM.requestPermissions()
            .then(() => {
                FCM.getFCMToken().then(token => {
                    console.log('TOKEN (getFCMToken)', token);
                    this.props.tokenUpdate(token);
                });
            });

        // This method get all notification from server side.
        FCM.getInitialNotification().then(notif => {
            console.log('INITIAL NOTIFICATION', notif);
        });

        // This method give received notifications to mobile to display.
        this.notificationUnsubscribe = FCM.on(FCMEvent.Notification, notif => {
            console.log('a', notif);
            if (notif && notif.local_notification) {
                return;
            }
            this.sendRemote(notif);
        });

        // this method call when FCM token is update(FCM token update any time so will get updated token from this method)
        this.refreshUnsubscribe = FCM.on(FCMEvent.RefreshToken, token => {
            console.log('TOKEN (refreshUnsubscribe)', token);
            this.props.tokenUpdate(token);
        });

        FCM.subscribeToTopic('/topics/posts');
    }

    sendRemote(notif) {
        console.log('send', notif);
        if (notif.title !== this.props.email) {
            FCM.presentLocalNotification({
                title: 'New post on Coin Watch',
                body: notif.title + ' wrote a post',
                big_text: notif.message,
                large_icon: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg',
                priority: 'high',
                click_action: notif.click_action,
                show_in_foreground: true,
                local: true,
            });
        }
    }

    componentWillUnmount() {
        // this.refreshUnsubscribe();
        // this.notificationUnsubscribe();
    }

    componentWillMount() {
        if (this.props.email !== '' && this.props.password !== '') {
            Actions.menu();
        }
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onRegisterVip() {
        const { email, password } = this.props;
        this.props.registerAndLoginVip({ email, password });
    }

    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if (this.props.loading) {
            return (
                <CardSection>
                    <Spinner size="large"/>
                </CardSection>
            );
        }
        return (
            <View>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Login
                    </Button>
                </CardSection>
                <CardSection>
                    <Button
                        onPress={this.onRegisterVip.bind(this)}>
                        Register as vip
                    </Button>
                </CardSection>
            </View>
        );
    }

    render() {
        return (
            <Card>
                {/*<PushNotification />*/}
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        value={this.props.email}
                        onChangeText={this.onEmailChange.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                {this.renderError()}
                {this.renderButton()}
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
};

const mapStateToProps = state => {
    console.log(state);
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
        login: state.auth.login,
        token: state.token.value,
    };
};

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,
    registerAndLoginVip,
    tokenUpdate,
})(LoginForm);
