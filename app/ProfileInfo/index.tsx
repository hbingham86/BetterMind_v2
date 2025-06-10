import { View, ScrollView, Keyboard, Text } from 'react-native';

import React, { useCallback, useEffect, useState } from 'react';

import GradientLayout from '@/Layout/GradientLayout/GradientLayout';

import TopBar from '@/components/TopBar';

import ProfileStyles from '../home/profile/styles';

import { FormProvider, useForm } from 'react-hook-form';

import InputComp from '@/components/Input';

import Person from '@/SVG/Person';

import { styles } from './styles';

import Fontisto from '@expo/vector-icons/Fontisto';

import PhoneInputComp from '@/components/PhoneInputComp';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

import CustomButton from '@/components/CustomButton';

import { DeleteEmergencyContact } from '@/api/Onboarding';

import { useMutation, useQuery } from '@tanstack/react-query';

import { useUserStore } from '@/store/useUserStore';

import { ActivityIndicator, Button } from 'react-native-paper';

import { getCurrentUserApi, getUserByIDApi } from '@/api/user';

import AddEmergencyModal from '@/components/AddEmergencyModal';

export default function ProfileInfo() {
    const navigation = useNavigation<any>();
    const { user, setUser } = useUserStore();
    const [loading, setLoading] = useState(false);
    const { data, refetch: userRefecth } = useQuery({
        ...getCurrentUserApi,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
    });
    useFocusEffect(
        useCallback(() => {
            userRefecth();
        }, [])
    );
    useEffect(() => {
        if (data?.data) {
            setUser(data.data);
        }
    }, [data?.data, setUser, user]);
    const methods = useForm({
        defaultValues: {
            fullName: user?.fullName || '',

            email: user?.email || '',

            phoneNumber: user?.phoneNumber || '',

            emergencyContacts: user?.emergencyContacts || [],
        },
    });
    // console.log(user, 'user');
    useEffect(() => {
        if (user) {
            methods.reset({
                fullName: user.fullName || '',

                email: user.email || '',

                phoneNumber: user.phoneNumber || '',

                emergencyContacts: user.emergencyContacts,
            });
        }
    }, [user]);

    const { mutateAsync: update } = useMutation({
        mutationFn: getUserByIDApi.mutationFn,
    });

    const { mutateAsync: DeleteEmergency } = useMutation({
        mutationFn: DeleteEmergencyContact.mutationFn,
    });

    const { handleSubmit } = methods;

    const save = handleSubmit(async (data) => {
        setLoading(true);
        const { fullName, email, emergencyContacts = [], phoneNumber } = data;
        Keyboard.dismiss();
        try {
            const response = await update({
                body: {
                    fullName,
                    email,
                    phoneNumber,
                    emergencyContacts: emergencyContacts.map((contact: any) => ({
                        id: contact.id,
                        phone: contact.phone,
                    })),
                },
            });
            if ('data' in response) {
                useUserStore.getState().updateUser({
                    fullName,
                    email,
                    phoneNumber,
                    emergencyContacts,
                });
            }
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setLoading(false);
        }

        navigation.goBack();
    });

    const delEmergency = async (id: number) => {
        await DeleteEmergency(id.toString());
        const updatedContacts = methods.getValues('emergencyContacts').filter((contact: any) => contact.id !== id);
        methods.setValue('emergencyContacts', updatedContacts);
        userRefecth();
    };
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <GradientLayout>
            <View style={ProfileStyles.Main}>
                <TopBar title="Personal Info" onBackPress={() => navigation.goBack()} />

                <View style={styles.main} className="mt-6">
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                    >
                        <FormProvider {...methods}>
                            <View>
                                <InputComp
                                    label="Your Name"
                                    name="fullName"
                                    placeholder="Enter your name"
                                    leftIcon={<Person color="#9DB6B7" />}
                                    value={methods.watch('fullName')}
                                    onChangeText={(text) => methods.setValue('fullName', text)}
                                />

                                <InputComp
                                    name="email"
                                    label="Email"
                                    placeholder="Enter your Email"
                                    leftIcon={<Fontisto name="email" size={20} color="#9DB6B7" />}
                                    value={methods.watch('email')}
                                    onChangeText={(text) => methods.setValue('email', text)}
                                />

                                <PhoneInputComp name="phoneNumber" label="Your Contact Info" value={methods.watch('phoneNumber')} />

                                {methods

                                    .watch('emergencyContacts')

                                    ?.map((contact: any, index: any) => (
                                        <PhoneInputComp
                                            key={index}
                                            name={`emergencyContacts[${index}].phone`}
                                            label={`Emergency Contact ${index + 1}`}
                                            value={contact.phone}
                                            showDeleteIcon={true}
                                            onDeletePress={() => delEmergency(contact.id)}
                                        />
                                    ))}
                            </View>

                            <Button style={styles.emergencyButtonStyle} onPress={() => setIsModalVisible(true)}>
                                <Text style={{ color: 'white', fontSize: 16 }}>+ Add Emergency Contact</Text>
                            </Button>

                            <CustomButton
                                style={styles.buttonStyle}
                                onPress={() => {
                                    save();
                                }}
                            >
                                {loading ? <ActivityIndicator size="small" color="#000" /> : 'Save'}
                            </CustomButton>
                        </FormProvider>
                    </ScrollView>
                    <AddEmergencyModal
                        isModalVisible={isModalVisible}
                        userRefecth={userRefecth}
                        close={() => setIsModalVisible(false)}
                    ></AddEmergencyModal>
                </View>
            </View>
        </GradientLayout>
    );
}
