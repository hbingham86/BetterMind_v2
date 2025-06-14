import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const HelpSvg = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            fill="#9EB6B7"
            d="M17 2.43H7c-3 0-5 2-5 5v6c0 3 2 5 5 5v2.13c0 .8.89 1.28 1.55.83L13 18.43h4c3 0 5-2 5-5v-6c0-3-2-5-5-5ZM12 14.6a.749.749 0 1 1 0-1.5.749.749 0 1 1 0 1.5Zm1.26-4.15c-.39.26-.51.43-.51.71v.21c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.21c0-1.16.85-1.73 1.17-1.95.37-.25.49-.42.49-.68 0-.5-.41-.91-.91-.91s-.91.41-.91.91c0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-1.33 1.08-2.41 2.41-2.41s2.41 1.08 2.41 2.41c0 1.14-.84 1.71-1.15 1.92Z"
        />
    </Svg>
);
export default HelpSvg;
