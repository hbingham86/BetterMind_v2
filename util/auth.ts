import AsyncStorage from '@react-native-async-storage/async-storage';

export const auth = {
    logout: async () => {
        // const email = await AsyncStorage.getItem('userEmail');
        // console.log(email, 'emailemail');
        // const lastOnboardingDate = await AsyncStorage.getItem('lastOnboardingDate');
        await AsyncStorage.clear();
        // if (lastOnboardingDate) {
        //     await AsyncStorage.setItem('lastOnboardingDate', lastOnboardingDate);
        // }
        // if (email) {
        //     await AsyncStorage.setItem('userEmail', email);
        // }
    },
    delete: async () => {
        await AsyncStorage.clear();
    },
    accessToken: async () => {
        return await AsyncStorage.getItem('accessToken');
    },
    refreshToken: async () => {
        return await AsyncStorage.getItem('refreshToken');
    },
    platform: async () => {
        return await AsyncStorage.getItem('platform');
    },
    setUser: async (userId: string) => {
        await AsyncStorage.setItem('userId', userId);
    },
    user: async () => {
        return await AsyncStorage.getItem('userId');
    },
    updateTokens: async (accessToken: string, refreshToken: string) => {
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
    },
};

export default auth;
