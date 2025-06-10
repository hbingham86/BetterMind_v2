import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Resetstyles = StyleSheet.create({
    Main: {
        paddingHorizontal: responsiveWidth(4),
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    Box: {
        borderRadius: 12,
        position: 'relative',
        zIndex: 1,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(6),
        marginVertical: responsiveHeight(0.5),
        backgroundColor: '#203133',
    },
    buttonStyle: {
        width: '100%',
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(0.5),
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
export default Resetstyles;
