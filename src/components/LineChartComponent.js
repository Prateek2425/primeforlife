import React, {useState} from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { format} from 'date-fns';
import {LineChart} from "react-native-chart-kit";

const LineChartComponent = (props) => {
    //TODO: Default image needs testing for UI and also replacing with a better image!
    if (props.data.length == 0) {
        return (
            <Image 
            source={require('../assets/testdefault.png')}
            style={{width: props.width - 20, height: 200, flex: 1}}
            resizeMethod = 'scale'
            />
        )
    } else {
        const scores = props.data.map(test => test.score);
        const labels = props.data.map(test => format(new Date(test.date), 'dd/MM'));


        return (

            <LineChart
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: scores,
                        },

                    ],
                    legend: ['Scores'],
                }}
                width= {props.width - 20}
                height= {180}
                yAxisLabel=""
                yAxisSuffix=""
                fromZero
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    },
                    propsForBackgroundLines: {
                        strokeDasharray: "",
                        strokeWidth: "0.5",
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    marginHorizontal: 10,
                    borderRadius: 16
                }}
            />
        )

    }
    
}

export default LineChartComponent;