import React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native'; 
import MoodMonthChartStyles from './styles';
import { moodColors } from '@/constants';

interface MoodPercentage {
    mood: string;
    percentage: number;
    period: string;
    sentiment: string;
}
interface Props {
    moodData?: { data?: { moodPercentage: MoodPercentage[] } };
}

const MoodMonthChart: React.FC<Props> = ({ moodData }) => {
    const data =
        moodData?.data?.moodPercentage?.map((item) => ({
            x: item.mood,
            y: item.percentage || 0,
            color: moodColors[item.mood] || '#808080',
        })) || [];

    const displayData = data.length > 0 ? data : [{ x: 'No Data', y: 1, color: '#D3D3D3' }];
    return (
        <View style={MoodMonthChartStyles.container}>
            <View style={{ width: 300, height: 300, alignItems: 'center', justifyContent: 'center' }}>
                {/* <VictoryPie
                    data={displayData}
                    width={300}
                    height={300}
                    colorScale={displayData.map((d) => d.color)}
                    innerRadius={50}
                    labelComponent={<></>}
                    padAngle={0}
                    style={{
                        labels: { fill: 'white', fontSize: 14, fontWeight: 'bold' },
                    }}
                /> */}
            </View>
            {data.length > 0 ? (
                <View style={MoodMonthChartStyles.legendContainer}>
                    {data.map((item, index) => (
                        <View key={index} style={MoodMonthChartStyles.legendItem}>
                            <View style={[MoodMonthChartStyles.legendColor, { borderColor: item.color }]} />
                            <Text style={MoodMonthChartStyles.legendText}>{item.x}</Text>
                            <Text style={MoodMonthChartStyles.legendPercentage}>{item.y}%</Text>
                        </View>
                    ))}
                </View>
            ) : (
                <Text style={MoodMonthChartStyles.legendText}>No mood data available</Text>
            )}
        </View>
    );
};

export default MoodMonthChart;
