import { View, Text, ScrollView, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import { useNavigation } from 'expo-router';
import JournalStyles from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { useUserStore } from '@/store/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { JournalsResponse } from '@/api/Journals/types';
import { getMyJournals } from '@/api/Journals';
import { ActivityIndicator } from 'react-native-paper';
import { currentDateString } from '@/constants';
import CustomButton from '@/components/CustomButton';
import routeName from '@/routes/routeName';
import { useJournalStore } from '@/store/useJournalStore ';
import { MaterialIcons } from '@expo/vector-icons';

export default function Journal() {
    const navigation = useNavigation<any>();
    const { user } = useUserStore();
    const { search, mood, page, setSearch, setMood, setPage, limit, setJournals, journals } = useJournalStore();
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const { data, isLoading, isFetching, isError, refetch } = useQuery<JournalsResponse>(getMyJournals({ page, limit, mood, search }));

    useEffect(() => {
        setSearch('');
        setMood('');
        setPage(1);
    }, []);
    useEffect(() => {
        if (data?.data?.journals) {
            refetch();
            setJournals(page === 1 ? data.data.journals : [...journals, ...data.data.journals]);
            setIsFetchingMore(false);
        }
    }, [data, setJournals]);

    const fetchNextPage = () => {
        if (!isFetchingMore && !isLoading && data?.data?.journals.length === limit) {
            setIsFetchingMore(true);
            setPage(page + 1);
        }
    };

    const truncateText = (text: string | null | undefined, charLimit: number): string => {
        if (!text) return '';
        return text.length > charLimit ? text.slice(0, charLimit) + '...' : text;
    };

    return (
        <GradientLayout>
            <View style={JournalStyles.Main}>
                <View className="flex flex-row justify-between items-center gap-2 mt-20">
                    <View>
                        <ThemedText type="primarywhite">{user?.fullName} Journal’s</ThemedText>
                        <Text className="text-[##FFFFFFCC] text-xs pt-1">Today . {currentDateString}</Text>
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle={JournalStyles.ScrollContainer}
                    onMomentumScrollEnd={(event) => {
                        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
                        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
                            fetchNextPage();
                        }
                    }}
                >
                    <View style={JournalStyles.container}>
                        <View style={JournalStyles.searchContainer}>
                            <Ionicons name="search" size={20} color="#E6E6E6" style={JournalStyles.icon} />
                            <TextInput
                                style={JournalStyles.input}
                                placeholder="Search"
                                placeholderTextColor="gray"
                                value={search}
                                onChangeText={setSearch}
                            />
                            <TouchableOpacity>
                                <Ionicons name="filter" size={20} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {isLoading || isFetching ? (
                        <View style={{ flex: 1, marginTop: 30 }}>
                            <ActivityIndicator size={'small'} color="white" />
                        </View>
                    ) : isError ? (
                        <Text style={{ color: 'white' }}>Error fetching data</Text>
                    ) : (
                        <View className="mt-5">
                            {journals?.length > 0 ? (
                                journals.map((journal, index) => {
                                    return (
                                        <Pressable
                                            key={index}
                                            style={JournalStyles.boxText}
                                            onPress={() =>
                                                navigation.navigate(routeName.JOURNALDETAILS, {
                                                    journalId: journal.id,
                                                    title: journal.title,
                                                    journalBody: journal?.journalBody,
                                                    mood: journal.mood,
                                                })
                                            }
                                        >
                                            <Text style={JournalStyles.heading}>{truncateText(journal?.title, 30)}</Text>
                                            <Text style={JournalStyles.noramlText}>{truncateText(journal?.journalBody, 50)}</Text>
                                        </Pressable>
                                    );
                                })
                            ) : (
                                <Text style={{ color: 'white' }}>No Journals Available</Text>
                            )}
                        </View>
                    )}
                </ScrollView>
                <CustomButton style={JournalStyles.writeButton} onPress={() => navigation.navigate(routeName.WRITEJOURNAL)}>
                    <Text style={JournalStyles.writeButtonText}>
                        <MaterialIcons name="edit" size={16} color="#0A2F36" />
                        {' Write Entry'}
                    </Text>
                </CustomButton>
            </View>
        </GradientLayout>
    );
}
