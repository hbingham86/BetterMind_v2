import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const ChatStyles = StyleSheet.create({
    Main: {
        paddingHorizontal: responsiveWidth(4),
        flex: 1,
    },
    ScrollContainer: {
        flexGrow: 1,
        paddingHorizontal: responsiveWidth(2),
        paddingBottom: responsiveHeight(5),
        marginVertical: responsiveHeight(3),
    },
    MessageContainer: {
        backgroundColor: '#0A2F36',
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(1),
        borderRadius: 15,
        marginVertical: responsiveHeight(1),
        maxWidth: responsiveWidth(70),
        alignSelf: 'flex-end',
    },
    MessageText: {
        color: '#00FFBE',
        fontSize: responsiveFontSize(1.6),
        lineHeight: 20,
    },
    BotContainer: {
        // backgroundColor: '#0A2F36',
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(1),
        borderRadius: 15,
        marginVertical: responsiveHeight(1),
        maxWidth: responsiveWidth(70),
        alignSelf: 'flex-start',
    },
    BotText: {
        color: '#000000',
        fontSize: responsiveFontSize(1.6),
        lineHeight: 20,
    },
    InputContainer: {
        borderTopWidth: 1,
        borderRadius: 12,
        borderColor: '#FFFFFF1A',
        borderWidth: 1,
        shadowColor: '#717171',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 14,
        marginBottom: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(1),
    },
    bot: {
        width: 30,
        height: 30,
        marginVertical: responsiveHeight(1),
    },
    copy: {
        height: 15,
        width: 15,
    },
    SendButton: {},
    SendButtonText: {
        height: 25,
        width: 25,
    },
    mic: {
        // width: 7.45,
        // height: 10.11,
        // marginHorizontal: responsiveWidth(3),
    },
    QuickRepliesContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: responsiveHeight(4),
    },

    QuickReplyButton: {
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
        borderColor: '#000000',
        borderWidth: 1,
    },

    QuickReplyText: {
        color: '#fff',
        fontSize: responsiveFontSize(1.5),
        fontWeight: '300',
    },
    MenuOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'flex-start',
        zIndex: 1,
    },

    MenuContainer: {
        flex: 1,
        backgroundColor: '#011F26',
        height: '100%',
        width: '60%',
        zIndex: 2,
        paddingVertical: responsiveHeight(8),
        paddingHorizontal: responsiveWidth(4),
    },

    MenuText: {
        fontSize: responsiveFontSize(1.8),
        color: 'white',
    },
    chatCont: {
        width: '100%',
        gap: -0,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputWrapperStyles: {
        // paddingTop: responsiveHeight(1),
        // paddingHorizontal: responsiveWidth(2),
        // height: 50,
        // backgroundColor: 'red',
        fontWeight: '500',
        color: '#FFFFFF',
        justifyContent: 'center',
    },
    border: {
        fontSize: responsiveFontSize(1.8),
        color: 'white',
        marginTop: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(2),
        fontWeight: 700,
    },
    name: {
        fontSize: responsiveFontSize(1.8),
        color: 'white',
        marginTop: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(2),
    },
    NoMessagesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    NoMessagesText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});
export default ChatStyles;
