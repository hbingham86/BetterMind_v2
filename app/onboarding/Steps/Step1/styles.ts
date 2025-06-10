import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const stepOneStyles = StyleSheet.create({
    Text: {
        lineHeight: 27,
        paddingHorizontal: responsiveWidth(5),
        color: 'white',
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(3),
    },
});
export default stepOneStyles;
