export const baseUrl = process.env.EXPO_PUBLIC_API_URL;
export const stripePubKey = process.env.EXPO_PUBLIC_PB_KEY as string;
export const stripeSCKey = process.env.EXPO_PUBLIC_SC_KEY;

export const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
export const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;
export const iOSClientId = process.env.EXPO_PUBLIC_IOS_CLIENT_ID;
