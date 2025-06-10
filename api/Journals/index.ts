import { mutationFn, queryFn } from '@/util/axios';
import { GetJournalsParams, JournalsResponse } from './types';

export const getMyJournals = ({
    page,
    limit,
    mood,
    search,
}: GetJournalsParams): { queryKey: [string, GetJournalsParams]; queryFn: () => Promise<JournalsResponse> } => ({
    queryKey: ['myJournals', { page, limit, mood, search }],
    queryFn: async () => {
        // console.log('Sending to backend:', { page, limit, mood, search });
        const response = await queryFn(`journals/my-journals?search=${search}&mood=${mood}&page=${page}&limit=${limit}`);
        // console.log('Response:', response);
        return response as JournalsResponse;
    },
});

export const addJournals = {
    mutationFn: (body: any) => {
        return mutationFn(`journals`, 'POST', body);
    },
};
export const DeleteEJournalsByID = {
    mutationFn: (id: any) => {
        return mutationFn(`journals/${id}`, 'DELETE');
    },
};
export const getJournalsByID = (id: any) => ({
    queryKey: ['getJournal', id],
    queryFn: () => queryFn(`journals/${id}`),
});

export const updateJournals = {
    mutationFn: ({ body, id }: { body: any; id: any }) => {
        return mutationFn(`journals/${id}`, 'PATCH', body);
    },
};
