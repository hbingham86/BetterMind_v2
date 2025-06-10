import { View, Text } from 'react-native';
import React, { FC } from 'react';
import stepOneStyles from './styles';
import onboardingStyles from '../../styles';
import CustomButton from '@/components/CustomButton';
interface StepProps {
    onNext: () => void;
}

const Step1: FC<StepProps> = ({ onNext }) => {
    return (
        <View>
            <Text style={onboardingStyles.welcome}>Welcome to </Text>
            <View style={onboardingStyles.stepContent}>
                <Text style={onboardingStyles.heading}>BetterMind</Text>
            </View>
            <Text style={stepOneStyles.Text}>
                Your personalized mental health companion. We’re here to help you feel understood, supported, and empowered, every step of the way.
                Track your moods, reflect on your experiences, and grow with a trusted AI companion, dedicated to your emotional well-being. Together,
                we’ll build a healthier, happier you.
            </Text>
            <View style={onboardingStyles.center}>
                <CustomButton style={onboardingStyles.buttonStyle} onPress={onNext}>
                    Let’s go
                </CustomButton>
            </View>
        </View>
    );
};

export default Step1;
