import React from 'react';
import { Switch } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

interface CustomSwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    color?: string;
    style?: object;
    size?: number;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ value, onValueChange, color = '#6200ee', style, size = 1 }) => {
    return (
        <View style={[styles.container, style]}>
            <Switch value={value} onValueChange={onValueChange} color={color} style={{ transform: [{ scale: size }] }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CustomSwitch;
