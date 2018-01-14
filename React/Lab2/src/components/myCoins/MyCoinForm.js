import React, { Component } from 'react';
import { View} from 'react-native';
import { connect } from 'react-redux';
import { myCoinUpdate } from '../../actions';
import { CardSection, Input } from '../common';

class MyCoinForm extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="coin"
                        value={this.props.name}
                        onChangeText={text => this.props.myCoinUpdate({ prop: 'name', value: text })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Value"
                        placeholder="USD"
                        value={this.props.price}
                        onChangeText={text => this.props.myCoinUpdate({ prop: 'price', value: text })}
                    />
                </CardSection>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, price} = state.myCoinsForm;
    return { name, price };
};

export default connect(mapStateToProps, { myCoinUpdate })(MyCoinForm);
