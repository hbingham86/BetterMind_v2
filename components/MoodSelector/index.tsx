import HomeStyles from '@/app/home/home/styles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface MoodSelectorProps {
    options: string[];
    setDuration?: any;
    duration?: string;
    menuVisible: boolean;
    setMenuVisible: (visible: boolean) => void;
}
const MoodSelector: React.FC<MoodSelectorProps> = ({ options, setDuration, duration, menuVisible, setMenuVisible }) => {
    return (
        <View style={{ width: '20%' }}>
            <Pressable onPress={() => setMenuVisible(!menuVisible)} className="flex flex-row justify-center items-center gap-2">
                <Ionicons name="filter" size={20} color="#DDDDDDB2" />
                <Text style={HomeStyles.Text} className="text-center">
                    {duration ? duration.split(' ')[1] : 'Select '}
                </Text>
            </Pressable>
            {menuVisible && (
                <View
                    style={{
                        marginTop: 20,
                        position: 'absolute',
                        zIndex: 100,
                        right: 2,
                        borderColor: '#0A2F36',
                        borderWidth: 1,
                        borderRadius: 8,
                        backgroundColor: '#0A2F36',
                    }}
                >
                    {options.map((option) => (
                        <Pressable
                            key={option}
                            onPress={() => {
                                setDuration(option);
                                setMenuVisible(false);
                            }}
                            style={{
                                backgroundColor: duration === option ? '#0A2F36' : '',
                                padding: 10,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ color: duration === option ? '#00f2d6' : '#FFFFFF' }}>{option.split(' ')[1]}</Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
};

export default MoodSelector;
