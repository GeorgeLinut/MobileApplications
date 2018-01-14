import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCreate } from '../../actions';
import { Card } from '../common';
import {Text, View} from "react-native";
import PostForm from './PostForm';
import { Button } from 'native-base';

class PostCardCreate extends Component {
    onButtonPress() {
        console.log('Create post', this.props);
        this.props.postCreate(this.props.message, this.props.token);
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
                <PostForm {...this.props} />
                {this.renderError()}
                <Button full onPress={this.onButtonPress.bind(this)}>
                    <Text>Send post</Text>
                </Button>
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
    const { message } = state.postForm;
    return { message, token: state.token.value };
};

export default connect(mapStateToProps, { postCreate })(PostCardCreate);
