import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    main: {
        paddingHorizontal: responsiveWidth(4),
        marginVertical: responsiveHeight(2),
    },
    cont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: responsiveHeight(1),
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
        marginVertical: responsiveHeight(4),
    },
    subtext: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: '500',
        color: 'white',
        width: responsiveWidth(70),
        marginVertical: responsiveHeight(1),
    },
    btn: {
        marginTop: responsiveHeight(5),
        marginBottom: responsiveHeight(3),
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
    text: {
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(1),
        fontSize: responsiveFontSize(1.6),
        fontWeight: '500',
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: responsiveHeight(2),
    },
});
