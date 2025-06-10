import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const JournalDetaillStyles = StyleSheet.create({
    Main: {
        paddingHorizontal: responsiveWidth(4),
        flex: 1,
        marginTop: responsiveHeight(4),
    },
    ScrollContainer: {
        flexGrow: 1,
        paddingHorizontal: responsiveWidth(2),
        paddingBottom: responsiveHeight(2),
    },
    input: {
        backgroundColor: 'Red',
    },
    emojicolor: {
        backgroundColor: 'white',
        paddingHorizontal: responsiveWidth(1),
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'flex-end',
    },
    line: {
        position: 'absolute',
        width: '100%',
        height: 2,
        backgroundColor: '#FFFFFF4D',
    },
});
export default JournalDetaillStyles;
