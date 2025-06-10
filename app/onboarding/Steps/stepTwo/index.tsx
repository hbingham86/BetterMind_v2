import React, { FC } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { List, Text } from 'react-native-paper';
import styles from './styles';
import CardData from './CardData';
import { View } from 'react-native';
import onboardingStyles from '../../styles';
import CustomButton from '@/components/CustomButton';
interface StepProps {
    onNext: () => void;
}

const step2: FC<StepProps> = ({ onNext }) => {
    return (
        <>
            <View style={onboardingStyles.stepContent}>
                <Text style={onboardingStyles.heading2}>Track, Reflect, and Thrive</Text>
            </View>
            <List.Section>
                {CardData.map((item) => (
                    <LinearGradient colors={['#0B3037', '#011F26']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.Main}>
                        <List.Item
                            key={item.heading}
                            title={() => <Text style={styles.heading}>{item.heading}</Text>}
                            description={() => <Text style={styles.Text}>{item.description}</Text>}
                            left={() => <item.SvgComponent />}
                        />
                    </LinearGradient>
                ))}
            </List.Section>
            <View style={onboardingStyles.center}>
                <CustomButton style={onboardingStyles.buttonStyle} onPress={onNext}>
                    Next
                </CustomButton>
            </View>
        </>
    );
};
export default step2;
