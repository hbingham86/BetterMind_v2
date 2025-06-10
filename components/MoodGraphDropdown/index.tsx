import HomeStyles from '@/app/home/home/styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface MoodGraphDropdownProps {
    options: string[];
    selectedoption: any;
    setselectedoption: any;
    menuVisible: boolean;
    setMenuVisible: (visible: boolean) => void;
}

const MoodGraphDropdown: React.FC<MoodGraphDropdownProps> = ({ options, selectedoption, setselectedoption, menuVisible, setMenuVisible }) => {
    return (
        <View style={{ width: '30%' }}>
            <Pressable onPress={() => setMenuVisible(!menuVisible)} className="flex flex-row justify-start items-center gap-1">
                <Text style={HomeStyles.Text} className="text-left">
                    {selectedoption || 'Select'}
                </Text>
                <AntDesign name="caretdown" size={10} color="#E6E6E6" />
            </Pressable>
            {menuVisible && (
                <View
                    style={{
                        marginTop: 15,
                        position: 'absolute',
                        zIndex: 100,
                        right: 0,
                        left: 0,
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
                                setselectedoption(option);
                                setMenuVisible(false);
                            }}
                            style={{
                                padding: 5,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ color: selectedoption === option ? '#00f2d6' : '#FFFFFF' }}>{option}</Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
};

export default MoodGraphDropdown;
