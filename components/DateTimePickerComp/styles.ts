import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    passContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        borderColor: '#696969',
        borderWidth: 1,
        marginVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(4),
    },
    pass: {
        flex: 1,
        height: responsiveHeight(7),
        fontWeight: '500',
    },
    eyeIconContainer: {
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(2),
    },
    inputContainer: {
        marginVertical: responsiveHeight(1),
    },
    input: {
        fontWeight: '500',
        width: '85%',
        color: '#FFFFFF',
    },
    container: {
        marginBottom: responsiveHeight(1),
    },
    label: {
        fontSize: responsiveFontSize(2),
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
        color: 'white',
        fontWeight: '400',
        textAlign: 'left',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 40,
        borderColor: '#4C6571',
        borderWidth: 1,
        height: responsiveHeight(7),
        justifyContent: 'space-between',
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(4),
        backgroundColor: '#3E5659',
    },

    errorText: {
        marginTop: 4,
        fontSize: responsiveFontSize(1.5),
        paddingLeft: responsiveWidth(1),
        marginHorizontal: responsiveWidth(4),
        color: '#42FFEA',
    },
});
