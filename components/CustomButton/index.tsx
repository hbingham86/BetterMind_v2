import React from 'react';
import { TextStyle, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button as PaperButton } from 'react-native-paper';
import { styles } from './styles';

interface ButtonProps {
    onPress?: () => void;
    style?: any;
    textStyle?: TextStyle | TextStyle[];
    children?: React.ReactNode;
    mode?: 'text' | 'outlined' | 'contained';
    disable?: boolean;
    disabledTextColor?: string;
    enabledTextColor?: string;
    disabledGradientColors?: any;
    enabledGradientColors?: any;
}

export default function CustomButton({
    onPress,
    style,
    textStyle,
    children,
    mode = 'contained',
    disable = false,
    disabledTextColor = '#A5A5A5',
    enabledTextColor = 'black',
    disabledGradientColors = ['#3E5659', '#3E5659'],
    enabledGradientColors = ['#00DDFF', '#00FFBE'],
}: ButtonProps) {
    return (
        <TouchableWithoutFeedback onPress={disable ? undefined : onPress}>
            <LinearGradient
                style={[styles.gradient, style, disable && styles.disabledGradient]}
                colors={disable ? disabledGradientColors : enabledGradientColors}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                // locations={[-0.0737, 1.0407]}
            >
                <PaperButton
                    mode={mode}
                    style={[styles.button, disable && styles.disabledButton]}
                    labelStyle={[styles.text, textStyle, { color: disable ? disabledTextColor : enabledTextColor }]}
                    disabled={disable}
                >
                    {children}
                </PaperButton>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}
