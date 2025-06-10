import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    text: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        fontWeight: '300',
        textAlign: 'center',
        paddingHorizontal: responsiveWidth(2),
        marginBottom: responsiveHeight(1),
        lineHeight: 27,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(1),
    },
    bold: {
        fontWeight: 'bold',
    },
    cont: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(5),
    },
    btn: {
        width: '70%',
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: responsiveHeight(0.7),
    },
    text2: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: responsiveWidth(2),
        marginBottom: responsiveHeight(2),
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
