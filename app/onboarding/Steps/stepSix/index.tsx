import { View, Text } from 'react-native';
import React, { FC } from 'react';
import styles from './styles';
import CustomButton from '@/components/CustomButton';
import onboardingStyles from '../../styles';
import { useNavigation } from 'expo-router';
import routeName from '@/routes/routeName';
interface StepProps {
    onNext: () => void;
}
const StepSix: FC<StepProps> = ({ onNext }) => {
    const navigation = useNavigation<any>();

    return (
        <>
            <Text style={onboardingStyles.heading2}>Your Data, </Text>
            <View style={onboardingStyles.stepContent}>
                <Text style={onboardingStyles.heading2}>Our Priority</Text>
            </View>
            <View style={styles.cont}>
                <Text style={styles.Text}>
                    Your data is in safe hands. We prioritize your privacy by ensuring everything is stored securely and encrypted. Whether locally or
                    in compliance with industry standards like GDPR/HIPAA, your information remains confidential. For more details, review our privacy
                    policy.
                </Text>
                <CustomButton
                    enabledTextColor="#FFFFFF"
                    enabledGradientColors={['#092E35', '#092E35']}
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate(routeName.PRIVACYPOLICY)}
                >
                    Take me there
                </CustomButton>
            </View>
            <View style={onboardingStyles.center} className="mt-5">
                <CustomButton style={onboardingStyles.buttonStyle} onPress={onNext}>
                    Got It, Thanks!
                </CustomButton>
            </View>
        </>
    );
};
export default StepSix;
