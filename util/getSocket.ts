import { io, Socket } from 'socket.io-client';
import auth from './auth';
import { baseUrl } from '@/constants/keys';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
    if (!socket) {
        socket = io(baseUrl, {
            auth: {
                token: auth.accessToken(),
            },
        });
        socket.on('connect', () => {
            console.log('Socket connected');
        });
    }
    return socket;
};
