import { View, Text, Pressable } from 'react-native';
import React from 'react';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import ProfileStyles from '../home/profile/styles';
import TopBar from '@/components/TopBar';
import { useNavigation } from 'expo-router';
import CustomLinearGradient from '@/components/LinearGradientComp';
import { Ionicons } from '@expo/vector-icons';
import { GuidedStyles } from './GuidedStyles';
import { FlashList } from '@shopify/flash-list';
import { UseExercisesData } from '@/Data/UseExercisesData';
import routeName from '@/routes/routeName';

export default function GuidedExercises() {
    const navigation = useNavigation<any>();
    const { ExercisesData } = UseExercisesData();

    return (
        <GradientLayout>
            <View style={ProfileStyles.Main}>
                <View className="mt-10">
                    <TopBar title="Guided breathing exercises" onBackPress={() => navigation.goBack()} />
                </View>
                <View style={GuidedStyles.main} className="mt-10">
                    <FlashList
                        data={ExercisesData}
                        renderItem={({ item, index }) => (
                            <Pressable
                                onPress={() =>
                                    navigation.navigate(routeName.ExerciseFullScreen, {
                                        title: item.title,
                                        text: item.text,
                                    })
                                }
                            >
                                <CustomLinearGradient GradientColors={['#00FFBE', '#00DDFF']} style={GuidedStyles.btn}>
                                    <View style={GuidedStyles.textContainer}>
                                        <Text style={GuidedStyles.subhead}>{item.title}</Text>
                                        <Text style={GuidedStyles.Text}>{item.text}</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={18} color="#03242B" />
                                </CustomLinearGradient>{' '}
                            </Pressable>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        estimatedItemSize={10}
                    />
                </View>
            </View>
        </GradientLayout>
    );
}
