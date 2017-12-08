import React, {Component} from 'react';
import {ListView, View} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {myCoinsFetch} from '../../actions';
import MyCoinItem from "./MyCoinItem";
import {CardSection} from "../common/CardSection";
import {Button} from "../common/Button";
import { Actions } from 'react-native-router-flux';


class MyCoinList extends Component {
    componentWillMount() {
        this.props.myCoinsFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({myCoins}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(myCoins);
    }

    renderRow(coin) {
        return (
            <MyCoinItem myCoin={coin}/>
        );
    }

    displayInvestment() {
        Actions.investment();
    }

    render() {
        return (
            <View>
                <CardSection>
                    <Button onPress={this.displayInvestment.bind(this)}>Investment</Button>
                </CardSection>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const myCoins = _.map(state.myCoins, (val, uid) => {
        return {...val, uid};
    });
    return {myCoins};
};

export default connect(mapStateToProps, {myCoinsFetch})(MyCoinList);
