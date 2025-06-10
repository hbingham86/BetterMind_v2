import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import ProfileStyles from '../home/profile/styles';
import TopBar from '@/components/TopBar';
import { useNavigation } from 'expo-router';
import { GuidedStyles } from './GuidedStyles';
import { RouteProp, useRoute } from '@react-navigation/native';
import JournalStyles from '../home/journal/styles';
import CustomButton from '@/components/CustomButton';

type ExerciseRouteParams = {
    params: {
        title: string;
        text: string;
    };
};

export default function ExerciseFullScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<ExerciseRouteParams, 'params'>>();
    const { title, text } = route.params;

    const [countdown, setCountdown] = useState<number | null>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef<Video>(null);

    const handleStartExercise = () => {
        setCountdown(3);
        let timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setCountdown(null);
                    setIsVideoPlaying(true);
                    videoRef.current?.playAsync();
                }
                return prev ? prev - 1 : null;
            });
        }, 1000);
    };
    const animatedValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (countdown !== null) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animatedValue, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: false,
                    }),
                    Animated.timing(animatedValue, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        }
    }, [countdown]);
    const animatedCircleStyle = {
        width: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [190, 210],
        }),
        height: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [190, 210],
        }),
        borderWidth: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [8, 12],
        }),
        borderColor: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['#ffffff', '#ffffff'],
        }),
    };
    return (
        <GradientLayout>
            <View style={[ProfileStyles.Main, { flex: 1 }]}>
                <View className="mt-10">
                    <TopBar title={title} onBackPress={() => navigation.goBack()} />
                </View>
                <View style={[GuidedStyles.main, { flex: 1 }]}>
                    <ScrollView contentContainerStyle={JournalStyles.ScrollContainer}>
                        <View style={GuidedStyles.videoContainer}>
                            <Video
                                ref={videoRef}
                                source={require('../../assets/images/vid.mp4')}
                                style={GuidedStyles.video}
                                useNativeControls
                                resizeMode={ResizeMode.CONTAIN}
                                isLooping
                            />
                        </View>
                        <Text style={GuidedStyles.head}>Get Ready</Text>
                        <Text style={GuidedStyles.txt}>{text}</Text>
                    </ScrollView>
                </View>
                {countdown === null && !isVideoPlaying && (
                    <CustomButton style={GuidedStyles.btn2} onPress={handleStartExercise}>
                        Start the Exercise
                    </CustomButton>
                )}

                {countdown !== null && (
                    <View style={GuidedStyles.overlay}>
                        <Animated.View style={[GuidedStyles.circle, animatedCircleStyle]}>
                            <View style={GuidedStyles.circle2}>
                                <Text style={GuidedStyles.countdown}>{countdown}</Text>
                            </View>
                        </Animated.View>
                    </View>
                )}
            </View>
        </GradientLayout>
    );
}
