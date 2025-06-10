import React, { ReactNode } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

interface GradientLayoutProps {
    children: ReactNode;
    style?: any;
}

const GradientLayout: React.FC<GradientLayoutProps> = ({ children, style }) => {
    return (
        <ImageBackground
            source={require('@/assets/images/bg.png')}
            style={[
                styles.gradient,
                //  { height },
                style,
            ]}
            resizeMode="cover"
        >
            {children}
        </ImageBackground>
    );
};
export default GradientLayout;
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        height: '100%',
        backgroundColor: '#011F26',
        justifyContent: 'center',
    },
});
