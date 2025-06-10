import { View, Text, Image } from 'react-native';
import HomeStyles from '../home/home/styles';
import { moodColors, moodImages } from '@/constants';

export const TodayMood = ({ mood }: { mood: string }) => {
    const moodColor = moodColors[mood] || '#FFFFFF';
    const moodImage = moodImages[mood] || require('../../assets/images/Neutral.png');
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('en-GB', { month: 'short' });
    return (
        <View style={[HomeStyles.FirstCont, { backgroundColor: moodColor }]}>
            <View className="flex flex-row items-center gap-2">
                <View style={HomeStyles.dateCont}>
                    <Text style={HomeStyles.dayText}>{month}</Text>
                    <Text style={HomeStyles.dateText}>{day}</Text>
                </View>
                <View>
                    <Text style={HomeStyles.txt}>today’s</Text>
                    <Text style={HomeStyles.txt}>mood</Text>
                </View>
            </View>
            <View style={[HomeStyles.divider]} />
            <View className="flex flex-row items-center gap-1">
                <Image source={moodImage} />
                <Text style={HomeStyles.txt} className="">
                    {mood}
                </Text>
            </View>
        </View>
    );
};
