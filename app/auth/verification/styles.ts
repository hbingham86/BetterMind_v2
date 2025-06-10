import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Verificationstyles = StyleSheet.create({
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
    justify: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
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
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        marginTop: responsiveHeight(2),
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
        color: '#FFFFFF',
        backgroundColor: '#3E5659',
    },
});
export default Verificationstyles;
