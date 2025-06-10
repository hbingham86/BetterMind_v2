import React from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import JournalStyles from '../home/journal/styles';
import { currentDateString } from '@/constants';
import { ThemedText } from '@/components/ThemedText';
import { useUserStore } from '@/store/useUserStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import JournalDetaillStyles from './styles';
import { moodItems } from './JornalWriting';
import { useMutation } from '@tanstack/react-query';
import { DeleteEJournalsByID } from '@/api/Journals';
import routeName from '@/routes/routeName';
import { useJournalStore } from '@/store/useJournalStore ';

type JournalDetailsRouteParams = {
    journalId: number;
    title: string;
    journalBody: string;
    mood: string;
};

export default function JournalDetails() {
    const route = useRoute<RouteProp<{ params: JournalDetailsRouteParams }, 'params'>>();
    const { user } = useUserStore();
    const { journalId, title, journalBody, mood } = route.params;
    const navigation = useNavigation<any>();
    const { deleteJournal } = useJournalStore();
    const getMoodIcon = (mood: string) => {
        const moodItem = moodItems.find((item: any) => item.value === mood);
        return moodItem ? moodItem.icon : null;
    };
    const { mutateAsync: delJournal } = useMutation({
        mutationFn: DeleteEJournalsByID.mutationFn,
    });
    const onDel = async () => {
        const response = await delJournal(journalId);
        if ('data' in response) {
            navigation.goBack();
            deleteJournal(journalId);
        }
    };
    return (
        <GradientLayout>
            <View style={JournalStyles.Main}>
                <View className="flex flex-row justify-between items-center gap-2 mt-20">
                    <View className="flex flex-row gap-2 justify-center items-center">
                        <Pressable onPress={navigation.goBack}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </Pressable>
                        <View>
                            <ThemedText type="primarywhite">{user?.fullName}’s Journal</ThemedText>
                            <Text className="text-[##FFFFFFCC] text-xs pt-1">Today . {currentDateString}</Text>
                        </View>
                    </View>
                    <View className="flex flex-row gap-2  items-center">
                        <Pressable
                            onPress={() =>
                                navigation.navigate(routeName.UPDATEJOURNAL, {
                                    journalId: journalId,
                                    title: title,
                                    journalBody: journalBody,
                                    mood: mood,
                                })
                            }
                        >
                            <Image source={require('../../assets/images/edit.png')} />
                        </Pressable>
                        <View style={JournalDetaillStyles.emojicolor}>{getMoodIcon(mood)}</View>
                        <Pressable onPress={onDel}>
                            <Image source={require('../../assets/images/del.png')} />
                        </Pressable>
                    </View>
                </View>
                <View style={JournalDetaillStyles.Main}>
                    <ScrollView contentContainerStyle={JournalStyles.ScrollContainer}>
                        <ThemedText type="defaultSemiBold">{title}</ThemedText>
                        <View className="mt-4">
                            <ThemedText type="primary">{journalBody}</ThemedText>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </GradientLayout>
    );
}
