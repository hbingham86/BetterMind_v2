import { Modal, View, Text, ScrollView,  Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import ProfileStyles from '@/app/home/profile/styles';
import HomeStyles from '@/app/home/home/styles';
import CustomButton from '../CustomButton';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PhoneInputComp from '@/components/PhoneInputComp';
import { AddEmergencyContact } from '@/api/Onboarding';
import { useMutation } from '@tanstack/react-query';
import onboardingStyles from '@/app/onboarding/styles';
import { IFormValue } from '@/app/onboarding/Steps/stepFour/types';
import { useUserStore } from '@/store/useUserStore';
import { ActivityIndicator } from 'react-native-paper';

const AddEmergencyModal = ({ isModalVisible, close, userRefecth }: { isModalVisible: boolean; close: () => void; userRefecth: any }) => {
    const [emergencyContacts, setEmergencyContacts] = useState<string[]>(['emg1']);
    const methods = useForm<IFormValue>({
        mode: 'onBlur',
    });
    const { user } = useUserStore();
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

        const emergencyContactsData = emergencyContacts.map((contactName) => ({
            phone: data[contactName],
        }));
        try {
            const response = await AddConatct(emergencyContactsData);
            if (response.success && response.data && user) {
                close();
                userRefecth();
                // navigation.goBack();
            }
        } catch (error) {
            console.error('Failed to add emergency contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal animationType="fade" transparent={true} visible={isModalVisible} onRequestClose={close}>
            <BlurView intensity={10} style={ProfileStyles.modalBackground}>
                <View style={HomeStyles.modal}>
                    <ScrollView>
                        <Pressable style={ProfileStyles.close} onPress={close}>
                            <Feather name="x" size={18} color="white" />
                        </Pressable>
                        <View style={HomeStyles.contt}>
                            <Text style={HomeStyles.modaltxt}>Add More Emergency Contacts</Text>
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
                                    {loading ? <ActivityIndicator size="small" color="#000" /> : 'Save'}
                                </CustomButton>
                            </View>
                        </FormProvider>
                    </ScrollView>
                </View>
            </BlurView>
        </Modal>
    );
};

export default AddEmergencyModal;
