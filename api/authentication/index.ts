import { mutationFn } from '@/util/axios';
import { IFogotBody, ILoginBody, IOAuthBody, IRegisterBody, IResetPassBody, IVerifyCodeBody } from './types';

export const loginApi = {
    mutationFn: (body: ILoginBody) => {
        return mutationFn('auth/login/user', 'POST', body);
    },
};
export const OAuthloginApi = {
    mutationFn: (body: IOAuthBody) => {
        return mutationFn('auth/login/oauth', 'POST', body);
    },
};
export const RegisterApi = {
    mutationFn: (body: IRegisterBody) => {
        return mutationFn('auth/register/user', 'POST', body);
    },
};
export const FogotPassApi = {
    mutationFn: (body: IFogotBody) => {
        return mutationFn('auth/forgot-password', 'POST', body);
    },
};
export const VerifyCodeApi = {
    mutationFn: (body: IVerifyCodeBody) => {
        return mutationFn('auth/verify-code', 'POST', body);
    },
};
export const ResendCodeApi = {
    mutationFn: (body: { email: string }) => {
        return mutationFn('auth/send-verification-code', 'POST', body);
    },
};
export const ResetPassApi = {
    mutationFn: (body: IResetPassBody) => {
        return mutationFn('auth/reset-password', 'POST', body);
    },
};
export const LogoutUser = {
    mutationFn: () => {
        return mutationFn(`auth/logout`, 'DELETE');
    },
};
