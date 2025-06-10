export interface ILoginBody {
    email?: string;
    password?: string;
    firebaseAccessToken?: any;
    firebaseRefreshToken?: any;
}
export interface IOAuthBody {
    email?: string;
    firebaseAccessToken?: any;
    firebaseRefreshToken?: any;
}
export interface IRegisterBody {
    email: string;
    password: string;
}
export interface IFogotBody {
    email: string;
}
export interface IVerifyCodeBody {
    email: string;
    code: number;
}
export interface IResetPassBody {
    email: string;
    code: number;
    password: string;
}
