import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import routeName from '@/routes/routeName';
import auth from '@/util/auth';
import { useUserStore } from '@/store/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserApi } from '@/api/user';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import { checkAndNavigateOnboarding } from '@/constants';

export default function MainPage() {
    const navigation = useNavigation<any>();
    const { data, isLoading } = useQuery(getCurrentUserApi);
    const { setUser } = useUserStore();
    console.log(data?.data?.onboarding.updatedAt, 'jhjh');
    useEffect(() => {
        if (data?.data) {
            console.log('2');
            setUser(data.data);
            const onboardingData = data?.data?.onboarding.updatedAt;
        }
    }, [data, setUser]);
    useEffect(() => {
        const checkToken = async () => {
            const token = await auth.accessToken();
            if (token) {
                const onboardingData = data?.data?.onboarding?.updatedAt ?? null;
                await checkAndNavigateOnboarding(navigation, onboardingData);
            } else {
                auth.logout();
                navigation.replace(routeName.LOGIN);
            }
        };
        if (!isLoading) {
            setTimeout(() => {
                checkToken();
            }, 1000);
        }
    }, [isLoading, navigation]);

    return (
        <GradientLayout>
            <View className="flex-1 justify-center items-center ">
                <Image source={require('@/assets/images/logo.png')} className="  h-[121px] w-[114px]  " />
            </View>
        </GradientLayout>
    );
}
