import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { coinsFetch } from '../../actions/index';
import CoinItem from './CoinItem';

class CoinList extends Component {
    componentWillMount() {
        this.props.coinsFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ coins }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(coins);
    }

    renderRow(coin) {
        return (
            <CoinItem coin={coin} />
        );
    }
    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = state => {
    return { coins: state.coins };
};

export default connect(mapStateToProps, { coinsFetch })(CoinList);
