import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const BellSvg = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            fill="#9EB6B7"
            d="M11.5 21.25a2.607 2.607 0 0 0 2.466-1.75H9.034a2.608 2.608 0 0 0 2.466 1.75Zm6.125-6.487V10.75c0-2.815-1.912-5.186-4.502-5.9a1.741 1.741 0 0 0-1.623-1.1c-.74 0-1.367.455-1.623 1.1-2.59.715-4.502 3.085-4.502 5.9v4.013l-1.494 1.493a.875.875 0 0 0-.256.619v.875a.875.875 0 0 0 .875.875h14a.875.875 0 0 0 .875-.875v-.875a.875.875 0 0 0-.256-.619l-1.494-1.493Z"
        />
    </Svg>
);
export default BellSvg;
