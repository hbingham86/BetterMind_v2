import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar } from 'react-native-paper';

type SnackbarContextType = {
    showMessage: (message: string, type: 'success' | 'error') => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [color, setColor] = useState<string>('green');

    const showMessage = (msg: string, type: 'success' | 'error') => {
        setMessage(msg);
        setColor(type === 'success' ? 'green' : 'maroon');
        setVisible(true);
    };

    return (
        <SnackbarContext.Provider value={{ showMessage }}>
            {children}
            <Snackbar visible={visible} onDismiss={() => setVisible(false)} duration={Snackbar.DURATION_SHORT} style={{ backgroundColor: color }}>
                {message}
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
