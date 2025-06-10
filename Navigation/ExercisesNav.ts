import routeName from '@/routes/routeName';
import { useNavigation } from '@react-navigation/native';

const ExercisesNav = () => {
    const navigation = useNavigation<any>();

    const handleExercisesNavigation = (item: any) => {
        switch (item.nav) {
            case 'one':
                navigation.navigate(routeName.PROFILE_INFO);
                break;
            case 'two':
                navigation.navigate(routeName.ChangeAINAME);
                break;
            case 'three':
                navigation.navigate('Payment');
                break;

            default:
                break;
        }
    };

    return {
        handleExercisesNavigation,
    };
};

export default ExercisesNav;
