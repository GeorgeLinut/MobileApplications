import React, {Component} from 'react';
import {ListView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {calculateInvestment} from '../../actions';
import MyCoinItem from "./MyCoinItem";
import {CardSection} from "../common/CardSection";
import {Card} from "../common/Card";

class Investment extends Component {
    componentWillMount() {
        this.props.calculateInvestment(this.props.myCoins, this.props.coins);
        this.createDataSource(this.props.investment);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.investment);
    }

    createDataSource({coins}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(coins);
    }

    renderRow(coin) {
        return (
            <MyCoinItem myCoin={coin} displayValue/>
        );
    }

    render() {
        return (
            <View>
                <Card>
                    <CardSection>
                        <Text style={styles.textStyle}>Total: {this.props.investment.total_value } USD</Text>
                    </CardSection>
                </Card>
                <CardSection style={styles.cardSectionListStyle}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </CardSection>
            </View>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
    },
    cardSectionListStyle: {
        top: 30
    }
};

const mapStateToProps = state => {
    const myCoins = _.map(state.myCoins, (val, uid) => {
        return {...val, uid}
    });

    const {coins, investment} = state;
    return {myCoins, coins, investment};
};

export default connect(mapStateToProps, {calculateInvestment})(Investment);
