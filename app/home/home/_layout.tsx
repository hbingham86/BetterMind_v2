import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import { useUserStore } from '@/store/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserApi } from '@/api/user';
import { ThemedText } from '@/components/ThemedText';
import HomeStyles from './styles';
import { moodColors, Moods } from '@/constants';
import { getMoodTracking } from '@/api/Home';
import EmergencyModal from '@/components/EmergencyModal';
import MoodLineChart from '@/components/MoodLineChart';
import QuickAccess from '@/app/QuickAccess';
import { ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import MoodSelector from '@/components/MoodSelector';
import MoodMonthChart from '@/components/MoodMonthChart';
import MoodGraphDropdown from '@/components/MoodGraphDropdown';

const moodValueMapping: any = {
    [Moods.HAPPY]: 10,
    [Moods.JOYFUL]: 9,
    [Moods.CONFIDENT]: 8,
    [Moods.HOPEFUL]: 7,
    [Moods.CONFUSED]: 6,
    [Moods.NEUTRAL]: 5,
    [Moods.ANXIOUS]: 4,
    [Moods.DEPRESSED]: 3,
    [Moods.DESPAIR]: 2,
    [Moods.FRUSTRATED]: 1.5,
    [Moods.ANGRY]: 1,
    [Moods.SAD]: 0,
};

export default function Home() {
    const { user, setUser, avatar } = useUserStore();
    const {
        data,
        isLoading: dataLoading,
        isFetching,
        refetch: userRefecth,
    } = useQuery({
        ...getCurrentUserApi,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [graphMenuVisible, setGraphMenuVisible] = useState(false);
    const [selectorMenuVisible, setSelectorMenuVisible] = useState(false);
    const [duration, setDuration] = useState('Last Week');
    const [selectedoption, setselectedoption] = useState('Mood Graph');
    const { data: getMood, isLoading, refetch } = useQuery(getMoodTracking(duration));

    const close = async () => {
        setIsModalVisible(false);
    };
    const open = async () => {
        setIsModalVisible(true);
    };
    useEffect(() => {
        if (data?.data) {
            setUser(data.data);
        }
    }, [data?.data, setUser, user]);
    useFocusEffect(
        useCallback(() => {
            userRefecth();
            refetch();
        }, [])
    );
    const finalMood = user?.mood?.mood;
    const moodColor = moodColors[finalMood] || '#FFFFFF';
    const options = ['Last Week', 'Last Month', 'Last Year'];
    const Graphoptions = ['Mood Graph', 'Mood Chart'];
    const getXAxisLabels = (duration: any) => {
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
                const date = new Date(rating.period);
                const dayOfMonth = date.getDate();
                if (dayOfMonth <= 7) periodIndex = 0;
                else if (dayOfMonth <= 14) periodIndex = 1;
                else if (dayOfMonth <= 21) periodIndex = 2;
                else periodIndex = 3;
            } else if (duration === 'Last Year') {
                const formattedPeriod = rating.period.charAt(0).toUpperCase() + rating.period.slice(1).toLowerCase();
                periodIndex = xAxisLabels.findIndex((label) => label === formattedPeriod);
            }
            if (periodIndex >= 0) {
                const mappedMoodValue = moodValueMapping[rating.mood] || 0;
                if (moodData[periodIndex] === null) {
                    moodData[periodIndex] = mappedMoodValue;
                } else {
                    moodData[periodIndex] += mappedMoodValue;
                }
            }
        });
    }
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [happiestDayName, setHappiestDayName] = useState<string | null>(null);
    useEffect(() => {
        if (duration === 'Last Week') {
            const happyMoodValues = [5, 6, 7, 8, 9, 10];
            let happiestDayIndex = -1;
            let maxMoodValue = -1;
            moodData.forEach((mood, index) => {
                if (mood !== null && happyMoodValues.includes(mood)) {
                    if (mood > maxMoodValue || mood === maxMoodValue) {
                        maxMoodValue = mood;
                        happiestDayIndex = index;
                    }
                }
            });
            const newHappiestDayName = happiestDayIndex !== -1 ? weekDays[happiestDayIndex] : 'No top mood day';
            setHappiestDayName(newHappiestDayName);
        }
    }, [duration, moodData]);

    return (
        <GradientLayout>
            <View style={HomeStyles.Main}>
                <View className="flex flex-row justify-between items-center gap-2 mt-20 " style={{ marginBottom: 3 }}>
                    <View className="flex flex-row justify-center items-center gap-2">
                        {avatar ? (
                            <Image src={avatar} style={HomeStyles.img} />
                        ) : user?.avatar ? (
                            <Image src={user?.avatar} style={HomeStyles.img} />
                        ) : (
                            <Pressable style={[HomeStyles.img, { backgroundColor: 'white' }]}>
                                <Text style={HomeStyles.initials}>
                                    {user?.fullName
                                        ? user.fullName
                                              .split(' ')
                                              .slice(0, 3)
                                              .map((name) => name.charAt(0).toUpperCase())
                                              .join('')
                                        : '?'}
                                </Text>
                            </Pressable>
                        )}
                        <ThemedText type="primarywhite">{user?.fullName}</ThemedText>
                    </View>
                    {/* <MaterialCommunityIcons name="bell" size={18} color="white" /> */}
                </View>
                <ScrollView
                    contentContainerStyle={HomeStyles.ScrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {dataLoading || isFetching ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 300 }}>
                            <ActivityIndicator size="small" color="white" />
                        </View>
                    ) : (
                        <Pressable
                            onPress={() => {
                                setGraphMenuVisible(false);
                                setSelectorMenuVisible(false);
                            }}
                        >
                            <QuickAccess moodColor={moodColor} openEmergency={open} mood={finalMood} />
                            <View className="flex flex-row justify-center items-center">
                                <Text style={HomeStyles.Happiest}>Happiest Day: </Text>
                                <Text style={HomeStyles.day}>{happiestDayName || 'No top mood day'}</Text>
                            </View>
                            <View className="flex flex-row justify-between items-center mb-10">
                                <MoodGraphDropdown
                                    options={Graphoptions}
                                    selectedoption={selectedoption}
                                    setselectedoption={setselectedoption}
                                    menuVisible={graphMenuVisible}
                                    setMenuVisible={(visible) => {
                                        setGraphMenuVisible(visible);
                                        if (visible) setSelectorMenuVisible(false);
                                    }}
                                />
                                <MoodSelector
                                    options={options}
                                    setDuration={setDuration}
                                    duration={duration}
                                    menuVisible={selectorMenuVisible}
                                    setMenuVisible={(visible) => {
                                        setSelectorMenuVisible(visible);
                                        if (visible) setGraphMenuVisible(false);
                                    }}
                                />
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                {isLoading ? (
                                    <ActivityIndicator size={'small'} color="white" />
                                ) : selectedoption === 'Mood Chart' ? (
                                    <MoodMonthChart moodData={getMood} />
                                ) : (
                                    <MoodLineChart moodData={moodData} mood={finalMood} xAxisLabels={xAxisLabels} />
                                )}
                            </View>
                        </Pressable>
                    )}
                </ScrollView>
                {isModalVisible && <EmergencyModal isModalVisible={isModalVisible} close={close} />}
            </View>
        </GradientLayout>
    );
}
