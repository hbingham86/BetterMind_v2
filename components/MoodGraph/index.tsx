import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const MoodGraph = () => {
    const moodData = [0, 1, 2, 2, 1, 0, 1];

    const data = {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: moodData,
                strokeWidth: 3,
                color: () => '#00f2d6',
                withDots: false,
            },
        ],
    };

    return (
        <View style={{ backgroundColor: 'transparent', padding: 20, flex: 1, alignItems: 'center' }}>
            <LineChart
                data={data}
                width={Dimensions.get('window').width - 50}
                height={220}
                yAxisLabel={''}
                yLabelsOffset={10}
                withHorizontalLines={true}
                withVerticalLines={false}
                withDots={false}
                fromZero
                yAxisInterval={1}
                segments={2}
                formatYLabel={(value) => {
                    switch (Number(value)) {
                        case 2:
                            return 'Happy';
                        case 1:
                            return 'Neutral';
                        case 0:
                            return 'Sad';
                        default:
                            return '';
                    }
                }}
                chartConfig={{
                    backgroundColor: 'rgba(0,0,0,0)',
                    backgroundGradientFrom: 'rgba(0,0,0,0)',
                    backgroundGradientTo: 'rgba(0,0,0,0)',
                    decimalPlaces: 0,
                    color: () => '#00f2d6',
                    labelColor: () => '#FFF',
                    style: { borderRadius: 16 },
                    propsForBackgroundLines: { strokeDasharray: '5 5', stroke: '#FFFFFF33' },
                    fillShadowGradientFrom: 'rgba(36, 205, 229, 0.4)',
                    fillShadowGradientFromOpacity: 0.5,
                    fillShadowGradientTo: 'rgba(36, 205, 229, 0.4)',
                    fillShadowGradientToOpacity: -1,
                }}
                bezier
                style={{ borderRadius: 16 }}
            />
        </View>
    );
};

export default MoodGraph;
