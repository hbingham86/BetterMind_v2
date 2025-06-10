import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';

import { useColorScheme } from '@/hooks/useColorScheme';
import '../global.css';
import { LogBox } from 'react-native';
import routeName from '@/routes/routeName';
import CustomSplashScreen from '@/components/CustomSplashScreen';
import { SnackbarProvider } from '@/contexts/SnackbarProvider';
import queryClient from '@/util/queryClient';
import Toast from 'react-native-toast-message';
import { StripeProvider } from '@stripe/stripe-react-native';
import { stripePubKey } from '@/constants/keys';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';

SplashScreen.preventAutoHideAsync();

// const queryClient = new QueryClient();

export default function RootLayout() {
    const [initialRoute, setInitialRoute] = useState<string | null>(null);
    const colorScheme = useColorScheme();
    LogBox.ignoreAllLogs();
    LogBox.ignoreLogs(['new NativeEmitter']);

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        const initializeRoute = async () => {
            setInitialRoute(routeName.MAINPAGE);
        };

        if (loaded) {
            SplashScreen.hideAsync();
            initializeRoute();
        }
    }, [loaded]);

    if (!loaded || !initialRoute) {
        return <CustomSplashScreen />;
    }

    // useEffect(() => {
    //   const checkToken = async () => {
    //     try {
    //       const token = await AsyncStorage.getItem("authToken");
    //       setInitialRoute(token ? "home/index" : "(mainpage)/index");
    //     } catch (error) {
    //       console.error("Error checking token:", error);
    //       setInitialRoute("(mainpage)/index");
    //     } finally {
    //       SplashScreen.hideAsync();
    //     }
    //   };

    //   checkToken();
    // }, []);

    // if (initialRoute === null) {
    //   return null;
    // }
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
    console.log(publishableKey, 'publishableKey');
    if (!publishableKey) {
        throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file');
    }
    return (
        <SnackbarProvider>
            <ClerkProvider publishableKey={publishableKey}>
                {/* <ClerkLoaded> */}
                <StripeProvider publishableKey={stripePubKey}>
                    <QueryClientProvider client={queryClient}>
                        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                            <Stack initialRouteName={initialRoute}>
                                <Stack.Screen name="+not-found" options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.MAINPAGE} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.LOGIN} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.HOME} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.REGISTER} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.FORGOT_PASSWORD} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.RESET_PASSWORD} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.VERIFICATION} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.ONBORDING} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.SUBSCRIPTION} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.RESENDVERIFICATION} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.PROFILE_INFO} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.ChangeAINAME} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.PRIVACYPOLICY} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.JOURNALDETAILS} options={{ headerShown: false }} />{' '}
                                <Stack.Screen name={routeName.WRITEJOURNAL} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.UPDATEJOURNAL} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.CHATHISTORY} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.PAYMENTS} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.NOTIFICATION} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.GUIDEDEXERCISE} options={{ headerShown: false }} />
                                <Stack.Screen name={routeName.ExerciseFullScreen} options={{ headerShown: false }} />
                            </Stack>
                            <StatusBar style="light" />
                        </ThemeProvider>
                    </QueryClientProvider>
                </StripeProvider>
                <Toast />
                {/* </ClerkLoaded> */}
            </ClerkProvider>
        </SnackbarProvider>
    );
}
