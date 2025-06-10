import { View, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import TopBar from '@/components/TopBar';
import ProfileStyles from '../home/profile/styles';
import { styles } from './styles';
import InputComp from '@/components/Input';
import ShineSvg from '@/SVG/ShineSvg';
import { useNavigation } from 'expo-router';
import { useUserStore } from '@/store/useUserStore';
import { getUserByIDApi } from '@/api/user';
import { useMutation } from '@tanstack/react-query';
import CustomButton from '@/components/CustomButton';
import { ActivityIndicator } from 'react-native-paper';

export default function ChangeAI() {
    const navigation = useNavigation<any>();
    const { user, AiName } = useUserStore();
    const [loading, setLoading] = useState(false);
    const methods = useForm({
        defaultValues: {
            AiName: AiName || user?.AiName,
        },
    });
    const [isEditable, setIsEditable] = useState(true);
    const handleEditPress = () => {
        setIsEditable((prevState) => !prevState);
    };
    const { mutateAsync: updateAiName } = useMutation({
        mutationFn: getUserByIDApi.mutationFn,
    });
    const save = methods.handleSubmit(async (data) => {
        setLoading(true);
        const { AiName } = data;
        Keyboard.dismiss();
        const response = await updateAiName({
            body: { AiName },
        });
        if ('data' in response && user) {
            useUserStore.getState().setAiName(AiName ?? '');
            setLoading(false);
        }
        setLoading(false);
        navigation.goBack();
    });

    return (
        <GradientLayout>
            <View style={ProfileStyles.Main}>
                <TopBar title="Change Your AI’s name" onBackPress={() => navigation.goBack()} />

                <View style={styles.main} className="mt-20">
                    <FormProvider {...methods}>
                        <View>
                            <InputComp
                                label="AI assistant"
                                name="AiName"
                                placeholder={user?.AiName || 'Enter AI Name'}
                                leftIcon={<ShineSvg color="#9DB6B7" />}
                                value={methods.watch('AiName')}
                                onChangeText={(text) => methods.setValue('AiName', text)}
                                isEditable={isEditable}
                                onEditPress={handleEditPress}
                                showEditIcon={false}
                                keyboardType="default"
                            />

                            <CustomButton style={styles.buttonStyle} onPress={save}>
                                {loading ? <ActivityIndicator size="small" color="#000" /> : 'Save'}
                            </CustomButton>
                        </View>
                    </FormProvider>
                </View>
            </View>
        </GradientLayout>
    );
}
