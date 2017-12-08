import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { myCoinUpdate, myCoinSave, myCoinDelete, formRefresh } from '../../actions';
import { Card, CardSection, Button, Confirm } from '../common';
import MyCoinForm from './MyCoinForm';
import {Text, View} from "react-native";

class MyCoinEdit extends Component {
    state = { showModal: false };

    componentWillMount() {
        this.props.formRefresh();
        _.each(this.props.myCoin, (value, prop) => {
            this.props.myCoinUpdate({ prop, value });
        });
    }

    onButtonPress() {
        const { name, price } = this.props;

        this.props.myCoinSave({ name, price, uid: this.props.myCoin.uid });
    }

    onAccept() {
        const { uid } = this.props.myCoin;

        this.props.myCoinDelete({ uid });
    }

    onDecline() {
        this.setState({ showModal: false });        
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

    render() {
        return (
            <Card> 
                <MyCoinForm {...this.props} />
                {this.renderError()}
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>Save Changes</Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>Delete Coin</Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = (state) => {
    const { name, price, error } = state.myCoinsForm;
    return { name, price, error };
};

export default connect(
    mapStateToProps, 
    { myCoinUpdate, myCoinSave, myCoinDelete, formRefresh }
)(MyCoinEdit);
