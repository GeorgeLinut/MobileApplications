import React, {Component} from 'react';
import SmoothLineChart from '../charts/SmoothLineChart';
import {Text, View} from "react-native";
import {getCoinHistory} from "../../actions";
import {connect} from "react-redux";
import {Spinner} from "../common/Spinner";
import {CardSection} from "../common/CardSection";

class CoinChart extends Component {

    renderChart() {
        if (this.props.loading) {
            return (
                <Spinner size="large" spinnerViewStyle={styles.spinnerViewStyle}/>
            );
        }
        if (this.props.failed) {
            return (
                <CardSection>
                    <Text style={styles.textStyle}>Could not get history</Text>
                </CardSection>
            );
        }
        return (
            <SmoothLineChart data={this.props.coinHistory} />
        );
    }

    render() {
        return (
            <View>
                {this.renderChart()}
            </View>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 16,
        fontWeight: '400',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5
    },
    spinnerViewStyle: {
        top: 210
    }
};

const mapStateToProps = state => {
    const { coinHistory, failed, loading } = state.coinDetails;
    return { coinHistory, failed, loading };
};

export default connect(mapStateToProps, { getCoinHistory })(CoinChart);
