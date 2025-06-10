import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const DelSvg = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path stroke="#9EB6B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.313} d="M7 22h10" />
        <Path stroke="#9EB6B7" strokeWidth={1.313} d="M2 17V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
        <Path stroke="#9EB6B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.313} d="M12 7v3m0 4.01.01-.011" />
    </Svg>
);
export default DelSvg;
