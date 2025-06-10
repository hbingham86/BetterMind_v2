import React from 'react';
import { View, Pressable, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TopBarstyles } from './styles';

type TopBarProps = {
    title: string;
    onBackPress?: () => void;
    text?: string;
};

export default function TopBar({ title, onBackPress, text }: TopBarProps) {
    return (
        <View className="flex flex-row justify-start items-center gap-2" style={TopBarstyles.cont}>
            <Pressable onPress={onBackPress}>
                <Ionicons name="chevron-back" size={20} color="#1AC398" />
            </Pressable>
            <View>
                <Text style={TopBarstyles.heading}>{title}</Text>
                {text && <Text style={TopBarstyles.text}>{text}</Text>}
            </View>
        </View>
    );
}
