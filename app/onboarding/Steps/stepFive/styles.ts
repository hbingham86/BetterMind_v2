import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    heading: {
        color: 'white',
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(1),
        fontWeight: '500',
        marginTop: responsiveHeight(3),
    },
    Text: {
        lineHeight: 15,
        color: 'white',
        textAlign: 'left',
        fontSize: responsiveFontSize(1.5),
        fontWeight: '300',
    },
    cont: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    btn: {
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: responsiveHeight(0.5),
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(1),
    },
});
export default styles;
