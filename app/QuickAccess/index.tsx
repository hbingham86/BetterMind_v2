import React from 'react';
import { View, Text, Pressable } from 'react-native';
import routeName from '@/routes/routeName';
import { useNavigation } from 'expo-router';
import CustomLinearGradient from '@/components/LinearGradientComp';
import QuickAccessStyles from './styles';
import EmgSvg from '@/SVG/EmgSvg';
import StartSvg from '@/SVG/StartSvg';

interface QuickAccessProps {
    moodColor: string;
    openEmergency: () => void;
    mood: string;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ openEmergency, mood }) => {
    const navigation = useNavigation<any>();
    const moodMessages: { [key: string]: string } = {
        Happy: "You're shining bright today! Keep spreading those good vibes. 😊",
        Joyful: 'Life feels lighter when joy fills the air—enjoy the moment! ✨',
        Confident: 'You’ve got this! Trust yourself and own your power. 💪',
        Hopeful: 'Better days are ahead—keep believing in yourself. 🌿',
        Neutral: 'Feeling steady? It’s okay to just be in the moment. 🌊',
        Confused: 'Things feel unclear? Take a deep breath, and let’s figure it out together. 🤔',
        Anxious: 'If your mind is racing, take it slow. You are safe, and you are not alone. 🌸',
        Sad: 'Are you feeling down? If something’s bothering you, I’m here to listen. 💙',
        Depressed: 'It’s okay to feel this way. You are not alone, and you matter. 💜',
        Despair: 'Even the darkest nights end with a sunrise. You are stronger than you think. 🌅',
        Angry: 'It’s okay to feel angry. Take a deep breath and let it out in a way that feels right. 🔥',
    };
    return (
        <>
            <View style={QuickAccessStyles.bottomContainer}>
                <View style={QuickAccessStyles.container}>
                    <CustomLinearGradient GradientColors={['#00DDFF', '#00FFBE']} style={QuickAccessStyles.moodCard}>
                        <Text style={QuickAccessStyles.moodTitle}>Today's mood - {mood}</Text>
                        <Text style={QuickAccessStyles.moodDescription}>{moodMessages[mood] || 'How are you feeling today?'}</Text>
                    </CustomLinearGradient>
                    <CustomLinearGradient GradientColors={['#00DDFF', '#00FFBE']} style={QuickAccessStyles.exerciseCard}>
                        <Pressable style={QuickAccessStyles.button} onPress={() => navigation.navigate(routeName.GUIDEDEXERCISE)}>
                            <CustomLinearGradient GradientColors={['#00DDFF', '#00FFBE']} style={QuickAccessStyles.IconContainer}>
                                <StartSvg />
                            </CustomLinearGradient>
                            <Text style={QuickAccessStyles.buttonText}>Start an Exercise</Text>
                        </Pressable>
                    </CustomLinearGradient>
                </View>
                <CustomLinearGradient GradientColors={['#00DDFF', '#00FFBE']} style={QuickAccessStyles.emergencyCard}>
                    <Pressable style={QuickAccessStyles.button} onPress={openEmergency}>
                        <CustomLinearGradient GradientColors={['#00DDFF', '#00FFBE']} style={QuickAccessStyles.emergencyIconContainer}>
                            <EmgSvg />
                        </CustomLinearGradient>
                        <Text style={QuickAccessStyles.buttonText}>Emergency</Text>
                    </Pressable>
                </CustomLinearGradient>
            </View>
        </>
    );
};

export default QuickAccess;
