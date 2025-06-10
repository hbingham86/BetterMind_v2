import * as React from 'react';
import Svg, { Rect, Path, Defs, LinearGradient, Stop, SvgProps } from 'react-native-svg';
const CheckedSvg = (props: SvgProps) => (
    <Svg width={15} height={16} fill="none" {...props}>
        <Rect width={15} height={15} y={0.5} fill="url(#a)" rx={7.5} />
        <Path fill="#012128" d="M10.687 4 6.563 9.523 4.125 7.048 3 8.191 6.75 12 12 5.143 10.687 4Z" />
        <Defs>
            <LinearGradient id="a" x1={10.132} x2={1.916} y1={2} y2={5.348} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#1BC2A0" />
                <Stop offset={1} stopColor="#1EBEBB" />
            </LinearGradient>
        </Defs>
    </Svg>
);
export default CheckedSvg;
