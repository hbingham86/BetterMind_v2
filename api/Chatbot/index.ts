import { mutationFn, queryFn } from '@/util/axios';
export interface ChatMessageContent {
    type: string;
    text: {
        value: string;
        annotations: any[];
    };
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: ChatMessageContent[];
}

export interface ChatResponse {
    data: ChatMessage[];
    // body: {
    //     data: ChatMessage[];
    //     has_more?: boolean;
    // };
}

export const createNewChat = {
    mutationFn: (body: any) => {
        return mutationFn(`chatbot/thread`, 'POST', body);
    },
};
export const sendMsg = {
    mutationFn: (body: any) => {
        return mutationFn(`chatbot/message`, 'POST', body);
    },
};
export const getAllChats = (limit: number, page: number) => ({
    queryKey: ['getAllChats', limit, page],
    queryFn: () => queryFn<any>(`chatbot/threads?limit=${limit}&page=${page}`),
});

export const getChatsById = (id: any, limit: number) => ({
    queryKey: ['getChatsBYID', id, limit],
    queryFn: async (): Promise<ChatResponse> => {
        const response = await queryFn(`chatbot/thread/${id}/messages?limit=${limit}`);
        return response as ChatResponse;
    },
});
