import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?:
        | 'default'
        | 'title'
        | 'defaultSemiBold'
        | 'subtitle'
        | 'link'
        | 'primary'
        | 'gradient'
        | 'sec'
        | 'primaryBlack'
        | 'primarywhite'
        | 'defaultBlack';
    className?: string;
};

export function ThemedText({ style, lightColor, darkColor, type = 'default', className, ...rest }: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <Text
            style={[
                { color },
                type === 'default' ? styles.default : undefined,
                type === 'defaultBlack' ? styles.defaultBlack : undefined,
                type === 'primary' ? styles.primary : undefined,
                type === 'gradient' ? styles.gradient : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                type === 'sec' ? styles.sec : undefined,
                type === 'primaryBlack' ? styles.primaryBlack : undefined,
                type === 'primarywhite' ? styles.primarywhite : undefined,
                style,
            ]}
            className={className}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: responsiveFontSize(1.8),
        lineHeight: 24,
        color: '#CCCCCC',
    },
    defaultBlack: {
        fontSize: responsiveFontSize(1.8),
        lineHeight: 24,
        color: '#0A2F36',
    },
    gradient: {
        color: '#2FBBCD',
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400',
    },
    primary: {
        color: '#CCCCCC',
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400',
        lineHeight: 30,
    },
    primaryBlack: {
        color: '#000000',
        fontSize: responsiveFontSize(1.6),
        fontWeight: '400',
    },
    primarywhite: {
        color: '#FFFFFF',
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
    },
    sec: {
        color: '#FFFFFF99',
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
        lineHeight: 20,
    },
    defaultSemiBold: {
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        color: 'white',
    },
    title: {
        fontSize: responsiveFontSize(3),
        fontWeight: '600',
        lineHeight: 32,
        color: 'white',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    },
});
