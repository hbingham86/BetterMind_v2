import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HomeSvgProps {
    color?: string;
}

const HomeSvg: React.FC<HomeSvgProps> = ({ color = '#4B5563', ...props }) => (
    <Svg width={22} height={22} fill="none" {...props}>
        <Path
            fill={color}
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M18 17.125V9.687a.874.874 0 0 0-.35-.7l-6.125-4.593a.875.875 0 0 0-1.05 0L4.35 8.988a.875.875 0 0 0-.35.7v7.437a.875.875 0 0 0 .875.875h3.5a.875.875 0 0 0 .875-.875V14.5a.875.875 0 0 1 .875-.875h1.75a.875.875 0 0 1 .875.875v2.625a.875.875 0 0 0 .875.875h3.5a.875.875 0 0 0 .875-.875Z"
        />
    </Svg>
);

export default HomeSvg;
