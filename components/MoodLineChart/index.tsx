import React from 'react';
import { View, Text } from 'react-native';
import { LineChart, Grid, XAxis, AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface MoodLineChartProps {
    moodData: (number | null)[];
    mood?: string;
    xAxisLabels: string[];
}

const MoodLineChart: React.FC<MoodLineChartProps> = ({ moodData, xAxisLabels }) => {
    // const moodColor = moodColors[mood] || '#01F0D9';
    type MoodLabel = {
        mood: 'Happy' | 'Neutral' | 'Sad';
        value: number;
        icon: 'emoticon-happy' | 'emoticon-neutral' | 'emoticon-sad';
    };
    const yAxisLabels: MoodLabel[] = [
        { mood: 'Happy', value: 10, icon: 'emoticon-happy' },
        { mood: 'Neutral', value: 5.5, icon: 'emoticon-neutral' },
        { mood: 'Sad', value: 1, icon: 'emoticon-sad' },
    ];
    const getShortLabel = (label: string) => {
        return label.includes('Week') ? label : label.substring(0, 2);
    };
    const renderYAxisLabels = () => {
        return yAxisLabels.map(({ mood, value, icon }) => (
            <View
                key={value}
                style={{
                    position: 'absolute',
                    top: `${100 - (value / 10) * 100}%`,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <MaterialCommunityIcons name={icon} size={20} color={'#01F0D9'} style={{ marginRight: 2 }} />
                <Text style={{ color: 'white', fontSize: 10 }}>{mood}</Text>
            </View>
        ));
    };
    const Decorator = ({ x, y, data }: { x: (index: number) => number; y: (value: number | null) => number; data: (number | null)[] }) =>
        data.map((value, index) =>
            value !== null ? (
                <View
                    key={index}
                    style={{
                        position: 'absolute',
                        left: x(index) - 4,
                        top: y(value) - 4,
                        width: 8,
                        height: 8,
                        backgroundColor: '#01F0D9',
                        borderRadius: 9999,
                    }}
                />
            ) : null
        );

    return (
        <View style={{ flexDirection: 'row', height: 300 }}>
            <View style={{ width: 55, justifyContent: 'space-between', position: 'relative' }}>{renderYAxisLabels()}</View>
            <View style={{ flex: 1, marginLeft: 10, height: 300 }}>
                <AreaChart
                    style={{ position: 'absolute', height: '100%', width: '100%' }}
                    data={moodData}
                    yMin={0}
                    yMax={10}
                    curve={shape.curveNatural}
                    contentInset={{ top: 10, bottom: 20, left: 5, right: 5 }}
                    svg={{ fill: `${'#124f64'}30` }}
                />
                <LineChart
                    style={{ flex: 1 }}
                    data={moodData}
                    svg={{ stroke: '#01F0D9', strokeWidth: 3 }}
                    contentInset={{ top: 10, bottom: 10, left: 5, right: 5 }}
                    yMin={0}
                    yMax={10}
                    numberOfTicks={3}
                    curve={shape.curveNatural}
                >
                    <Grid
                        direction={Grid.Direction.HORIZONTAL}
                        ticks={[1, 5.5, 10]}
                        svg={{ stroke: '#FFFFFF33', strokeDasharray: [4, 2], strokeWidth: 1 }}
                    />
                    <Decorator x={(index) => index} y={(value) => value || 0} data={moodData} />
                </LineChart>
                <XAxis
                    data={moodData}
                    formatLabel={(index) => getShortLabel(xAxisLabels[index])}
                    contentInset={{ left: 20, right: 20 }}
                    svg={{ fontSize: 10, fill: 'white' }}
                />
            </View>
        </View>
    );
};

export default MoodLineChart;
