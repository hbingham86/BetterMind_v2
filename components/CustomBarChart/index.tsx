import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import { Rect, G, Defs, Pattern, Path, Line } from 'react-native-svg';
import { getMoodTracking } from '@/api/Home';
import { useQuery } from '@tanstack/react-query';

const screenWidth = Dimensions.get('window').width;

interface Props {
    duration?: string;
}

const sentimentValueMapping: Record<string, number> = {
    Positive: 3,
    Neutral: 0,
    Negative: -3,
};

const CustomBarChart: React.FC<Props> = ({ duration = 'Last Week' }) => {
    const { data: getMood } = useQuery(getMoodTracking(duration));
    const getXAxisLabels = (duration: string) => {
        if (duration === 'Last Week') {
            return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        } else if (duration === 'Last Month') {
            return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        } else if (duration === 'Last Year') {
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        }
        return [];
    };

    const xAxisLabels = getXAxisLabels(duration);
    const moodData = new Array(xAxisLabels.length).fill(null);
    if (getMood?.data?.moodRating) {
        getMood.data.moodRating.forEach((rating: any) => {
            let periodIndex = -1;
            if (duration === 'Last Week') {
                periodIndex = xAxisLabels.findIndex((label) => label.toLowerCase() === rating.period.toLowerCase());
            } else if (duration === 'Last Month') {
                const day = new Date(rating.period).getDate();
                periodIndex = Math.floor((day - 1) / 7);
            } else if (duration === 'Last Year') {
                const formattedPeriod = rating.period.charAt(0).toUpperCase() + rating.period.slice(1).toLowerCase();
                periodIndex = xAxisLabels.findIndex((label) => label === formattedPeriod);
            }
            if (periodIndex >= 0) {
                const mappedMoodValue = sentimentValueMapping[rating.sentiment] || 0;
                moodData[periodIndex] += mappedMoodValue;
            }
        });
    }

    const getBarColor = (value: number) => {
        if (value > 0) return '#00FF88';
        if (value < 0) return '#FF5555';
        return '#B0C4DE';
    };
    const getShortLabel = (label: string) => {
        if (label.includes('Week')) return label;
        return label.length > 2 ? label.substring(0, 2) : label;
    };
    const DottedLine = ({ y, value }: { y: (val: number) => number; value: number }) => (
        <Line x1="0" x2={screenWidth} y1={y(value)} y2={y(value)} stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" strokeDasharray="5,5" />
    );

    const BarDecorator = ({ x, y, bandwidth, data }: any) => (
        <G>
            <Defs>
                <Pattern id="stripedPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                    <Path d="M 0,4 L 4,0" stroke="#FF5555" strokeWidth="1" />
                </Pattern>
            </Defs>

            <DottedLine y={y} value={3} />
            <DottedLine y={y} value={0} />
            <DottedLine y={y} value={-3} />

            {data.map((value: number, index: number) => {
                const barX = x(index);
                const adjustedValue = Math.min(value, 3);
                const barY = adjustedValue > 0 ? y(adjustedValue) : y(0);
                const barHeight = Math.abs(y(adjustedValue) - y(0));

                return (
                    <G key={index}>
                        <Rect x={barX} y={barY} width={bandwidth} height={barHeight} rx={5} ry={5} fill={getBarColor(value)} />
                        {value === 0 && <Rect x={barX} y={y(0) - 2} width={bandwidth} height={3} fill="#B0C4DE" />}
                    </G>
                );
            })}
        </G>
    );
    const labels = ['Negative', 'Neutral', 'Positive'];
    return (
        <View style={{ flexDirection: 'row', height: 200, padding: 20, borderRadius: 10 }}>
            <View style={{ justifyContent: 'center', marginRight: 5 }}>
                <View style={{ width: 20, height: 10, backgroundColor: '#00FF88', marginBottom: -2, marginTop: 20, borderRadius: 2 }} />
                <View style={{ width: 20, height: 10, backgroundColor: '#B0C4DE', marginBottom: 56, marginTop: 40, borderRadius: 2 }} />
                <View style={{ width: 20, height: 10, backgroundColor: '#FF5555', marginBottom: 60, marginTop: -17, borderRadius: 2 }} />
            </View>
            <YAxis
                data={[3, 0, -3]}
                style={{ marginBottom: 30, width: 45 }}
                contentInset={{ top: -13, bottom: -5 }}
                svg={{ fontSize: 10, fill: 'white' }}
                numberOfTicks={3}
                formatLabel={(_, index) => labels[index]}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <BarChart
                    style={{ height: 120 }}
                    data={moodData}
                    svg={{ fill: 'none' }}
                    gridMin={-3}
                    gridMax={3}
                    yMin={-3}
                    yMax={3}
                    spacingInner={0.1}
                    spacingOuter={0.2}
                    contentInset={{ top: 10, bottom: 10 }}
                >
                    <BarDecorator />
                </BarChart>
                <XAxis
                    style={{ marginTop: 10 }}
                    data={xAxisLabels}
                    formatLabel={(index) => getShortLabel(xAxisLabels[index])}
                    contentInset={{ left: 20, right: 20 }}
                    svg={{ fontSize: 10, fill: 'white' }}
                />
            </View>
        </View>
    );
};

export default CustomBarChart;
