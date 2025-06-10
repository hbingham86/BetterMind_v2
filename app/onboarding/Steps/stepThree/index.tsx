import { FC } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComp from '../../../../components/Input';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePickerComp from '@/components/DateTimePickerComp';
import CustomButton from '@/components/CustomButton';
import onboardingStyles from '../../styles';
import { getUserByIDApi } from '@/api/user';
import { schema } from './schema';
import { IformValue } from './types';
import { formatDate } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import PhoneInputComp from '@/components/PhoneInputComp';
import { useUserStore } from '@/store/useUserStore';

interface StepProps {
    onNext: () => void;
}
const StepThree: FC<StepProps> = ({ onNext }) => {
    const methods = useForm<IformValue>({
        resolver: yupResolver(schema),
    });

    const {
        handleSubmit,
        formState: { isValid },
    } = methods;
    const { mutateAsync: Personalize } = useMutation({
        mutationFn: getUserByIDApi.mutationFn,
    });
    const { setUser, user } = useUserStore();

    const onSubmit = async (data: IformValue) => {
        Keyboard.dismiss();
        if (data.dob) {
            const formattedDob = formatDate(data.dob);
            data.dob = formattedDob;
        }
        const response = await Personalize({ body: data });
        if ('data' in response && user) {
            setUser({
                ...user,
                fullName: data.fullName,
                dob: data.dob,
                phoneNumber: data.phoneNumber,
            });
            onNext();
        }
    };

    return (
        <View className="">
            <Text style={onboardingStyles.heading2}>Personalize Your</Text>
            <View style={onboardingStyles.stepContent}>
                <Text style={onboardingStyles.heading2}>Experience</Text>
            </View>
            <FormProvider {...methods}>
                <InputComp
                    name="fullName"
                    label="Your Full Name"
                    placeholder="Your Name"
                    keyboardType="default"
                    leftIcon={<FontAwesome name="user" size={24} color="#E6E6E6" />}
                />
                <DateTimePickerComp name="dob" label="Date Of Birth" placeholder="DD / MM / YYYY" mode="date" />
                <PhoneInputComp name="phoneNumber" label="Your Contact Info" />
                <View style={onboardingStyles.center} className=" mt-12">
                    <CustomButton disable={!isValid} style={onboardingStyles.buttonStyle} onPress={handleSubmit(onSubmit)}>
                        Next
                    </CustomButton>
                </View>
            </FormProvider>
        </View>
    );
};

export default StepThree;
