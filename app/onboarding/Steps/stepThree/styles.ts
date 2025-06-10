import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    Main: {
        paddingHorizontal: responsiveWidth(3),
        gap: 10,
        marginBottom: responsiveHeight(2),
    },
});
export default styles;
