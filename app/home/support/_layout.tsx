import { View, Text, Pressable } from 'react-native';
import React from 'react';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import ProfileStyles from '../profile/styles';
import TopBar from '@/components/TopBar';
import { useNavigation } from 'expo-router';
import CustomLinearGradient from '@/components/LinearGradientComp';
import { SupportStyles } from './SupportStyles';
import { Ionicons } from '@expo/vector-icons';
import routeName from '@/routes/routeName';
import GuideSvg from '@/SVG/GuideSvg';

export default function Support() {
    const navigation = useNavigation<any>();

    return (
        <GradientLayout>
            <View style={ProfileStyles.Main}>
                <View className="mt-10">
                    <TopBar title="Support" text="We are here to help you" onBackPress={() => navigation.goBack()} />
                </View>
                <View style={SupportStyles.main}>
                    <Pressable onPress={() => navigation.navigate(routeName.GUIDEDEXERCISE)}>
                        <CustomLinearGradient GradientColors={['#00FFBE', '#00DDFF']} style={SupportStyles.btn}>
                            <View className="flex flex-row gap-3">
                                {/* <Image source={require('../../../assets/images/Vector.png')} /> */}
                                <GuideSvg />
                                <Text style={SupportStyles.subhead}>Guided breathing exercises</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#03242B" />
                        </CustomLinearGradient>
                    </Pressable>
                </View>
            </View>
        </GradientLayout>
    );
}
