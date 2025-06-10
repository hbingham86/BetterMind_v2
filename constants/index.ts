import AsyncStorage from '@react-native-async-storage/async-storage';
import routeName from '@/routes/routeName';
export const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date);
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();
    return `${year}-${month}-${day}`;
};

export const checkAndNavigateOnboarding = async (navigation: any, onboardingDate: string | null) => {
    const currentDate = new Date().toISOString().split('T')[0];
    // const CDate = new Date().toLocaleDateString();
    // function convertDateFormat(date: any) {
    //     const [day, month, year] = date.split('/');
    //     return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    // }
    // const currentDate = convertDateFormat(CDate);
    const lastOnboardingDate = onboardingDate ? new Date(onboardingDate).toISOString().split('T')[0] : null;
    if (lastOnboardingDate === currentDate) {
        navigation.replace(routeName.HOME);
    } else {
        navigation.replace(routeName.ONBORDING);
    }
};

const currentDate = new Date();
export const currentDateString = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
});
export enum Moods {
    HAPPY = 'Happy',
    JOYFUL = 'Joyful',
    CONFIDENT = 'Confident',
    HOPEFUL = 'Hopeful',
    CONFUSED = 'Confused',
    NEUTRAL = 'Neutral',
    ANXIOUS = 'Anxious',
    DEPRESSED = 'Depressed',
    DESPAIR = 'Despair',
    ANGRY = 'Angry',
    FRUSTRATED = 'Frustrated',
    SAD = 'Sad',
}

export const moodColors: { [key: string]: string } = {
    Happy: '#FFD700',
    Sad: '#87CEFA',
    Hopeful: '#32CD32',
    Neutral: '#B0C4DE',
    Anxious: '#FF4500',
    Angry: '#DC143C',
    Despair: '#7900D1',
    Depressed: '#3E44AA',
    Confused: '#9370DB',
    Frustrated: '#DC143C',
    Confident: '#4169E1',
    Joyful: '#FFAA00',
};

export const moodImages: any = {
    Angry: require('../assets/images/angry.png'),
    Despair: require('../assets/images/Despair.png'),
    Depressed: require('../assets/images/Depressed.png'),
    Sad: require('../assets/images/sad.png'),
    Anxious: require('../assets/images/Anxious.png'),
    Confused: require('../assets/images/Confused.png'),
    Neutral: require('../assets/images/Neutral.png'),
    Hopeful: require('../assets/images/Hopeful.png'),
    Frustrated: require('../assets/images/angry.png'),
    Confident: require('../assets/images/Confused.png'),
    Happy: require('../assets/images/happy.png'),
};
export const getInitials = (fullName: string | undefined | null, maxInitials: number = 3): string => {
    if (!fullName) return '?';

    return fullName
        .trim()
        .split(/\s+/)
        .slice(0, maxInitials)
        .map((name) => name.charAt(0).toUpperCase())
        .join('');
};

