import React from 'react';
import { Modal, View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from 'expo-router';
import ProfileStyles from '@/app/home/profile/styles';
import HomeStyles from '@/app/home/home/styles';
import CustomLinearGradient from '../LinearGradientComp';
import CustomButton from '../CustomButton';
import { useUserStore } from '@/store/useUserStore';
import EmgSvg from '@/SVG/EmgSvg';
import routeName from '@/routes/routeName';

const EmergencyModal = ({ isModalVisible, close }: { isModalVisible: boolean; close: () => void }) => {
    const { user } = useUserStore();
    const navigation = useNavigation<any>();

    const handleCall = (phoneNumber: string) => {
        const phoneUrl = `tel:${phoneNumber}`;
        Linking.openURL(phoneUrl).catch((err) => console.error('Failed to open dialer:', err));
    };

    const Add = () => {
        close();
        navigation.replace(routeName.PROFILE_INFO);
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
                            <EmgSvg color="white" /> <Text style={HomeStyles.modaltxt}>Emergency</Text>
                        </View>

                        {user?.emergencyContacts && user?.emergencyContacts.length > 0 ? (
                            <View style={{ marginTop: 10 }}>
                                <Text style={HomeStyles.modaltext}>Hotline</Text>
                                {user?.emergencyContacts.map((contact: any, index: any) => (
                                    <View key={index}>
                                        <Text style={HomeStyles.smtext}>Emergency Contact {index + 1}</Text>
                                        <View style={HomeStyles.cont2}>
                                            <CustomLinearGradient style={HomeStyles.buttonOne}>
                                                <Text>{contact.phone}</Text>
                                            </CustomLinearGradient>
                                            <CustomButton style={HomeStyles.button} onPress={() => handleCall(contact.phone)}>
                                                Call
                                            </CustomButton>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <Pressable style={HomeStyles.emergencyButtonStyle} onPress={Add}>
                                <Text style={{ color: 'white', fontSize: 16 }}>+ Add Emergency Contact</Text>
                            </Pressable>
                        )}
                    </ScrollView>
                </View>
            </BlurView>
        </Modal>
    );
};

export default EmergencyModal;
