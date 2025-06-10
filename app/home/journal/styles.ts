import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const JournalStyles = StyleSheet.create({
    Main: {
        paddingHorizontal: responsiveWidth(4),
        flex: 1,
    },
    ScrollContainer: {
        flexGrow: 1,
        paddingHorizontal: responsiveWidth(2),
        paddingBottom: responsiveHeight(2),
    },
    box: {
        borderRadius: 12,
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(2),
        marginHorizontal: responsiveWidth(10),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 'auto',
    },
    container: {
        marginTop: responsiveHeight(4),
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#083E3B',
        borderRadius: 12,
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(0.5),
        width: '100%',
    },
    icon: {
        marginRight: responsiveWidth(2),
    },
    input: {
        paddingTop: 1,
        marginTop: 5,
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
        // height: responsiveHeight(4),
    },
    boxText: {
        backgroundColor: '#083E3B',
        borderRadius: 12,
        marginVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(1),
        height: responsiveHeight(10),
    },
    writeButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#1A9F84CC',
        borderRadius: 12,
        elevation: 5,
        paddingVertical: responsiveHeight(1),
    },
    writeButtonText: {
        fontSize: responsiveFontSize(2),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
    noramlText: {
        color: '#CCCCCC',
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400',
        height: responsiveHeight(4),
        // lineHeight: 30,
    },
    heading: {
        fontSize: responsiveFontSize(2),
        fontWeight: '700',
        color: 'white',
    },
});
export default JournalStyles;
