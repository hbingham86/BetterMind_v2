import { mutationFn } from '@/util/axios';

export const SubscriptionAPI = {
    mutationFn: (body: any) => {
        return mutationFn(`stripe/subscription/checkout`, 'POST', body);
    },
};
export const ConfirmPayment = {
    mutationFn: (body: any) => {
        return mutationFn(`stripe/confirm-payment`, 'POST', body);
    },
};
