import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { postUpdate } from '../../actions';
import { Input } from '../common';
import { CardSection } from '../common/CardSection';

class PostForm extends Component {

    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Message"
                        placeholder=""
                        value={this.props.message}
                        onChangeText={text => this.props.postUpdate({ prop: 'message', value: text })}
                    />
                </CardSection>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { message } = state.postForm;
    return { message };
};

export default connect(mapStateToProps, { postUpdate })(PostForm);
