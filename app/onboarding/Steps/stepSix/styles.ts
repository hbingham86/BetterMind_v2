import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    cont: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        lineHeight: 27,
        paddingHorizontal: responsiveWidth(5),
        color: 'white',
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(5),
    },
    buttonStyle: {
        width: '90%',
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default styles;
