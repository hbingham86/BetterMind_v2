import { Dimensions, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    Main: {
        borderRadius: 12,
        width: width - 50,
        backgroundColor: '#FF5733',
        paddingHorizontal: responsiveWidth(3),
        gap: 10,
        marginBottom: responsiveHeight(2),
    },
    heading: {
        color: 'white',
        textAlign: 'left',
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(0.4),
        fontWeight: '700',
    },
    Text: {
        lineHeight: 15,
        color: 'white',
        textAlign: 'left',
        fontSize: responsiveFontSize(1.5),
        fontWeight: '300',
    },
});
export default styles;
