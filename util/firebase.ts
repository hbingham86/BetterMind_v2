import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '@/constants/keys';
import { initializeApp } from 'firebase/app';

export const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
export { Auth };
