import React, {Component} from 'react';
import {SmoothLine} from "react-native-pathjs-charts";
import {ScrollView, View} from "react-native";

const SmoothLineChart = (props) => {
    const options = {
        color: '#2980B9',
        margin: {
            top: 40,
            left: 80,
            bottom: 25,
            right: 20
        },
        animate: {
            type: 'delayed',
            duration: 200
        },
        axisX: {
            showAxis: true,
            showLines: true,
            showLabels: false,
            showTicks: true,
            zeroAxis: false,
            orient: 'bottom',
            label: {
                fontFamily: 'Arial',
                fontSize: 14,
                fontWeight: true,
                fill: '#34495E'
            }
        },
        axisY: {
            showAxis: true,
            showLines: true,
            showLabels: true,
            showTicks: true,
            zeroAxis: false,
            orient: 'left',
            label: {
                fontFamily: 'Arial',
                fontSize: 14,
                fontWeight: true,
                fill: '#34495E'
            }
        }
    };

    return (
        <ScrollView horizontal>
            <SmoothLine data={[props.data]} options={options} xKey='x' yKey='y'/>
        </ScrollView>
    )

};

export default SmoothLineChart;