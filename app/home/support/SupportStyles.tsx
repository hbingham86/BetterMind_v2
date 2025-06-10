import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const SupportStyles = StyleSheet.create({
    main: {
        paddingHorizontal: responsiveWidth(4),
        marginVertical: responsiveHeight(2),
    },

    subhead: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: '500',
        color: '#03242B',
    },

    btn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        height: responsiveHeight(7),
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        marginVertical: responsiveHeight(2),
    },
});
