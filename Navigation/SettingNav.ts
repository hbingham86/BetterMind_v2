import routeName from '@/routes/routeName';
import { useNavigation } from '@react-navigation/native';

const SettingNav = () => {
    const navigation = useNavigation<any>();

    const handleSettingNavigation = (item: any) => {
        switch (item.nav) {
            case 'PersoanlInfo':
                navigation.navigate(routeName.PROFILE_INFO);
                break;
            case 'ai':
                navigation.navigate(routeName.ChangeAINAME);
                break;
            case 'Payment':
                navigation.navigate('Payment');
                break;
            case 'GoPremium':
                navigation.navigate(routeName.PAYMENTS);
                break;
            default:
                break;
        }
    };
    const handleOtherNavigation = (item: any) => {
        console.log(item.nav);
        switch (item.nav) {
            case 'help':
                navigation.navigate('AboutTheApp');
                break;
            case 'notification':
                navigation.navigate(routeName.NOTIFICATION);
                break;
            case 'privacy':
                navigation.navigate(routeName.PRIVACYPOLICY);
                break;
            default:
                break;
        }
    };

    return {
        handleSettingNavigation,
        handleOtherNavigation,
    };
};

export default SettingNav;
