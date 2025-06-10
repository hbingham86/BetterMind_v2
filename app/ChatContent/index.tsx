import React, { useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, Pressable } from 'react-native';
import CustomLinearGradient from '@/components/LinearGradientComp';
import { ThemedText } from '@/components/ThemedText';
import { useRoute } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import { useQuery } from '@tanstack/react-query';
import { getChatsById } from '@/api/Chatbot';
import ChatStyles from '../home/chat/ChatStyles';
import * as Clipboard from 'expo-clipboard';

const ChatContent: React.FC = () => {
    const route = useRoute();
    const { user, AiName } = useUserStore();
    const [copied, setCopied] = useState(true);
    const { threadId } = route.params as { name: string; threadId: string; isChatEnded: boolean };
    // const test = 'thread_cbDRvQ2msX6vi6hEZRsEeKF5';
    const { data, isLoading, isFetching } = useQuery(getChatsById(threadId, 100));
    const messages = data?.data ?? [];

    const handleCopy = (text: string) => {
        Clipboard.setStringAsync(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setCopied(true);
    };

    return (
        <GradientLayout>
            <View style={ChatStyles.Main}>
                <View className="flex flex-row justify-start items-center gap-2 mt-20 " style={{ marginBottom: 3 }}>
                    <View>
                        <ThemedText type="primarywhite">{AiName || user?.AiName}</ThemedText>
                        <Text className="text-[##FFFFFFCC] text-xs pt-1">Your companion</Text>
                    </View>
                </View>

                {isLoading || isFetching ? (
                    <ActivityIndicator size="small" color="white" />
                ) : messages.length === 0 ? (
                    <View style={ChatStyles.NoMessagesContainer}>
                        <Text style={ChatStyles.NoMessagesText}>Empty Chats</Text>
                    </View>
                ) : (
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 80 }}
                        scrollEventThrottle={400}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                    >
                        {messages.map((message, index) => (
                            <View key={index} style={message.role === 'user' ? ChatStyles.MessageContainer : ChatStyles.BotContainer}>
                                {message.role === 'user' ? (
                                    <Text style={ChatStyles.MessageText}>{message.content[0]?.text?.value}</Text>
                                ) : (
                                    <View className="flex flex-row gap-2">
                                        <Image source={require('@/assets/images/bot.png')} style={ChatStyles.bot} />
                                        <View>
                                            <CustomLinearGradient style={ChatStyles.BotContainer}>
                                                <Text style={ChatStyles.BotText}> {JSON.parse(message.content[0]?.text?.value)?.reply}</Text>
                                            </CustomLinearGradient>
                                            {copied && (
                                                <Pressable onPress={() => handleCopy(JSON.parse(message.content[0]?.text?.value)?.reply)}>
                                                    <Image source={require('@/assets/images/copy.png')} style={ChatStyles.copy} />
                                                </Pressable>
                                            )}
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>
        </GradientLayout>
    );
};

export default ChatContent;
