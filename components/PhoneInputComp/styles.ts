import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
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
    errorText: {
        marginTop: 4,
        fontSize: responsiveFontSize(1.5),
        paddingLeft: responsiveWidth(1),
        marginHorizontal: responsiveWidth(4),
        color: '#42FFEA',
    },

    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 40,
        borderColor: '#4C6571',
        borderWidth: 1,
        height: responsiveHeight(7),
        justifyContent: 'flex-start',
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(4),
        backgroundColor: '#3E5659',
    },
    countryCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        color: 'white',
    },
    countryCode: {
        fontWeight: 'bold',
        marginRight: 5,
        color: 'white',
    },
    flag: {
        fontSize: 20,
    },
    input: {
        flex: 1,
        padding: 5,
        color: 'white',
    },
});
