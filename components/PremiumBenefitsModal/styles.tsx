import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    cont: {
        justifyContent: "center",
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: responsiveWidth(2),
        marginTop: responsiveHeight(2),
    },
    text: {
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        color: 'white',
        width: '95%',
        textAlign: 'justify',
        marginBottom: 10,

    },
});
