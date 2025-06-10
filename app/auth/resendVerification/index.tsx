import React, { useState } from 'react';
import { View, Text, Image, Keyboard } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';
import routeName from '@/routes/routeName';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputComp from '@/components/Input';
import FogotPassStyles from './styles';
import Fontisto from '@expo/vector-icons/Fontisto';
import CustomButton from '@/components/CustomButton';
import { schema, IFogotFormValues } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native-paper';
import { ResendCodeApi } from '@/api/authentication';

export default function EsendVerification() {
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);

    const methods = useForm<IFogotFormValues>({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });
    const {
        handleSubmit,
        formState: { isValid },
    } = methods;
    const { mutateAsync: resendCode } = useMutation({
        mutationFn: ResendCodeApi.mutationFn,
    });
    const ResendCode: SubmitHandler<IFogotFormValues> = async (data) => {
        Keyboard.dismiss();
        setLoading(true);
        const response = await resendCode(data);
        if ('data' in response) {
            navigation.replace(routeName.VERIFICATION, {
                email: data.email,
                screenName: 'register',
            });
            methods.reset();
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <GradientLayout>
            <View style={FogotPassStyles.Main}>
                <FormProvider {...methods}>
                    <View style={FogotPassStyles.container}>
                        <Image source={require('@/assets/images/logo.png')} className="relative  h-[119px] w-[148px]  top-6 z-10" />
                        <View className="bg-[#203133]  w-full" style={FogotPassStyles.Box}>
                            <ThemedText type="title" className="mt-2 text-center">
                                Resend Verification Code
                            </ThemedText>
                        </View>
                    </View>
                    <View className="bg-[#203133]  w-full" style={FogotPassStyles.Box}>
                        <InputComp
                            name="email"
                            label="Email Address"
                            keyboardType="email-address"
                            placeholder="Enter email address"
                            leftIcon={<Fontisto name="email" size={20} color="#fff" />}
                        />
                    </View>

                    <CustomButton onPress={handleSubmit(ResendCode)} style={FogotPassStyles.buttonStyle} disable={!isValid}>
                        <Text style={FogotPassStyles.buttonTextStyle}>{loading ? <ActivityIndicator size="small" color="#000" /> : 'Submit'}</Text>
                    </CustomButton>
                </FormProvider>
            </View>
        </GradientLayout>
    );
}
