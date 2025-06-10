import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const subscriptionStyles = StyleSheet.create({
    Main: {
        marginHorizontal: responsiveWidth(5),
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontWeight: '700',
        fontSize: responsiveFontSize(4),
        color: 'white',
        textAlign: 'center',
        marginBottom: responsiveHeight(4),
    },
    gradient: {
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(2),
        borderRadius: 12,
        marginBottom: responsiveHeight(2),
    },
    gradientTop: {
        width: responsiveWidth(30),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        marginLeft: responsiveWidth(4),
    },
    off: {
        width: responsiveWidth(20),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    buttonStyle: {
        width: '80%',
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    back: {
        width: '100%',
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
});
export default subscriptionStyles;
