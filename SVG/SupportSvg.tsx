import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SupportSvgProps {
    color?: string;
}

const SupportSvg: React.FC<SupportSvgProps> = ({ color = '#4B5563', ...props }) => (
    <Svg width={22} height={22} fill="none" {...props}>
        <Path
            fill={color}
            d="m11 7.5.665-.875c.77-1.015 1.908-1.75 3.273-1.75a3.932 3.932 0 0 1 3.937 3.938A3.89 3.89 0 0 1 18.21 11c-.709 1.059-7.21 7.875-7.21 7.875S4.499 12.059 3.79 11a3.89 3.89 0 0 1-.665-2.188 3.932 3.932 0 0 1 3.938-3.937c1.365 0 2.51.735 3.272 1.75L11 7.5Z"
        />
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="m11 7.5-.665-.875c-.77-1.015-1.908-1.75-3.273-1.75a3.932 3.932 0 0 0-3.937 3.938c0 .813.245 1.566.665 2.187.709 1.059 7.21 7.875 7.21 7.875M11 7.5l.665-.875c.77-1.015 1.908-1.75 3.273-1.75a3.932 3.932 0 0 1 3.937 3.938A3.89 3.89 0 0 1 18.21 11c-.709 1.059-7.21 7.875-7.21 7.875"
        />
    </Svg>
);

export default SupportSvg;
