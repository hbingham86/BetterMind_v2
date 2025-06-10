import { View, Text, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PhoneInputComp from '@/components/PhoneInputComp';
import onboardingStyles from '../../styles';
import CustomButton from '@/components/CustomButton';
import { AddEmergencyContact } from '@/api/Onboarding';
import { IFormValue } from './types';
import { useMutation } from '@tanstack/react-query';

interface StepProps {
    onNext: () => void;
}

const StepFour: FC<StepProps> = ({ onNext }) => {
    const [emergencyContacts, setEmergencyContacts] = useState<string[]>(['emg1']);
    const methods = useForm<IFormValue>({
        mode: 'onBlur',
    });
    const { handleSubmit } = methods;
    const addEmergencyContact = () => {
        setEmergencyContacts((prev) => [...prev, `emg${prev.length + 1}`]);
    };
    const handleDeleteEmergencyContact = (contactName: string) => {
        setEmergencyContacts((prev) => prev.filter((name) => name !== contactName));
    };
    const { mutateAsync: AddConatct } = useMutation({
        mutationFn: AddEmergencyContact.mutationFn,
    });
    const handleAddEmergencyContacts = async (data: IFormValue) => {
        const emergencyContactsData = emergencyContacts.map((contactName) => ({
            phone: data[contactName],
        }));
        const response = await AddConatct(emergencyContactsData);
        if ('data' in response) {
            onNext();
        }
    };

    return (
        <View>
            <Text style={onboardingStyles.heading2}>Add Emergency</Text>
            <View style={onboardingStyles.stepContent}>
                <Text style={onboardingStyles.heading2}>Contact(s)</Text>
            </View>
            <FormProvider {...methods}>
                {emergencyContacts.map((contactName, index) => (
                    <PhoneInputComp
                        key={contactName}
                        name={contactName}
                        label={`Emergency Contact ${index + 1}`}
                        placeholder=""
                        showDeleteIcon={index !== 0}
                        onDeletePress={() => handleDeleteEmergencyContact(contactName)}
                    />
                ))}
                <Pressable onPress={addEmergencyContact}>
                    <Text className="text-[#42FFEA] mb-9 mr-5 mt-2">+ Add more emergency contact(s)</Text>
                </Pressable>
                <View style={onboardingStyles.center} className="mb-10">
                    <CustomButton style={onboardingStyles.buttonStyle} onPress={handleSubmit(handleAddEmergencyContacts)}>
                        Next
                    </CustomButton>
                </View>
            </FormProvider>
        </View>
    );
};

export default StepFour;
