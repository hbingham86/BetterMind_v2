import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const CustomSplashScreen = () => {
    return (
        <GradientLayout>
            <View className="flex-1 justify-center items-center ">
                <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
            </View>
        </GradientLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
});

export default CustomSplashScreen;
