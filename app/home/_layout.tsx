import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeSvg from '@/SVG/HomeSvg';
import Journal from '@/SVG/Journal';
import SupportSvg from '@/SVG/SupportSvg';
import ProfileSvg from '@/SVG/ProfileSvg';
import ChatSvg from '@/SVG/ChatSvg';
import { View } from 'react-native';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            initialRouteName="chat"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                // tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        backgroundColor: '#01191E',
                    },
                    default: {
                        backgroundColor: '#01191E',
                        height: '7%',
                        // paddingTop: 10,
                    },
                }),
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => <HomeSvg color={color} />,
                }}
            />
            <Tabs.Screen
                name="journal"
                options={{
                    title: 'Journal',
                    tabBarIcon: ({ color }) => <Journal color={color} />,
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: '',
                    tabBarIcon: () => (
                        <View className="mt-5">
                            <ChatSvg />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="support"
                options={{
                    title: 'Resources',
                    tabBarIcon: ({ color }) => <SupportSvg color={color} />,
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <ProfileSvg color={color} />,
                }}
            />
        </Tabs>
    );
}
