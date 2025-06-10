import Toast from 'react-native-toast-message';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        // queries: {
        //   onError: (error: any) => {
        //     const errorMessage = error.response?.data?.message;
        //     Toast.show({
        //       type: "error",
        //       text1: "Error",
        //       text2: errorMessage,
        //     });
        //   },
        // },
        mutations: {
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message;
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: errorMessage,
                });
            },
            // onSuccess: (data: any) => {
            //     const successMessage = data?.message;
            //     Toast.show({
            //         type: 'success',
            //         text1: 'Success',
            //         text2: successMessage,
            //     });
            // },
        },
    },
});

export default queryClient;
