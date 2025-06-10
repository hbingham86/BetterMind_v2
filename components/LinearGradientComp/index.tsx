import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface LinearGradientProps {
    style?: any;
    GradientColors?: any;
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    children?: ReactNode;
    borderColor?: string;
}

export default function CustomLinearGradient({
    style,
    GradientColors = ['#00DDFF', '#00FFBE'],
    start = { x: 0.5, y: 0 },
    end = { x: 0.5, y: 1 },
    children,
    borderColor = 'transparent',
}: LinearGradientProps) {
    return (
        <LinearGradient style={[style, { borderColor: borderColor, borderWidth: 1 }]} colors={GradientColors} start={start} end={end}>
            {children}
        </LinearGradient>
    );
}
