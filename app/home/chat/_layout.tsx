import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Pressable,
    Keyboard,
    FlatList,
    BackHandler,
} from 'react-native';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import ChatStyles from './ChatStyles';
import { ThemedText } from '@/components/ThemedText';
import { useUserStore } from '@/store/useUserStore';
import { Image } from 'react-native';
import CustomLinearGradient from '@/components/LinearGradientComp';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FormProvider, useForm } from 'react-hook-form';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import ShineSvg from '@/SVG/ShineSvg';
import { createNewChat, getAllChats, sendMsg } from '@/api/Chatbot';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loader from 'react-native-three-dots';
import { ActivityIndicator } from 'react-native-paper';
import getAllChatsStore from '@/store/getAllChatsStore';
import { useNavigation } from 'expo-router';
import routeName from '@/routes/routeName';
import * as Clipboard from 'expo-clipboard';
import SimpleInput from '@/components/Input/SimpleInput';
import { getCurrentUserApi } from '@/api/user';
import { useFocusEffect } from '@react-navigation/native';
const initialQuickReplies = ['I feel stuck', "I don't feel like myself anymore"];
// interface ChatProp {
//     id: number;
//     name: string;
//     isChatEnded: boolean;
//     threadId: string;
// }
export default function Chat() {
    const { user, setUser, AiName } = useUserStore();
    const navigation = useNavigation<any>();
    const [messages, setMessages] = useState<string[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [quickReplies, setQuickReplies] = useState(initialQuickReplies);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const methods = useForm();
    const { mutateAsync: sendnewMsg } = useMutation({
        mutationFn: sendMsg.mutationFn,
    });
    const { data: userData, refetch: userRefecth } = useQuery({
        ...getCurrentUserApi,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
    });
    useFocusEffect(
        useCallback(() => {
            userRefecth();
        }, [])
    );
    useEffect(() => {
        if (userData?.data) {
            setUser(userData.data);
        }
    }, [userData?.data, setUser, user]);
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        });
        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);
    const sendMessage = async (message?: string) => {
        const textToSend = message || inputText.trim();
        console.log(threadId, 'threadId');
        if (!textToSend) return;
        setQuickReplies([]);
        setMessages((prevMessages: any) => [...prevMessages, { role: 'user', content: textToSend }]);
        setMessages((prevMessages: any) => [...prevMessages, { role: 'assistant', content: 'loading' }]);
        setInputText('');
        setIsLoading(true);
        try {
            let currentThreadId = threadId;
            if (!currentThreadId) {
                const threadResponse = await createNewChat.mutationFn({});
                if (threadResponse?.data?.chat?.threadId) {
                    currentThreadId = threadResponse.data.chat.threadId;
                    setThreadId(currentThreadId);
                    console.log(currentThreadId, 'currentThreadId');
                }
            }
            const sendMessageResponse = await sendnewMsg({
                threadId: currentThreadId,
                message: textToSend,
            });
            const assistantResponse =
                sendMessageResponse?.data?.messages.find((msg: any) => msg.role === 'assistant')?.content[0]?.text?.value || 'No response';
            setMessages((prevMessages: any) =>
                prevMessages.map((msg: any, index: any) =>
                    index === prevMessages.length - 1 ? { role: 'assistant', content: assistantResponse } : msg
                )
            );
            setIsLoading(false);
        } catch (error) {
            // console.error('Error ', error);
            setIsLoading(false);
        }
        setIsLoading(false);
    };
    const handleQuickReply = async (reply: string) => {
        setQuickReplies([]);
        try {
            setMessages((prevMessages: any) => [...prevMessages, { role: 'user', content: reply }]);
            setMessages((prevMessages: any) => [...prevMessages, { role: 'assistant', content: 'loading' }]);
            let currentThreadId = threadId;
            if (!currentThreadId) {
                const threadResponse = await createNewChat.mutationFn({});
                if (threadResponse?.data?.chat?.threadId) {
                    currentThreadId = threadResponse.data.chat.threadId;
                    setThreadId(currentThreadId);
                }
            }
            const sendMessageResponse = await sendnewMsg({ threadId: currentThreadId, message: reply });
            setIsLoading(true);
            const assistantResponse =
                sendMessageResponse?.data?.messages.find((msg: any) => msg.role === 'assistant')?.content[0]?.text?.value || 'No response';
            setMessages((prevMessages: any) =>
                prevMessages.map((msg: any, index: any) =>
                    index === prevMessages.length - 1 ? { role: 'assistant', content: assistantResponse } : msg
                )
            );
            setIsLoading(false);
        } catch (error) {
            // console.error('Error ', error);
            setIsLoading(false);
        }
    };
    const { page, allChats, isFetchingMore, setPage, setIsFetchingMore, setAllChats } = getAllChatsStore();
    const { data, isFetching, refetch } = useQuery(getAllChats(15, page));
    const handleLoadMore = () => {
        if (!isFetching && !isFetchingMore) {
            setIsFetchingMore(true);
            setPage(page + 1);
        }
    };
    useEffect(() => {
        if (data?.data?.chats) {
            // appendChats(data.data.chats);
            setAllChats([...new Map([...allChats, ...data.data.chats].map((chat) => [chat.id, chat])).values()]);
            setIsFetchingMore(false);
        }
    }, [data]);
    const toggleMenu = () => {
        refetch();
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    useEffect(() => {
        const backAction = () => {
            if (isMenuOpen) {
                closeMenu();
                return true;
            }
            return false;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => {
            backHandler.remove();
        };
    }, [isMenuOpen]);

    // const [isModalVisible, setModalVisible] = useState(false);

    const [copied, setCopied] = useState(true);

    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setCopied(true);
    };

    // const closeModal = () => {
    //     setModalVisible(false);
    // };
    const safeParseJSON = (data: string) => {
        try {
            return JSON.parse(data);
        } catch (error) {
            // console.error('Error parsing JSON:', error);
            return null;
        }
    };

    // const hasCrisis = messages.some((message: any) => {
    //     if (message.role === 'assistant') {
    //         const content = safeParseJSON(message.content);
    //         return content?.crisis === true;
    //     }
    //     return false;
    // });

    // useEffect(() => {
    //     if (hasCrisis) {
    //         setModalVisible(true);
    //     }
    // }, [hasCrisis]);

    return (
        <GradientLayout>
            <View style={ChatStyles.Main}>
                <View className="flex flex-row justify-start items-center gap-2 mt-20 " style={{ marginBottom: 3 }}>
                    <Pressable onPress={toggleMenu}>
                        <MaterialIcons name="menu" size={30} color="white" />
                    </Pressable>
                    <View>
                        <ThemedText type="primarywhite">{user?.AiName || AiName}</ThemedText>
                        <Text className="text-[##FFFFFFCC] text-xs pt-1">Your companion</Text>
                    </View>
                </View>

                {isMenuOpen && (
                    <TouchableWithoutFeedback onPress={closeMenu}>
                        <View style={ChatStyles.MenuOverlay}>
                            <View style={ChatStyles.MenuContainer}>
                                <Pressable
                                    onPress={() => {
                                        setMessages([]);
                                        setInputText('');
                                        setQuickReplies(initialQuickReplies);
                                        setThreadId(null);
                                        closeMenu();
                                    }}
                                >
                                    <Text style={ChatStyles.MenuText}>
                                        <ShineSvg color="white" /> New Chat
                                    </Text>
                                </Pressable>
                                <Text style={ChatStyles.border}>Chat History</Text>
                                <FlatList
                                    data={allChats}
                                    keyExtractor={(item, index) => `${item.id}-${index}`}
                                    renderItem={({ item }) => (
                                        <Pressable
                                            onPress={() => {
                                                navigation.navigate(routeName.CHATHISTORY, {
                                                    name: item.name,
                                                    threadId: item.threadId,
                                                    isChatEnded: item.isChatEnded,
                                                });
                                                closeMenu();
                                            }}
                                        >
                                            <Text style={ChatStyles.name}>{item.name}</Text>
                                        </Pressable>
                                    )}
                                    scrollEnabled={true}
                                    onEndReached={handleLoadMore}
                                    onEndReachedThreshold={0.9}
                                    ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="white" /> : null}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}

                <ScrollView
                    contentContainerStyle={ChatStyles.ScrollContainer}
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    ref={scrollViewRef}
                >
                    {quickReplies.length > 0 && (
                        <View className="flex-1 justify-center text-center items-center" style={{ marginTop: responsiveHeight(25) }}>
                            <ThemedText type="primarywhite" style={{ textAlign: 'center' }}>
                                What brings you here today?
                            </ThemedText>
                            <View style={ChatStyles.QuickRepliesContainer}>
                                {quickReplies.map((reply, index) => (
                                    <TouchableOpacity key={index} style={ChatStyles.QuickReplyButton} onPress={() => handleQuickReply(reply)}>
                                        <Text style={ChatStyles.QuickReplyText}>{reply}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                    {messages.map((message: any, index) => {
                        const isAssistant = message.role === 'assistant';
                        const content = safeParseJSON(message.content);
                        console.log(content, 'content');
                        const replyText = content?.reply || message.content;

                        return (
                            <View key={index}>
                                {message.role === 'user' && (
                                    <View style={ChatStyles.MessageContainer}>
                                        <Text style={ChatStyles.MessageText}>{message.content}</Text>
                                    </View>
                                )}
                                {isAssistant && (
                                    <View className="flex flex-row gap-2">
                                        <Image source={require('@/assets/images/bot.png')} style={ChatStyles.bot} />
                                        <View>
                                            <CustomLinearGradient style={ChatStyles.BotContainer}>
                                                {message.content === 'loading' ? <Loader /> : <Text style={ChatStyles.BotText}>{replyText}</Text>}
                                            </CustomLinearGradient>

                                            <Pressable onPress={() => copyToClipboard(replyText)}>
                                                <Image source={require('@/assets/images/copy.png')} style={ChatStyles.copy} />
                                            </Pressable>
                                        </View>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 2 : 0}>
                    <CustomLinearGradient
                        style={ChatStyles.InputContainer}
                        GradientColors={['#012027', '#0A2F36']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View className=" " style={ChatStyles.chatCont}>
                            <FormProvider {...methods}>
                                <MaterialIcons name="keyboard-voice" size={19} color="#00DDFF" style={ChatStyles.mic} />
                                <SimpleInput
                                    name="message"
                                    placeholder="Start typing..."
                                    value={inputText}
                                    onChangeText={(text: any) => setInputText(text)}
                                    keyboardType="default"
                                    onSubmitEditing={() => !isLoading && sendMessage()}
                                    backgroundColor="transparent"
                                    borderColor="transparent"
                                    inputStyle={ChatStyles.inputWrapperStyles}
                                />
                                <TouchableOpacity style={ChatStyles.SendButton} onPress={() => !isLoading && sendMessage()} disabled={isLoading}>
                                    <Image source={require('@/assets/images/send.png')} style={ChatStyles.SendButtonText} />
                                </TouchableOpacity>
                            </FormProvider>
                        </View>
                        {/* <MaterialIcons name="keyboard-voice" size={20} color="#00DDFF" style={ChatStyles.mic} /> */}
                    </CustomLinearGradient>
                </KeyboardAvoidingView>
                {/* {isModalVisible && <EmergencyModal isModalVisible={isModalVisible} close={closeModal} />} */}
            </View>
        </GradientLayout>
    );
}
