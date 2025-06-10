import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    gradient: {
        borderRadius: 40,
        padding: 1,
    },
    button: {
        borderRadius: 40,
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
    },
    enabledText: {
        color: '#000000',
    },
    disabledText: {
        color: '#A5A5A5',
    },
    disabledGradient: {
        opacity: 0.7,
    },
    disabledButton: {
        backgroundColor: 'transparent',
    },
});
