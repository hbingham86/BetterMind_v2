import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const onboardingStyles = StyleSheet.create({
    Main: {
        paddingHorizontal: responsiveWidth(5),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
    },
    heading2: {
        fontWeight: '700',
        fontSize: responsiveFontSize(3.5),
        color: 'white',
        textAlign: 'center',
    },
    welcome: {
        fontWeight: '300',
        fontSize: responsiveFontSize(4),
        color: 'white',
        textAlign: 'center',
    },
    buttonStyle: {
        width: '90%',
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: responsiveHeight(3),
    },
    backbtn: {
        paddingHorizontal: responsiveWidth(5),
        position: 'absolute',
        top: 50,
    },
    content: {
        marginVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(1.5),
    },
    backBtn: {
        width: '80%',
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(3),
        color: 'white',
    },
    stepContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
    },

    stepperContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: responsiveHeight(3),
    },
    stepDot: {
        width: 10,
        height: 10,
        borderRadius: 9999,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeStepDot: {
        backgroundColor: '#1BC1A2',
        borderColor: '#20BDCB',
        borderWidth: 2,
        borderRadius: 9999,
    },
});
export default onboardingStyles;
