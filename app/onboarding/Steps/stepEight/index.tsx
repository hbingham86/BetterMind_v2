import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import CustomButton from '@/components/CustomButton';
import InputComp from '@/components/Input';
import styles from './styles';
import onboardingStyles from '../../styles';
import { useOnboardingStore } from '@/store/useOnboardingStore'; // Import the store
import { dailyOnboardingApi } from '@/api/Onboarding';
import { useMutation } from '@tanstack/react-query';

interface StepProps {
    onNext: () => void;
}

const Stepeight: FC<StepProps> = ({ onNext }) => {
    const methods = useForm({
        defaultValues: {
            goal: '',
        },
    });
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const { feeling, botResponse, setFeeling } = useOnboardingStore();

    const buttons = [{ name: 'Feel more confident' }, { name: 'Reduce stress' }, { name: 'Track emotions' }];

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
        methods.setValue('goal', '');
    };
    const goal = methods.watch('goal');
    const { mutateAsync: dailyOnboarding } = useMutation({
        mutationFn: dailyOnboardingApi.mutationFn,
    });

    useEffect(() => {
        if (goal && activeButton) {
            setActiveButton(null);
        }
    }, [goal, activeButton]);
    const handleSubmit = async () => {
        const requestBody = {
            botResponse: botResponse,
            mood: feeling,
            dailyGoal: goal || activeButton,
        };
        const response = await dailyOnboarding(requestBody);
        if ('data' in response) {
            setFeeling('');
            onNext();
        }
    };

    const isFormValid = activeButton || methods.getValues('goal');

    return (
        <View>
            <Text style={onboardingStyles.heading2}>Set the Tone for</Text>
            <View style={onboardingStyles.stepContent}>
                <Text style={onboardingStyles.heading2}>Your Day</Text>
            </View>
            <FormProvider {...methods}>
                <Text style={styles.text}>
                    What’s one goal you’d like to achieve with <Text style={styles.bold}>BetterMind</Text>?
                </Text>
                <View style={styles.cont}>
                    {buttons.map((button, index) => (
                        <CustomButton
                            style={styles.btn}
                            key={index}
                            onPress={() => handleButtonClick(button.name)}
                            enabledTextColor={activeButton === button.name ? 'black' : 'white'}
                            enabledGradientColors={activeButton === button.name ? ['#00FFBE', '#00DDFF'] : ['#0A2F36', '#0A2F36']}
                        >
                            {button.name}
                        </CustomButton>
                    ))}
                    <Text style={styles.text2} className="mt-2">
                        Or...
                    </Text>
                    <Text style={styles.text2} className="font-medium">
                        Not feeling these? No worries, tell us what you're aiming for!
                    </Text>
                    <InputComp
                        placeholder="We’re here to listen. What's your goal?"
                        name="goal"
                        multiline
                        borderRadius={20}
                        value={methods.watch('goal')}
                        backgroundColor="#0A2F36"
                        borderColor="#0A2F36"
                    />
                </View>
                <View style={onboardingStyles.center} className="">
                    <CustomButton style={onboardingStyles.buttonStyle} onPress={handleSubmit} disable={!isFormValid}>
                        Next
                    </CustomButton>
                </View>{' '}
            </FormProvider>
        </View>
    );
};

export default Stepeight;
