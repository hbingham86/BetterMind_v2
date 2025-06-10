export interface IFormValue {
    //   contact: number;
    emg1: number;
    emg2: number;
    [key: string]: number;
    
}

export interface IFormValue1 {
    fullName: string;
    email: string;
    phoneNumber: string;
    emergencyContacts: { id: string, phone: number }[];
    [key: string]: any;  
}
