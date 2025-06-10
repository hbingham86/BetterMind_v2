import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Loginstyles = StyleSheet.create({
    Main: {
        // flex: 1,
        // marginTop: responsiveHeight(1),
        // marginBottom: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(4),
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    // img: {
    //   width: responsiveWidth(50),
    //   height: responsiveWidth(50),
    //   resizeMode: "contain",
    // },
    Box: {
        borderRadius: 12,
        position: 'relative',
        zIndex: 1,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(6),
        marginVertical: responsiveHeight(0.5),
        backgroundColor: '#203133',
    },
    justify: {
        // flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    icons: {
        backgroundColor: '#3C535E',
        borderRadius: 40,
        width: responsiveWidth(20),
        height: responsiveWidth(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        width: '100%',
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(1),
    },
    buttonCont: {
        width: '100%',
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(1),
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // gap: 50,
        width: '100%',
        height: responsiveWidth(13),
        borderRadius: 30,
        marginTop: responsiveHeight(0.5),
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: 'black',
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
    },
    text: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400',
    },
});
export default Loginstyles;
