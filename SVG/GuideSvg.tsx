import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface GuideSvgProps extends SvgProps {
    color?: string;
}

const GuideSvg: React.FC<GuideSvgProps> = ({ color = '#000', ...props }) => (
    <Svg width={16} height={18} fill="none" {...props}>
        <Path
            fill={color}
            d="M8.375.547a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM.5 4.922v1.75h5.25v5.25l-4.436 4.436 1.233 1.251 5.88-5.889 3.448 2.065v3.387h1.75v-3.877a.846.846 0 0 0-.438-.752l-3.062-1.846V6.672h5.25v-1.75H.5Z"
        />
    </Svg>
);

export default GuideSvg;
