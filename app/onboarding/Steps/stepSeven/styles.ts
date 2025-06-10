import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    Main: {
        paddingHorizontal: responsiveWidth(3),
        gap: 10,
        marginBottom: responsiveHeight(2),
    },
    text: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        fontWeight: '300',
        textAlign: 'left',
        marginHorizontal: responsiveWidth(4),
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(2),
    },
    btn: {
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: responsiveHeight(0.5),
        textTransform: 'lowercase',
    },
    errorText: {
        marginTop: 4,
        fontSize: responsiveFontSize(1.5),
        paddingLeft: responsiveWidth(1),
        marginHorizontal: responsiveWidth(4),
        color: '#42FFEA',
        marginBottom: responsiveHeight(4),
    },
});
export default styles;
