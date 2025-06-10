import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const CalendarSvg = (props: SvgProps) => (
    <Svg width={21} height={21} fill="none" {...props}>
        <Path
            fill="#E6E6E6"
            d="M16.625 16.625H4.375V7h12.25M14 .875v1.75H7V.875H5.25v1.75h-.875c-.971 0-1.75.779-1.75 1.75v12.25a1.75 1.75 0 0 0 1.75 1.75h12.25a1.75 1.75 0 0 0 1.75-1.75V4.375a1.75 1.75 0 0 0-1.75-1.75h-.875V.875m-.875 9.625H10.5v4.375h4.375V10.5Z"
        />
    </Svg>
);
export default CalendarSvg;
