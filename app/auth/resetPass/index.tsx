import React from 'react';
import { View, Text, Image, Keyboard } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import { FormProvider, useForm } from 'react-hook-form';
import InputComp from '@/components/Input';
import Feather from '@expo/vector-icons/Feather';
import CustomButton from '@/components/CustomButton';
import Resetstyles from './styles';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { ResetPassApi } from '@/api/authentication';
import routeName from '@/routes/routeName';
import { IResetPassFormValues } from './types';
import { schema } from './schema';

export default function ResetPass() {
    const navigation = useNavigation<any>();
    const methods = useForm<IResetPassFormValues>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
    });
    const {
        handleSubmit,
        formState: { isValid },
    } = methods;

    const { mutateAsync: resetPassword } = useMutation({
        mutationFn: ResetPassApi.mutationFn,
    });

    const handleReset = async (data: IResetPassFormValues) => {
        Keyboard.dismiss();
        await resetPassword({
            email: data.email,
            password: data.password,
            code: data.code,
        });
        navigation.navigate(routeName.LOGIN);
    };

    return (
        <GradientLayout>
            <View style={Resetstyles.Main}>
                <FormProvider {...methods}>
                    <View style={Resetstyles.container}>
                        <Image source={require('@/assets/images/logo.png')} className="relative h-[119px] w-[148px] top-6 z-10" />
                        <View className="bg-[#203133] w-full" style={Resetstyles.Box}>
                            <ThemedText type="title" className="mt-2 text-center">
                                Reset Your Password
                            </ThemedText>
                        </View>
                    </View>

                    <View className="bg-[#203133] w-full" style={Resetstyles.Box}>
                        <InputComp
                            name="email"
                            label="Email Address"
                            keyboardType="email-address"
                            placeholder="Enter email address"
                            leftIcon={<Fontisto name="email" size={20} color="#fff" />}
                        />
                        <InputComp
                            name="password"
                            label="New Password"
                            isPassword={true}
                            keyboardType="default"
                            placeholder="Enter new password"
                            leftIcon={<Feather name="lock" size={20} color="#fff" />}
                        />
                        <InputComp
                            name="code"
                            label="Verification Code"
                            keyboardType="number-pad"
                            placeholder="Enter code"
                            leftIcon={<MaterialIcons name="domain-verification" size={20} color="#fff" />}
                        />
                    </View>

                    <CustomButton onPress={handleSubmit(handleReset)} style={[Resetstyles.buttonStyle]} disable={!isValid}>
                        <Text style={Resetstyles.buttonTextStyle}>submit</Text>
                    </CustomButton>
                </FormProvider>
            </View>
        </GradientLayout>
    );
}
