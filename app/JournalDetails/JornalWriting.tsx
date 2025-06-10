import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet, Keyboard } from 'react-native';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import JournalStyles from '../home/journal/styles';
import { currentDateString } from '@/constants';
import { ThemedText } from '@/components/ThemedText';
import { useUserStore } from '@/store/useUserStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import JournalDetaillStyles from './styles';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import DropdownComp from '@/components/DropdownComp';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useMutation } from '@tanstack/react-query';
import { addJournals } from '@/api/Journals';
import CustomButton from '@/components/CustomButton';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ActivityIndicator } from 'react-native-paper';
import { useJournalStore } from '@/store/useJournalStore ';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

export const moodItems = [
    { label: 'Happy', value: 'Happy', icon: <MaterialCommunityIcons name="emoticon-happy-outline" size={18} color="#0A2F36" /> },
    { label: 'Sad', value: 'Sad', icon: <MaterialCommunityIcons name="emoticon-sad-outline" size={18} color="#0A2F36" /> },
    { label: 'Despair', value: 'Despair', icon: <MaterialCommunityIcons name="emoticon-dead-outline" size={18} color="#0A2F36" /> },
    { label: 'Confident', value: 'Confident', icon: <MaterialCommunityIcons name="emoticon-cool-outline" size={18} color="#0A2F36" /> },
    { label: 'Frustrated', value: 'Frustrated', icon: <MaterialCommunityIcons name="emoticon-angry-outline" size={18} color="#0A2F36" /> },
    { label: 'Hopeful', value: 'Hopeful', icon: <MaterialCommunityIcons name="emoticon-excited-outline" size={18} color="#0A2F36" /> },
    { label: 'Confused', value: 'Confused', icon: <MaterialCommunityIcons name="emoticon-confused-outline" size={18} color="#0A2F36" /> },
    { label: 'Anxious', value: 'Anxious', icon: <MaterialCommunityIcons name="emoticon-cry-outline" size={18} color="#0A2F36" /> },
];

const schema = yup.object().shape({
    title: yup.string().required('*Required'),
    journalBody: yup.string().required('*Required'),
    mood: yup.string().required('*Required'),
});

export default function JournalWriting() {
    const { user } = useUserStore();
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);
    const { addJournal } = useJournalStore();

    const methods = useForm({
        resolver: yupResolver(schema),
    });

    const { mutateAsync: writeJournal } = useMutation({
        mutationFn: addJournals.mutationFn,
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        const response = await writeJournal(data);
        if ('data' in response) {
            methods.reset();
            navigation.goBack();
            setLoading(false);
            const newJournal = data;
            addJournal(newJournal);
        }
        setLoading(false);
    };
    const [lineCount, setLineCount] = useState(20);
    const handleContentSizeChange = (event: any) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const lineHeight = 40;
        const calculatedLines = Math.max(20, Math.ceil(contentHeight / lineHeight));
        setLineCount(calculatedLines);
    };

    return (
        <GradientLayout>
            <FormProvider {...methods}>
                <View style={JournalStyles.Main}>
                    <Pressable onPress={Keyboard.dismiss} className="flex flex-row justify-between items-center gap-2 mt-20">
                        <View className="flex flex-row gap-2 items-center justify-center">
                            <Pressable onPress={navigation.goBack}>
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </Pressable>
                            <View>
                                <ThemedText type="primarywhite">{user?.fullName}’s Journal</ThemedText>
                                <Text className="text-[##FFFFFFCC] text-xs pt-1">Today . {currentDateString}</Text>
                            </View>
                        </View>
                        <View>
                            <DropdownComp
                                name="mood"
                                placeholder="Mood"
                                backgroundColor="transparent"
                                borderColor="#1AC398"
                                borderRadius={10}
                                items={moodItems}
                            />
                        </View>
                    </Pressable>

                    <View style={JournalDetaillStyles.Main}>
                        <ScrollView contentContainerStyle={JournalStyles.ScrollContainer} keyboardShouldPersistTaps="handled">
                            <Controller
                                name="title"
                                control={methods.control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Title"
                                            placeholderTextColor="#FFFFFF66"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            multiline
                                        />
                                        {methods.formState.errors.title && (
                                            <Text style={styles.errorText}>{methods.formState.errors.title.message}</Text>
                                        )}
                                    </>
                                )}
                            />

                            <View style={styles.notebookContainer}>
                                {Array.from({ length: lineCount }).map((_, index) => (
                                    <View key={index} style={[styles.line, { top: index * 40 }]} />
                                ))}
                                <Controller
                                    name="journalBody"
                                    control={methods.control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <>
                                            <TextInput
                                                style={styles.textArea}
                                                placeholder="Start writing..."
                                                placeholderTextColor="#FFFFFF66"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                onContentSizeChange={handleContentSizeChange}
                                                multiline
                                                textAlignVertical="top"
                                            />
                                            {methods.formState.errors.journalBody && (
                                                <Text style={styles.errorText}>{methods.formState.errors.journalBody.message}</Text>
                                            )}
                                        </>
                                    )}
                                />
                            </View>
                        </ScrollView>

                        <View style={{ marginBottom: 20, marginTop: 50 }}>
                            <CustomButton onPress={methods.handleSubmit(onSubmit)}>
                                {loading ? <ActivityIndicator size="small" color="#000" /> : 'Save'}
                            </CustomButton>
                        </View>
                    </View>
                </View>
            </FormProvider>
        </GradientLayout>
    );
}

const styles = StyleSheet.create({
    input: {
        fontWeight: '700',
        width: '100%',
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        fontSize: responsiveFontSize(2),
        // borderBottomColor: '#1AC398',
        // borderBottomWidth: 1,
    },
    textArea: {
        fontWeight: '400',
        width: '100%',
        color: '#FFFFFF',
        fontSize: responsiveFontSize(1.6),
        backgroundColor: 'transparent',
        lineHeight: 40,
        textAlignVertical: 'top',
        minHeight: responsiveHeight(40),
    },
    errorText: {
        marginBottom: responsiveHeight(2),
        fontSize: responsiveFontSize(1.5),
        color: '#42FFEA',
    },
    notebookContainer: {
        position: 'relative',
        width: '100%',
        minHeight: responsiveHeight(40),
        marginBottom: responsiveHeight(2),
    },
    line: {
        position: 'absolute',
        width: '100%',
        height: 2,
        backgroundColor: '#FFFFFF4D',
        top: 0,
    },
});
