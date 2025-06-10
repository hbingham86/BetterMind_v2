import { View, Image, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import onboardingStyles from './styles';
import Step1 from './Steps/Step1';
import Step2 from './Steps/stepTwo';
import StepThree from './Steps/stepThree';
import StepFive from './Steps/stepFive';
import StepSix from './Steps/stepSix';
import StepSeven from './Steps/stepSeven';
import Stepeight from './Steps/stepEight';
import { useNavigation } from 'expo-router';
import routeName from '@/routes/routeName';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserApi } from '@/api/user';
import { useUserStore } from '@/store/useUserStore';

export default function Onboarding() {
    const { user, setUser } = useUserStore();
    const { data, isLoading: isQueryLoading } = useQuery(getCurrentUserApi);
    const [currentStep, setCurrentStep] = useState(0);
    useEffect(() => {
        if (data?.data) {
            setUser(data.data);
        }
    }, [data?.data, setUser, user]);
    const isLoading = isQueryLoading || user === null;
    const totalSteps = data?.data?.fullName ? 2 : 7;
    const navigation = useNavigation<any>();
    const handleNextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prevStep) => {
                if (data?.data?.fullName && prevStep === 1) {
                    return prevStep + 1;
                }
                return prevStep + 1;
            });
        } else {
            if (data?.data?.isPremium) {
                navigation.replace(routeName.HOME);
            } else {
                navigation.replace(routeName.SUBSCRIPTION);
            }
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prevStep) => {
                if (data?.data?.fullName && prevStep === 3) {
                    return prevStep - 1;
                }
                return prevStep - 1;
            });
        }
    };

    const steps = [
        ...(data?.data?.fullName
            ? []
            : [
                  <Step1 onNext={handleNextStep} />,
                  <StepThree onNext={handleNextStep} />,
                  <Step2 onNext={handleNextStep} />,
                  //   <StepFour onNext={handleNextStep} />,
                  <StepFive onNext={handleNextStep} />,
              ]),
        ...(data?.data?.fullName ? [] : [<StepSix onNext={handleNextStep} />]),
        <StepSeven onNext={handleNextStep} isPremium={data?.data?.isPremium} />,
        <Stepeight onNext={handleNextStep} />,
    ];

    return (
        <GradientLayout>
            {isLoading ? (
                <View style={onboardingStyles.center}>
                    <Image source={require('../../assets/images/logo.png')} className="  h-[121px] w-[114px]  " />
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >
                    <>
                        {currentStep > 0 && (
                            <Pressable style={onboardingStyles.backbtn} onPress={handlePreviousStep}>
                                <Image source={require('../../assets/images/back.png')} />
                            </Pressable>
                        )}
                        <View style={onboardingStyles.Main}>
                            <View style={onboardingStyles.center}>
                                <Image source={require('../../assets/images/logo.png')} className="  h-[121px] w-[114px]  " />
                            </View>

                            <View style={onboardingStyles.content}>{steps[currentStep]}</View>

                            <View style={onboardingStyles.stepperContainer}>
                                {Array.from({ length: totalSteps }).map((_, index) => (
                                    <View key={index} style={[onboardingStyles.stepDot, index === currentStep && onboardingStyles.activeStepDot]} />
                                ))}
                            </View>
                        </View>
                    </>
                </ScrollView>
            )}
        </GradientLayout>
    );
}
