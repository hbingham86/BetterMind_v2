import React, { FC, useState } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import CustomButton from '@/components/CustomButton';
import onboardingStyles from '../../styles';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import PremiumBenefitsModal from '@/components/PremiumBenefitsModal';
import { UseFeelingData } from '@/Data/UseFeelingData';

interface StepProps {
    onNext: () => void;
    isPremium?: any;
}

const StepSeven: FC<StepProps> = ({ onNext, isPremium }) => {
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const { setFeeling, feeling } = useOnboardingStore();
    const { feelingData } = UseFeelingData();
    const handleButtonClick = (buttonText: string, hasPremium: boolean) => {
        if (hasPremium) {
            setModalVisible(true);
            return;
        }
        setFeeling(buttonText);
        setError(null);
    };

    return (
        <View>
            <Text style={onboardingStyles.heading2}>Let’s Start with</Text>
            <View style={onboardingStyles.stepContent}>
                <Text style={onboardingStyles.heading2}>How You’re Feeling?</Text>
            </View>
            <Text style={styles.text}>I’m feeling...</Text>
            <View style={styles.buttonRow}>
                {feelingData.map((button: any, index: any) => (
                    <CustomButton
                        key={index}
                        style={[styles.btn, button.haspremium ? { borderWidth: 2, borderColor: '#FFD700' } : {}]}
                        enabledTextColor={button.haspremium ? '#FFD700' : feeling === button.text ? '#0A2F36' : '#A5A5A5'}
                        enabledGradientColors={
                            feeling === button.text ? ['#00FFBE', '#00DDFF'] : button.haspremium ? ['#092E35', '#092E35'] : ['#0A2F36', '#0A2F36']
                        }
                        onPress={() => handleButtonClick(button.text, button.haspremium)}
                    >
                        {button.text}
                    </CustomButton>
                ))}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={onboardingStyles.center} className="mt-10">
                <CustomButton style={onboardingStyles.buttonStyle} onPress={onNext} disable={!feeling}>
                    Next
                </CustomButton>
            </View>
            <PremiumBenefitsModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
};

export default StepSeven;
