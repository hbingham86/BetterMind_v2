export interface IUserResponse {
    data: {
        id: number | undefined;
        email: string | undefined;
        fullName: string | undefined;
        dob: string | null;
        emergencyContacts: { id: number; phone: string }[];
        isActive: boolean;
        isOAuthUser: boolean;
        isPremium: boolean;
        isVerified: boolean;
        role: string;
        refreshToken: string;
        createdAt: string;
        updatedAt: string;
        phoneNumber: string;
        AiName: string | undefined;
        mood: {
            mood: string;
            rating: number;
        };
    };
}
