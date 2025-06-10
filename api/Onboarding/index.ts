import { mutationFn } from '@/util/axios';

export const AddEmergencyContact = {
    mutationFn: (body: any) => {
        return mutationFn('users/emergency-contacts', 'POST', body);
    },
};
export const DeleteEmergencyContact = {
    mutationFn: (id: any) => {
        return mutationFn(`users/emergency-contacts/${id}`, 'DELETE');
    },
};
export const dailyOnboardingApi = {
    mutationFn: (body: any) => {
        return mutationFn('users/daily-onboarding', 'POST', body);
    },
};
