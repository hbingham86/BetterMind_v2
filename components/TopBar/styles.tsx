import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

export const TopBarstyles = StyleSheet.create({
    cont: {
        marginTop: responsiveHeight(6),
    },
    text: {
        color: '#FFFFFFCC',
        fontSize: responsiveFontSize(1.2),
        fontWeight: '500',
    },
    heading: {
        color: '#FFFFFF',
        fontSize: responsiveFontSize(2.3),
        fontWeight: '700',
    },
});
