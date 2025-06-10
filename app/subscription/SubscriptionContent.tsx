import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import subscriptionStyles from './styles';
import { ThemedText } from '@/components/ThemedText';
import CheckedSvg from '@/SVG/CheckedSvg';
import CustomButton from '@/components/CustomButton';
import CustomLinearGradient from '@/components/LinearGradientComp';
import { useMutation } from '@tanstack/react-query';
import { ConfirmPayment, SubscriptionAPI } from '@/api/Subscription';
import routeName from '@/routes/routeName';
import { useNavigation } from 'expo-router';
import PremiumBenefitsModal from '@/components/PremiumBenefitsModal';
import { initPaymentSheet, presentPaymentSheet, retrievePaymentIntent } from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native-paper';
import { useUserStore } from '@/store/useUserStore';
import dayjs from 'dayjs';

const todayDate = dayjs().format('MMM D, YYYY');

export default function SubscriptionContent() {
    const [selectedPlan, setSelectedPlan] = useState<'Yearly' | 'Monthly' | null>('Yearly');
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const navigation = useNavigation<any>();
    const { setUser, user } = useUserStore();
    const [loading, setLoading] = useState(false);
    const { mutateAsync: subscribe } = useMutation({
        mutationFn: SubscriptionAPI.mutationFn,
    });
    const { mutateAsync: Payment } = useMutation({
        mutationFn: ConfirmPayment.mutationFn,
    });
    const fetchPaymentIntentClientSecret = async () => {
        const requestBody = { planName: selectedPlan };
        const response = await subscribe(requestBody);
        if (response?.data?.client_secret) {
            setLoading(false);
            return response.data.client_secret;
        }
    };
    const handleSubscribe = async () => {
        setLoading(true);
        const clientSecret = await fetchPaymentIntentClientSecret();
        if (!clientSecret) {
            setLoading(false);
            return;
        }
        const { error } = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: 'BetterMind Premium',
        });
        if (error) {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: error.message,
            });
            return;
        }
        const { error: paymentError }: any = await presentPaymentSheet();
        setLoading(false);
        if (paymentError) {
            Toast.show({
                type: 'error',
                text1: paymentError.message,
            });
            console.log(paymentError.message, 'paymentError.message,');
        } else {
            setLoading(false);
            const { error: retrieveError, paymentIntent: retrievedPaymentIntent } = await retrievePaymentIntent(clientSecret);
            if (retrieveError) {
                Toast.show({
                    type: 'error',
                    text1: retrieveError.message,
                });
            } else {
                // Toast.show({
                //     type: 'success',
                //     text1: 'Payment completed!',
                // });
                navigation.replace(routeName.HOME);
                const paymentMethodId = retrievedPaymentIntent?.paymentMethodId;
                const paymentIntentId = retrievedPaymentIntent?.id;
                const requestBody = {
                    paymentMethodId: paymentMethodId,
                    paymentIntentId: paymentIntentId,
                };
                const response = await Payment(requestBody);
                if ('data' in response) {
                    if (user) {
                        const updatedUser = { ...user, isPremium: true };
                        setUser(updatedUser);
                    }
                }
            }
        }
        setLoading(false);
    };

    const toggleBottomSheet = () => {
        setIsBottomSheetVisible(!isBottomSheetVisible);
    };

    return (
        <>
            <View style={subscriptionStyles.Main}>
                <View style={subscriptionStyles.center}>
                    <Image source={require('../../assets/images/logo.png')} className=" h-[121px] w-[114px]  " />
                </View>
                <Text style={subscriptionStyles.heading}>BetterMind Premium</Text>

                {selectedPlan === 'Yearly' && (
                    <CustomLinearGradient
                        style={subscriptionStyles.gradientTop}
                        GradientColors={['#1EBEBB', '#1BC2A0']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                    >
                        <Text>7-day free trial</Text>
                    </CustomLinearGradient>
                )}

                <CustomButton
                    style={[
                        subscriptionStyles.gradient,
                        selectedPlan === 'Yearly' && {
                            borderColor: '#1EBEBB',
                            borderWidth: 2,
                        },
                    ]}
                    enabledGradientColors={['#012027', '#092E35']}
                    onPress={() => setSelectedPlan('Yearly')}
                >
                    <View className="flex-row justify-between gap-1 flex ">
                        <View>
                            <View className="flex flex-row gap-5">
                                <ThemedText type="defaultSemiBold">Yearly</ThemedText>
                                <CustomLinearGradient
                                    style={subscriptionStyles.off}
                                    GradientColors={['#1EBEBB', '#1BC2A0']}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                >
                                    <Text>12% off</Text>
                                </CustomLinearGradient>
                            </View>
                            <View className="flex flex-row gap-5 ">
                                <ThemedText type="defaultSemiBold">$84.99 / year</ThemedText>
                                <ThemedText type="defaultSemiBold" style={{ textDecorationLine: 'line-through' }}>
                                    $96.00 / year
                                </ThemedText>
                            </View>
                            <ThemedText type="sec" className="mt-2">
                                $6.99 / month
                            </ThemedText>
                            <ThemedText type="sec" className="mt-1">
                                Billed yearly, starting from {todayDate}. Cancel anytime.
                            </ThemedText>
                        </View>
                        {selectedPlan === 'Yearly' && <CheckedSvg />}

                    </View>
                </CustomButton>

                <CustomButton
                    style={[
                        subscriptionStyles.gradient,
                        selectedPlan === 'Monthly' && {
                            borderColor: '#1EBEBB',
                            borderWidth: 2,
                        },
                    ]}
                    enabledGradientColors={['#012027', '#092E35']}
                    onPress={() => setSelectedPlan('Monthly')}
                >
                    <View className="flex-row justify-between gap-1 flex w-full">
                        <View>
                            <ThemedText type="defaultSemiBold">Monthly</ThemedText>
                            <View className="flex flex-row gap-5">
                                <ThemedText type="defaultSemiBold">$7.99 / month</ThemedText>
                            </View>
                        </View>
                        {selectedPlan === 'Monthly' && <CheckedSvg />}
                    </View>
                </CustomButton>
                <CustomButton enabledGradientColors={['transparent', 'transparent']} enabledTextColor="white" onPress={toggleBottomSheet}>
                    <ThemedText type="link">Explore premium perks</ThemedText>
                </CustomButton>
                <View className="flex justify-center items-center mt-8">
                    <CustomButton style={subscriptionStyles.buttonStyle} onPress={handleSubscribe}>
                        {loading ? <ActivityIndicator size="small" color="#fff" /> : 'Subscribe'}
                    </CustomButton>
                    <CustomButton
                        enabledGradientColors={['transparent', 'transparent']}
                        enabledTextColor="white"
                        onPress={() => navigation.replace(routeName.HOME)}
                    >
                        No, thank you.
                    </CustomButton>
                </View>
            </View>
            <PremiumBenefitsModal isVisible={isBottomSheetVisible} onClose={toggleBottomSheet} />
        </>
    );
}
