import { View, Text } from 'react-native';
import React from 'react';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import TopBar from '@/components/TopBar';
import ProfileStyles from '../home/profile/styles';
import { useNavigation } from 'expo-router';
import { styles } from './styles';
import { useUserStore } from '@/store/useUserStore';
import SubscriptionContent from '../subscription/SubscriptionContent';
import CustomButton from '@/components/CustomButton';

export default function Payments() {
    const navigation = useNavigation<any>();
    const { user } = useUserStore();
    const isPremium = user?.isPremium;
    return (
        <GradientLayout>
            <View style={ProfileStyles.Main}>
                <TopBar title={isPremium ? 'Manage your subscription' : 'Go Premium'} onBackPress={() => navigation.goBack()} />

                <View style={styles.main} className=" flex-1">
                    {isPremium ? (
                        <View className="mt-10">
                            <Text style={styles.subhead}>Card Details</Text>
                            <Text style={styles.text}>Visa ****** 4242</Text>
                            <View className="mt-10">
                                <CustomButton enabledGradientColors={['#FF5F6D', '#FFC371']} enabledTextColor="black">
                                    Cancel Subscription
                                </CustomButton>
                            </View>
                        </View>
                    ) : (
                        <View style={{ marginBottom: 20 }}>
                            <SubscriptionContent />
                        </View>
                    )}
                </View>
            </View>
        </GradientLayout>
    );
}
