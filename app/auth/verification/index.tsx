import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, Keyboard } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import { FormProvider, useForm } from 'react-hook-form';
import CustomButton from '@/components/CustomButton';
import Verificationstyles from './styles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { IRegisterFormValues, VerificationScreenParams } from './type';
import { VerifyCodeApi } from '@/api/authentication';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from 'expo-router';
import routeName from '@/routes/routeName';
import { schema } from './schema';

type RootStackParamList = {
    Verification: VerificationScreenParams;
};

export default function Verification() {
    const route = useRoute<RouteProp<RootStackParamList, 'Verification'>>();
    const { email } = route.params;
    const navigation = useNavigation<any>();
    const [codeArray, setCodeArray] = useState(['', '', '', '', '', '']);
    const inputs = useRef<(TextInput | null)[]>([]);

    const methods = useForm<IRegisterFormValues>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
    });
    const handleInputChange = (text: string, index: number) => {
        const newCodeArray = [...codeArray];
        newCodeArray[index] = text;
        if (text && index < inputs.current.length - 1) {
            inputs.current[index + 1]?.focus();
        } else if (!text && index > 0) {
            inputs.current[index - 1]?.focus();
        }
        setCodeArray(newCodeArray);
        const completeCode = newCodeArray.join('');
        if (completeCode.length === 6) {
            setValue('code', parseInt(completeCode, 10));
        }
    };
    const { handleSubmit, setValue } = methods;
    const { mutateAsync: verifyCode } = useMutation({
        mutationFn: VerifyCodeApi.mutationFn,
    });
    const onSubmit = async (data: IRegisterFormValues) => {
        Keyboard.dismiss();
        await verifyCode({ email, code: data.code });
        navigation.navigate(routeName.LOGIN);
    };
    const isCodeComplete = codeArray.every((digit) => digit.length === 1);

    return (
        <GradientLayout>
            <View style={Verificationstyles.Main}>
                <FormProvider {...methods}>
                    <View style={Verificationstyles.container}>
                        <Image source={require('@/assets/images/logo.png')} className="relative h-[119px] w-[148px] top-6 z-10" />
                        <View className="bg-[#203133] w-full" style={Verificationstyles.Box}>
                            <ThemedText type="title" className="mt-2 text-center">
                                Verification Code
                            </ThemedText>
                            <ThemedText type="primary" className="my-2 text-center">
                                We have sent you an email with a verification code. Enter it below to proceed.
                            </ThemedText>

                            <View style={Verificationstyles.inputContainer}>
                                {codeArray.map((value, index) => (
                                    <TextInput
                                        key={index}
                                        style={Verificationstyles.input}
                                        value={value}
                                        onChangeText={(text) => handleInputChange(text, index)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                        ref={(ref) => (inputs.current[index] = ref)}
                                    />
                                ))}
                            </View>
                        </View>
                    </View>

                    <CustomButton style={[Verificationstyles.buttonStyle]} onPress={handleSubmit(onSubmit)} disable={!isCodeComplete}>
                        <Text style={Verificationstyles.buttonTextStyle}>Submit</Text>
                    </CustomButton>
                </FormProvider>
            </View>
        </GradientLayout>
    );
}
