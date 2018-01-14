import React from 'react';
import {View, Text} from 'react-native';
import {Card, CardSection, Input} from '../common/index';

const CoinDetails = (props) => {
    const { textStyle } = styles;
    console.log('coindetails', props);
    return (
        <View>
            <CardSection>
                <Text style={textStyle}>Name: {props.name }</Text>
            </CardSection>
            <CardSection>
                <Text style={textStyle}>Value: {props.price_usd } USD</Text>
            </CardSection>
            <CardSection>
                <Text style={textStyle}>Rank: {props.rank }</Text>
            </CardSection>
            <CardSection>
                <Text style={textStyle}>Percent change 1h: {props.percent_change_1h }</Text>
            </CardSection>
            <CardSection>
                <Text style={textStyle}>Percent change 24h: {props.percent_change_24h }</Text>
            </CardSection>
            <CardSection>
                <Text style={textStyle}>Percent change 7d: {props.percent_change_7d }</Text>
            </CardSection>
        </View>
    )
};

const styles = {
    textStyle: {
        fontSize: 16,
        fontWeight: '400',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5
    }
};

export default CoinDetails;
