import { View, ScrollView, Pressable, Text, Modal, Alert, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import TopBar from '@/components/TopBar';
import ProfileStyles from './styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import SettingNav from '@/Navigation/SettingNav';
import { UseProfileData } from '@/Data/UseProfileData';
import { FlashList } from '@shopify/flash-list';
import { UseOtherData } from '@/Data/UseProfileOtherData';
import { useUserStore } from '@/store/useUserStore';
import { useNavigation } from 'expo-router';
import { BlurView } from 'expo-blur';
import CustomLinearGradient from '@/components/LinearGradientComp';
import { Feather } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';
import { addProfilePic, deleteUser, getCurrentUserApi } from '@/api/user';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native-paper';
import auth from '@/util/auth';
import routeName from '@/routes/routeName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@clerk/clerk-expo';

export default function Profile() {
    const { ProfileData } = UseProfileData();
    const { handleSettingNavigation, handleOtherNavigation } = SettingNav();
    const { OtherData } = UseOtherData();
    const user = useUserStore((state) => state.user);
    const { setUser, setAvatar } = useUserStore();
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
    }, [data?.data, setUser]);
    const { clearUser } = useUserStore();
    const navigation = useNavigation<any>();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signOut } = useAuth();
    const { mutateAsync: DeleteAccount } = useMutation({
        mutationFn: deleteUser.mutationFn,
    });
    const isOAuthUser = user?.isOAuthUser;
    const handleDeleteAccount = async () => {
        try {
            setLoading(true);
            const response = await DeleteAccount();
            if ('data' in response) {
                setIsDeleteModalVisible(false);
                auth.logout();
                clearUser();
                if (isOAuthUser) {
                    signOut();
                }
                await AsyncStorage.removeItem('lastOnboardingDate');
                navigation.reset({
                    index: 0,
                    routes: [{ name: routeName.LOGIN }],
                });
                setLoading(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const handelClose = () => {
        setIsDeleteModalVisible(false);
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('authToken');
        auth.logout();
        clearUser();
        if (isOAuthUser) {
            signOut();
        }
        navigation.reset({
            index: 0,
            routes: [{ name: routeName.LOGIN }],
        });
    };

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { mutateAsync: ProfilePic } = useMutation({
        mutationFn: addProfilePic.mutationFn,
    });
    const [profloading, setProfLoading] = useState(false);
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need permission to access your gallery.');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setProfLoading(true);
            try {
                const imageUri = result.assets[0].uri;
                let fileName = imageUri.split('/').pop() || 'image.jpg';
                let fileMatch = /\.(\w+)$/.exec(fileName);
                let mimeType = fileMatch ? `image/${fileMatch[1]}` : 'image/jpeg';
                const formData = new FormData();
                formData.append('profilePicture', {
                    uri: imageUri,
                    name: fileName,
                    type: mimeType,
                } as any);
                const res = await ProfilePic({ body: formData });
                if ('data' in res) {
                    setAvatar(res.data.avatar);
                }
            } catch (error) {
                console.error('Image upload failed:', error);
            } finally {
                setProfLoading(false);
            }
        }
    };

    return (
        <GradientLayout>
            <View style={ProfileStyles.Main}>
                <TopBar title="Profile" onBackPress={() => navigation.goBack()} />
                <ScrollView contentContainerStyle={ProfileStyles.ScrollContainer}>
                    <View className="flex flex-col justify-center items-center">
                        {/* <Pressable style={ProfileStyles.img}>
                        <Text style={ProfileStyles.initials}>
                            {user?.fullName
                            ? user.fullName.split(' ').slice(0, 3).map(name => name.charAt(0).toUpperCase()).join('')
                            : '?'}
                        </Text>
                        </Pressable> */}
                        <View>
                            <Pressable onPress={pickImage}>
                                {profloading ? (
                                    <View style={ProfileStyles.imgContainer}>
                                        <ActivityIndicator size="small" color="black" />
                                    </View>
                                ) : selectedImage ? (
                                    <View>
                                        <Image source={{ uri: selectedImage }} style={ProfileStyles.img} />
                                        <Pressable style={ProfileStyles.editIconContainer} onPress={pickImage}>
                                            <MaterialIcons name="edit" size={20} color="black" />
                                        </Pressable>
                                    </View>
                                ) : user?.avatar ? (
                                    <View>
                                        <Image source={{ uri: user.avatar }} style={ProfileStyles.img} />
                                        <Pressable style={ProfileStyles.editIconContainer} onPress={pickImage}>
                                            <MaterialIcons name="edit" size={20} color="black" />
                                        </Pressable>
                                    </View>
                                ) : (
                                    <View style={[ProfileStyles.imgContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                                        {/* <MaterialIcons name="edit" size={20} color="black" /> */}
                                        <View style={[ProfileStyles.imgContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                                            <Text style={ProfileStyles.initials}>
                                                {user?.fullName
                                                    ? user.fullName
                                                          .split(' ')
                                                          .slice(0, 2)
                                                          .map((name) => name.charAt(0).toUpperCase())
                                                          .join('')
                                                    : '?'}
                                            </Text>
                                            <Pressable style={ProfileStyles.editIconContainer} onPress={pickImage}>
                                                <MaterialIcons name="edit" size={20} color="black" />
                                            </Pressable>
                                        </View>
                                    </View>
                                )}
                            </Pressable>
                        </View>
                        <Text style={ProfileStyles.Name}>{user?.fullName}</Text>
                        <Text style={ProfileStyles.Email}>{user?.email}</Text>
                    </View>
                    <View className="mt-6">
                        <ThemedText type="defaultSemiBold">Settings</ThemedText>
                        <FlashList
                            data={ProfileData}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    style={[ProfileStyles.btn, index === ProfileData.length - 1 && ProfileStyles.lastBtn]}
                                    onPress={() => handleSettingNavigation(item)}
                                >
                                    <View className="felx flex-row gap-3">
                                        <item.svg />
                                        <ThemedText type={index === ProfileData.length - 1 ? 'defaultBlack' : 'default'}>{item.text}</ThemedText>
                                    </View>
                                    <MaterialIcons name="navigate-next" size={24} color={index === ProfileData.length - 1 ? '#03242B' : '#9CA3AF'} />
                                </Pressable>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            estimatedItemSize={70}
                        />
                    </View>
                    <View className="mt-6">
                        <Text style={ProfileStyles.heading}>Other</Text>
                        <FlashList
                            data={OtherData}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    style={[ProfileStyles.other, index === OtherData.length - 1 && ProfileStyles.otherlast]}
                                    onPress={() => {
                                        if (item.text === 'Delete Account') {
                                            setIsDeleteModalVisible(true);
                                        } else if (item.text === 'Logout') {
                                            handleLogout();
                                        } else {
                                            handleOtherNavigation(item);
                                        }
                                    }}
                                >
                                    <View className="flex flex-row gap-3">
                                        <item.svg />
                                        <ThemedText type="default">{item.text}</ThemedText>
                                    </View>
                                    <MaterialIcons name="navigate-next" size={24} color="#9CA3AF" />
                                </Pressable>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            estimatedItemSize={70}
                        />
                        {isDeleteModalVisible && (
                            <Modal animationType="fade" transparent={true} visible={isDeleteModalVisible} onRequestClose={handelClose}>
                                <BlurView intensity={10} style={ProfileStyles.modalBackground}>
                                    <CustomLinearGradient style={ProfileStyles.modalContainer}>
                                        <Pressable style={ProfileStyles.close} onPress={handelClose}>
                                            <Feather name="x" size={18} color="#0A2F36" />
                                        </Pressable>
                                        <Text style={ProfileStyles.modalTitle}>Are you sure you want to delete your account?</Text>
                                        <Text style={ProfileStyles.modalContent}>(this action is irreversible)</Text>
                                        <View>
                                            <CustomButton
                                                onPress={handleDeleteAccount}
                                                enabledTextColor="#00FFBE"
                                                enabledGradientColors={['#0A2F36', '#0A2F36']}
                                            >
                                                {loading ? <ActivityIndicator size="small" color="#00FFBE" /> : 'Delete Account'}
                                            </CustomButton>
                                        </View>
                                    </CustomLinearGradient>
                                </BlurView>
                            </Modal>
                        )}
                    </View>
                </ScrollView>
            </View>
        </GradientLayout>
    );
}
