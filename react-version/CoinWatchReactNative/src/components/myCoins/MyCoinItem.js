import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';

class ListItem extends Component {
    onRowPress() {
        Actions.myCoinsEdit({ myCoin: this.props.myCoin });
    }

    render() {
        const { name, value } = this.props.myCoin;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {name}{this.props.displayValue ? `: ${value} USD` : ''}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>            
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default ListItem;
