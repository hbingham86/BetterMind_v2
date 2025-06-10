import { mutationFn, queryFn } from '@/util/axios';

export const getCurrentUserApi = {
    queryKey: ['userData'],
    queryFn: () => queryFn<any>('users/profile'),
};

export const getUserByIDApi = {
    mutationFn: ({ body }: { body: any }) => {
        return mutationFn(`users/profile`, 'PATCH', body);
    },
};
export const addProfilePic = {
    mutationFn: ({ body }: { body: any }) => {
        return mutationFn(`users/profile-pictures`, 'POST', body);
    },
};
export const deleteUser = {
    mutationFn: () => {
        return mutationFn(`users/my-account`, 'DELETE');
    },
};
