import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const MoodMonthChartStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    legendContainer: {
        marginBottom: responsiveHeight(2),
        width: '80%',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    legendColor: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        marginRight: 10,
        borderWidth: 3,
    },
    legendText: {
        color: '#99B2C6',
        fontSize: responsiveFontSize(1.6),
        flex: 1,
    },
    legendPercentage: {
        color: '#99B2C6',
        fontSize: responsiveFontSize(1.6),
    },
});
export default MoodMonthChartStyles;
