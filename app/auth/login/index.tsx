import React, { useState } from 'react';
import { View, Text, Image, Pressable, Keyboard } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ILoginFormValues } from './types';
import { schema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComp from '@/components/Input';
import Loginstyles from './styles';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from '@/components/CustomButton';
import { useMutation } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native-paper';
import auth from '@/util/auth';
import { loginApi, OAuthloginApi } from '@/api/authentication';
import routeName from '@/routes/routeName';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useSSO, useUser } from '@clerk/clerk-expo';
import { useCallback, useEffect } from 'react';

export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};
export default function Login() {
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);
    const methods = useForm<ILoginFormValues>({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });
    const {
        handleSubmit,
        formState: { isValid },
    } = methods;

    const { mutateAsync: loginUser } = useMutation({
        mutationFn: loginApi.mutationFn,
    });
    const handleLogin: SubmitHandler<ILoginFormValues> = async (data) => {
        Keyboard.dismiss();
        setLoading(true);
        try {
            const response = await loginUser(data);
            if ('data' in response) {
                const { accessToken, refreshToken } = response.data;
                auth.updateTokens(accessToken, refreshToken);
                await AsyncStorage.setItem('authToken', accessToken);
                // await checkAndNavigateOnboarding(navigation);
                navigation.replace(routeName.MAINPAGE);
            }
            setLoading(false);
        } catch (error: any) {
            if (error.isAxiosError) {
                if (error.response?.data?.data?.isVerified === false) {
                    navigation.navigate(routeName.RESENDVERIFICATION, {
                        email: data.email,
                        screenName: 'login',
                    });
                    setLoading(false);
                }
            }
        }
        methods.reset();
        setLoading(false);
    };
    const register = () => {
        navigation.replace(routeName.REGISTER);
    };

    useWarmUpBrowser();
    const { mutateAsync: OAuthAPi } = useMutation({
        mutationFn: OAuthloginApi.mutationFn,
    });
    const { startSSOFlow } = useSSO();
    const [createdSessionId, setCreatedSessionId] = useState<any>();
    const [getGoogle, setgetGoogle] = useState(false);
    const [authloading, setauthLoading] = useState(false);

    const onPress = useCallback(async () => {
        setauthLoading(true);
        try {
            const response = await startSSOFlow({
                strategy: 'oauth_google',
                redirectUrl: AuthSession.makeRedirectUri(),
            });
            const { createdSessionId, setActive } = response;
            console.log(response, 'response');
            setCreatedSessionId(createdSessionId);
            if (createdSessionId) {
                await setActive!({ session: createdSessionId });
                setgetGoogle(true);
            }
            setauthLoading(false);
        } catch (err) {
            setauthLoading(false);
            console.error('Error during authentication:', JSON.stringify(err, null, 2));
        }
    }, []);

    const user = useUser();
    const getUser = async () => {
        setauthLoading(true);
        setgetGoogle(true);
        const email = user.user?.primaryEmailAddress?.emailAddress;
        const profilePicture = user.user?.imageUrl;
        const sessionId = createdSessionId;
        const userId = user.user?.id;
        const payload = { email, profilePicture, sessionId, userId };
        try {
            setgetGoogle(false);
            const res = await OAuthAPi(payload);
            if ('data' in res) {
                const accToken = res.data.accessToken;
                const reTokrn = res.data.refreshToken;
                auth.updateTokens(accToken, reTokrn);
                await AsyncStorage.setItem('authToken', accToken);
                console.log('this runs');
                navigation.replace(routeName.MAINPAGE);
            }
            setauthLoading(false);
        } catch (error) {
            setauthLoading(false);
            console.error('Error during authentication:', error);
        }
        setgetGoogle(false);
        setauthLoading(false);
    };
    useEffect(() => {
        if (getGoogle) {
            getUser();
        }
    }, [getGoogle]);

    return (
        <GradientLayout>
            <View style={Loginstyles.Main}>
                <FormProvider {...methods}>
                    <View style={Loginstyles.container}>
                        <Image
                            source={require('@/assets/images/logo.png')}
                            className="relative  h-[119px] w-[148px]  top-6 z-10"
                            // style={Loginstyles.img}
                        />
                        <View className="bg-[#203133]  w-full" style={Loginstyles.Box}>
                            <ThemedText type="title" className="mt-2 text-center">
                                Log In
                            </ThemedText>
                        </View>
                    </View>
                    <View className="bg-[#203133]  w-full" style={Loginstyles.Box}>
                        <InputComp
                            name="email"
                            label="Email Address"
                            placeholder="Enter email address"
                            keyboardType="email-address"
                            leftIcon={<Fontisto name="email" size={20} color="#fff" />}
                        />
                        <InputComp
                            name="password"
                            label="Password"
                            keyboardType="default"
                            isPassword={true}
                            placeholder=" Enter account password"
                            leftIcon={<Feather name="lock" size={20} color="#fff" />}
                        />
                        <Pressable style={Loginstyles.justify} onPress={() => navigation.navigate(routeName.FORGOT_PASSWORD)}>
                            <ThemedText type="gradient">Forgot Password?</ThemedText>
                        </Pressable>
                    </View>
                    <CustomButton onPress={handleSubmit(handleLogin)} style={Loginstyles.buttonStyle} disable={!isValid}>
                        {loading ? <ActivityIndicator size="small" color="#000" /> : 'Login'}
                    </CustomButton>
                    <CustomButton style={Loginstyles.buttonCont} onPress={onPress}>
                        {authloading ? (
                            <ActivityIndicator size="small" color="#000" />
                        ) : (
                            <View style={Loginstyles.button}>
                                <AntDesign name="google" size={20} color="#0A2F36" />
                                <Text style={{ color: '#0A2F36', fontSize: 16, fontWeight: 600 }}>Continue with Google</Text>
                                <Text />
                            </View>
                        )}
                    </CustomButton>
                    <View className="flex flex-row justify-center items-center my-4 ">
                        <Text style={Loginstyles.text} className="text-[#ffff]">
                            Don’t have an account?{' '}
                        </Text>
                        <Pressable onPress={register}>
                            <Text style={Loginstyles.text} className="text-[#45A3D9]">
                                Register Now
                            </Text>
                        </Pressable>
                    </View>
                </FormProvider>
            </View>
        </GradientLayout>
    );
}