export const countryList = [
    { cca2: 'BR', callingCode: '55' }, // Brazil
    { cca2: 'AF', callingCode: '93' }, // Afghanistan
    { cca2: 'US', callingCode: '1' }, // United States
    { cca2: 'CA', callingCode: '1' }, // Canada
    { cca2: 'IN', callingCode: '91' }, // India
    { cca2: 'GB', callingCode: '44' }, // United Kingdom
    { cca2: 'AU', callingCode: '61' }, // Australia
    { cca2: 'DE', callingCode: '49' }, // Germany
    { cca2: 'FR', callingCode: '33' }, // France
    { cca2: 'IT', callingCode: '39' }, // Italy
    { cca2: 'ES', callingCode: '34' }, // Spain
    { cca2: 'MX', callingCode: '52' }, // Mexico
    { cca2: 'JP', callingCode: '81' }, // Japan
    { cca2: 'CN', callingCode: '86' }, // China
    { cca2: 'RU', callingCode: '7' }, // Russia
    { cca2: 'ZA', callingCode: '27' }, // South Africa
    { cca2: 'NG', callingCode: '234' }, // Nigeria
    { cca2: 'AR', callingCode: '54' }, // Argentina
    { cca2: 'KR', callingCode: '82' }, // South Korea
    { cca2: 'DZ', callingCode: '213' }, // Algeria (added this one)
    { cca2: 'PT', callingCode: '351' }, // Portugal
    { cca2: 'ID', callingCode: '62' }, // Indonesia
    { cca2: 'PH', callingCode: '63' }, // Philippines
    { cca2: 'TH', callingCode: '66' }, // Thailand
    { cca2: 'VN', callingCode: '84' }, // Vietnam
    { cca2: 'EG', callingCode: '20' }, // Egypt
    { cca2: 'SA', callingCode: '966' }, // Saudi Arabia
    { cca2: 'KR', callingCode: '82' }, // South Korea
    { cca2: 'TW', callingCode: '886' }, // Taiwan
    { cca2: 'SG', callingCode: '65' }, // Singapore
    { cca2: 'PK', callingCode: '92' }, // Pakistan
    { cca2: 'BD', callingCode: '880' }, // Bangladesh
    { cca2: 'IR', callingCode: '98' }, // Iran
    { cca2: 'SY', callingCode: '963' }, // Syria
    { cca2: 'IQ', callingCode: '964' }, // Iraq
    { cca2: 'UA', callingCode: '380' }, // Ukraine
    { cca2: 'PL', callingCode: '48' }, // Poland
    { cca2: 'RO', callingCode: '40' }, // Romania
    { cca2: 'AT', callingCode: '43' }, // Austria
    { cca2: 'BE', callingCode: '32' }, // Belgium
    { cca2: 'CH', callingCode: '41' }, // Switzerland
    { cca2: 'NO', callingCode: '47' }, // Norway
    { cca2: 'SE', callingCode: '46' }, // Sweden
    { cca2: 'DK', callingCode: '45' }, // Denmark
    { cca2: 'FI', callingCode: '358' }, // Finland
    { cca2: 'LU', callingCode: '352' }, // Luxembourg
    { cca2: 'IE', callingCode: '353' }, // Ireland
    { cca2: 'PL', callingCode: '48' }, // Poland
    { cca2: 'CZ', callingCode: '420' }, // Czech Republic
    { cca2: 'HU', callingCode: '36' }, // Hungary
    { cca2: 'SK', callingCode: '421' }, // Slovakia
    { cca2: 'BG', callingCode: '359' }, // Bulgaria
    { cca2: 'HR', callingCode: '385' }, // Croatia
    { cca2: 'RS', callingCode: '381' }, // Serbia
    { cca2: 'UA', callingCode: '380' }, // Ukraine
    { cca2: 'GE', callingCode: '995' }, // Georgia
    { cca2: 'BY', callingCode: '375' }, // Belarus
    { cca2: 'SI', callingCode: '386' }, // Slovenia
    { cca2: 'EE', callingCode: '372' }, // Estonia
    { cca2: 'LV', callingCode: '371' }, // Latvia
    { cca2: 'LT', callingCode: '370' }, // Lithuania
    { cca2: 'MK', callingCode: '389' }, // North Macedonia
    { cca2: 'AL', callingCode: '355' }, // Albania
    { cca2: 'AM', callingCode: '374' }, // Armenia
    { cca2: 'MD', callingCode: '373' }, // Moldova
    { cca2: 'KZ', callingCode: '7' }, // Kazakhstan
    { cca2: 'UZ', callingCode: '998' }, // Uzbekistan
    { cca2: 'KG', callingCode: '996' }, // Kyrgyzstan
    { cca2: 'TJ', callingCode: '992' }, // Tajikistan
    { cca2: 'TM', callingCode: '993' }, // Turkmenistan
    { cca2: 'AZ', callingCode: '994' }, // Azerbaijan
    { cca2: 'GE', callingCode: '995' }, // Georgia
    { cca2: 'MN', callingCode: '976' }, // Mongolia
    { cca2: 'NP', callingCode: '977' }, // Nepal
    { cca2: 'BT', callingCode: '975' }, // Bhutan
    { cca2: 'LK', callingCode: '94' }, // Sri Lanka
    { cca2: 'MM', callingCode: '95' }, // Myanmar (Burma)
    { cca2: 'KH', callingCode: '855' }, // Cambodia
    { cca2: 'LA', callingCode: '856' }, // Laos
    { cca2: 'PH', callingCode: '63' }, // Philippines
    { cca2: 'KH', callingCode: '855' }, // Cambodia
];
