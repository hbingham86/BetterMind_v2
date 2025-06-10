import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    main: {
        paddingHorizontal: responsiveWidth(4),
        marginVertical: responsiveHeight(2),
    },
    mainhead: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: '700',
        color: 'white',
        marginTop: responsiveHeight(2),
    },
    subhead: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: '500',
        color: 'white',
    },
    subtext: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: '500',
        color: 'white',
        paddingHorizontal: responsiveWidth(3),
    },
    btn: {
        marginTop: responsiveHeight(5),
        marginBottom: responsiveHeight(3),
    },
    emergencyButtonStyle : {
        backgroundColor : '#3E5659',
        height: responsiveWidth(14),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(1.5),
        marginBottom: responsiveHeight(1.7),
    },
    buttonStyle: {
        // width: "90%",
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(6),
    },
});
