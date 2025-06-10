import React, { useState } from 'react';
import { View, Text, Image, Pressable, Keyboard } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';
import routeName from '@/routes/routeName';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputComp from '@/components/Input';
import Registerstyles from './styles';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from '@/components/CustomButton';
import RadioButtonGroup from '@/components/RadioButtonGroup';
import { IRegisterFormValues } from './types';
import { schema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native-paper';
import { OAuthloginApi, RegisterApi } from '@/api/authentication';
import Loginstyles from '../login/styles';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useSSO, useUser } from '@clerk/clerk-expo';
import { useCallback, useEffect } from 'react';
import auth from '@/util/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};
export default function Register() {
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);

    const methods = useForm<IRegisterFormValues>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
    });
    const {
        handleSubmit,
        formState: { isValid },
    } = methods;
    const login = () => {
        navigation.navigate(routeName.LOGIN);
    };
    const { mutateAsync: registerUser } = useMutation({
        mutationFn: RegisterApi.mutationFn,
    });

    const handleRegister: SubmitHandler<IRegisterFormValues> = async (data) => {
        Keyboard.dismiss();
        setLoading(true);
        const response = await registerUser(data);
        if ('data' in response) {
            navigation.replace(routeName.VERIFICATION, {
                email: data.email,
                screenName: 'register',
            });
            setLoading(false);
            methods.reset();
        }
        setLoading(false);
    };
    useWarmUpBrowser();
    // const { signOut } = useAuth();
    const { mutateAsync: OAuthAPi } = useMutation({
        mutationFn: OAuthloginApi.mutationFn,
    });
    const { startSSOFlow } = useSSO();
    const [createdSessionId, setCreatedSessionId] = useState<any>();
    const [getGoogle, setgetGoogle] = useState(false);
    const [authloading, setauthLoading] = useState(false);

    const onPress = useCallback(async () => {
        // await signOut();
        setauthLoading(true);
        try {
            const response = await startSSOFlow({
                strategy: 'oauth_google',
                redirectUrl: AuthSession.makeRedirectUri(),
            });
            const { createdSessionId, setActive } = response;
            setCreatedSessionId(createdSessionId);
            if (createdSessionId) {
                await setActive!({ session: createdSessionId });
                setgetGoogle(true);
            }
            // setauthLoading(false);
        } catch (err) {
            setauthLoading(false);
            console.error('Error during authentication:', JSON.stringify(err, null, 2));
        }
    }, []);
    const user = useUser();
    const getUser = async () => {
        await AsyncStorage.removeItem('userEmail');
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
                // checkAndNavigateOnboarding(navigation);
                navigation.replace(routeName.MAINPAGE);
                const accToken = res.data.accessToken;
                const reTokrn = res.data.refreshToken;
                auth.updateTokens(accToken, reTokrn);
                await AsyncStorage.setItem('authToken', accToken);
            }
        } catch (error) {
            setauthLoading(false);
            console.error('Error during authentication:', error);
        }
        setgetGoogle(false);
    };
    useEffect(() => {
        if (getGoogle) {
            getUser();
        }
    }, [getGoogle]);
    return (
        <GradientLayout>
            <View style={Registerstyles.Main}>
                <FormProvider {...methods}>
                    <View style={Registerstyles.container}>
                        <Image source={require('@/assets/images/logo.png')} className="relative  h-[119px] w-[148px]  top-6 z-10 " />
                        <View className="bg-[#203133]  w-full" style={Registerstyles.Box}>
                            <ThemedText type="title" className="mt-2 text-center">
                                Create Your Account
                            </ThemedText>
                        </View>
                    </View>
                    <View className="bg-[#203133]  w-full" style={Registerstyles.Box}>
                        <InputComp
                            name="email"
                            label="Email Address"
                            keyboardType="email-address"
                            placeholder="Enter email address"
                            leftIcon={<Fontisto name="email" size={20} color="#fff" />}
                        />
                        <InputComp
                            name="password"
                            label="Password"
                            keyboardType="default"
                            isPassword={true}
                            placeholder="Enter password"
                            leftIcon={<Feather name="lock" size={20} color="#fff" />}
                        />
                        <InputComp
                            name="confirmPassword"
                            label="Confirm Password"
                            keyboardType="default"
                            isPassword={true}
                            placeholder="Confirm password"
                            leftIcon={<Feather name="lock" size={20} color="#fff" />}
                        />
                        <RadioButtonGroup
                            name="selectedOption"
                            options={['By signing up, I agree to the Terms and Conditions and Privacy Policy']}
                            rules={{ required: 'You must select an option' }}
                        />
                    </View>
                    <CustomButton onPress={handleSubmit(handleRegister)} style={Registerstyles.buttonStyle} disable={!isValid}>
                        {' '}
                        {loading ? <ActivityIndicator size="small" color="#000" /> : 'Sign up'}
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
                        <Text style={Registerstyles.text} className="text-[#ffff]">
                            Already have an account?{' '}
                        </Text>
                        <Pressable onPress={login}>
                            <Text style={Registerstyles.text} className="text-[#45A3D9]">
                                Login Now
                            </Text>
                        </Pressable>
                    </View>
                </FormProvider>
            </View>
        </GradientLayout>
    );
}
