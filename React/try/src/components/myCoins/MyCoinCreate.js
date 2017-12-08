import React, { Component } from 'react';
import { connect } from 'react-redux';
import { myCoinUpdate, myCoinCreate, myCoinSaveSuccess, formRefresh } from '../../actions';

import { Card, CardSection, Button } from '../common';
import MyCoinForm from './MyCoinForm';
import {Text, View} from "react-native";

class MyCoinCreate extends Component {
    componentWillMount() {
        this.props.formRefresh();

        this.props.myCoinUpdate({ prop:'name', value: this.props.newCoinName });

    }

    onButtonPress() {
        const { name, price } = this.props;
        this.props.myCoinCreate({ name, price });
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
                    <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
                </CardSection>
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

export default connect(mapStateToProps, { myCoinUpdate, myCoinCreate, myCoinSaveSuccess, formRefresh})(MyCoinCreate);
