import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
        // marginTop: responsiveHeight(1),
    },
    optionWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    errorText: {
        marginTop: 4,
        fontSize: responsiveFontSize(1.5),
        paddingLeft: responsiveWidth(1),
        marginHorizontal: responsiveWidth(4),
        color: '#42FFEA',
    },
    text: {
        fontSize: responsiveFontSize(1.5),
        width: '90%',
        color: '#FFFFFF',
        // marginTop: responsiveHeight(1),
    },
});
