import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const GuidedStyles = StyleSheet.create({
    main: {
        paddingHorizontal: responsiveWidth(4),
        marginVertical: responsiveHeight(2),
        height: 500,
        flex: 1,
    },

    subhead: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
        color: '#0A2F36',
    },
    Text: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: '400',
        color: '#000000',
    },
    head: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '700',
        color: 'white',
        marginTop: responsiveHeight(3),
    },
    txt: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: '400',
        color: 'white',
        marginTop: responsiveHeight(1),
    },
    btn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(3),
        marginVertical: responsiveHeight(1),
        width: '100%',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonStyle: {
        height: responsiveWidth(13),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(6),
    },
    btn2: {
        marginVertical: responsiveHeight(3),
    },
    videoContainer: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        backgroundColor: '#000',
        overflow: 'hidden',
        marginTop: 4,
    },
    video: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000059',
        zIndex: 10,
    },
    circle: {
        width: 190,
        height: 190,
        borderRadius: 100,
        borderWidth: 10,
        borderColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle2: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    countdown: {
        fontSize: responsiveFontSize(8),
        color: '#fff',
        fontWeight: 'bold',
    },
});
