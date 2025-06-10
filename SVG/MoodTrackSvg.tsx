import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const MoodTrackSvg = (props: SvgProps) => (
    <Svg width={31} height={31} fill="none" {...props}>
        <Path
            fill="#01FFCA"
            d="M15.5 30.083C7.446 30.083.917 23.554.917 15.5.917 7.445 7.446.917 15.5.917S30.083 7.445 30.083 15.5c0 8.054-6.529 14.583-14.583 14.583ZM9.667 16.958a5.834 5.834 0 0 0 11.666 0H9.667Z"
        />
    </Svg>
);

export default MoodTrackSvg;
