import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
export default class Main extends React.Component{
    render(){
        return (
            <View key={this.props.keyval}>
                <Text>{this.props.val.Coin}</Text>
                <Text>{this.props.val.Price}</Text>
            </View>
        );
    }

}