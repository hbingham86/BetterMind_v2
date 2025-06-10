import { View, Text } from 'react-native';
import React, { useState } from 'react';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import ProfileStyles from '../home/profile/styles';
import TopBar from '@/components/TopBar';
import { styles } from './styles';
import { useNavigation } from 'expo-router';
import CustomSwitch from '@/components/CustomSwitch';

export default function Notification() {
    const navigation = useNavigation<any>();

    // State to manage switches
    const [switchStates, setSwitchStates] = useState<any>({
        dailySummary: false,
        criticalAlerts: false,
        marketingUpdates: false,
    });

    // Labels for each switch
    const switches = [
        {
            key: 'dailySummary',
            label: 'Get a daily summary of your notifications.',
        },
        {
            key: 'criticalAlerts',
            label: 'Critical alerts for login and password changes.',
        },
        {
            key: 'marketingUpdates',
            label: 'Marketing and promotional updates.',
        },
    ];

    const handleToggle = (key: string, value: boolean) => {
        setSwitchStates((prevState: any) => ({
            ...prevState,
            [key]: value,
        }));
    };
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handle = (value: boolean) => {
        setIsSwitchOn(value);
    };
    return (
        <GradientLayout>
            <View style={ProfileStyles.Main}>
                <TopBar title="Notifications" onBackPress={() => navigation.goBack()} />
                <View style={styles.main} className="flex-1">
                    <View style={styles.cont} className="mt-10">
                        <Text style={styles.subtext}>Notifications</Text>
                        <CustomSwitch value={isSwitchOn} onValueChange={handle} color="#1AC398" />
                    </View>
                    <Text style={styles.subhead}>Customize how and when you receive notifications.</Text>
                    {switches.map(({ key, label }) => (
                        <View key={key} style={styles.cont}>
                            <Text style={styles.subtext}>{label}</Text>
                            <CustomSwitch value={switchStates[key]} onValueChange={(newValue) => handleToggle(key, newValue)} color="#1AC398" />
                        </View>
                    ))}
                </View>
            </View>
        </GradientLayout>
    );
}
