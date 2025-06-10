import { View, Text } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputComp from '../../../../components/Input';
import ShineSvg from '@/SVG/ShineSvg';
import styles from './styles';
import CustomButton from '@/components/CustomButton';
import onboardingStyles from '../../styles';
import { getUserByIDApi } from '@/api/user';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';

interface StepProps {
    onNext: () => void;
}

const schema = yup.object().shape({
    AiName: yup.string().required('*Required.').min(3, 'AI name must be at least 3 characters long.'),
});

const StepFive: FC<StepProps> = ({ onNext }) => {
    const methods = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const { user, setUser } = useUserStore();
    const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
    const { setBotResponse } = useOnboardingStore();
    const buttonOptions = ['Listen', 'Offer Solutions', 'Distract Me', 'Motivate Me'];

    useEffect(() => {
        setBotResponse(selectedButtons);
    }, [selectedButtons, setBotResponse]);

    const handleButtonClick = (buttonLabel: string) => {
        setSelectedButtons((prev) => (prev.includes(buttonLabel) ? prev.filter((label) => label !== buttonLabel) : [...prev, buttonLabel]));
    };

    const {
        handleSubmit,
        formState: { isValid },
    } = methods;
    const { mutateAsync: Addname } = useMutation({
        mutationFn: getUserByIDApi.mutationFn,
    });

    const handleNext = handleSubmit(async (data) => {
        const { AiName } = data;
        const response = await Addname({
            // userId,
            body: {
                AiName,
            },
        });
        if ('data' in response && user) {
            onNext();
            setUser({
                ...user,
                AiName: AiName,
            });
        }
    });

    return (
        <View>
            <Text style={onboardingStyles.heading2}>Personalize Your</Text>
            <View style={onboardingStyles.stepContent}>
                <Text style={onboardingStyles.heading2}>Companion Experience</Text>
            </View>
            <FormProvider {...methods}>
                <InputComp
                    name="AiName"
                    label="Give your AI companion a name for a more personal experience."
                    placeholder="Give Your AI a name"
                    keyboardType="default"
                    leftIcon={<ShineSvg />}
                />
                <Text style={styles.heading}>How should your bot respond?</Text>
                <View className="mt-4 mb-9" style={styles.buttonRow}>
                    {buttonOptions.map((option, index) => (
                        <CustomButton
                            key={index}
                            style={styles.btn}
                            enabledTextColor={selectedButtons.includes(option) ? 'black' : 'white'}
                            enabledGradientColors={selectedButtons.includes(option) ? ['#00FFBE', '#00DDFF'] : ['#092E35', '#092E35']}
                            onPress={() => handleButtonClick(option)}
                        >
                            {option}
                        </CustomButton>
                    ))}
                </View>
                <View style={onboardingStyles.center} className="mt-10">
                    <CustomButton style={onboardingStyles.buttonStyle} onPress={handleNext} disable={!isValid || selectedButtons.length === 0}>
                        Next
                    </CustomButton>
                </View>
            </FormProvider>
        </View>
    );
};

export default StepFive;
