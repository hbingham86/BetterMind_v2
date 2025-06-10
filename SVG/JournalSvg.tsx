import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const JournalSvg = (props: SvgProps) => (
    <Svg width={35} height={35} fill="none" {...props}>
        <Path
            fill="#01FFCA"
            d="M4.375 10.208V7.291h2.917V5.833a2.917 2.917 0 0 1 2.916-2.917h8.75v10.209l3.646-2.188 3.646 2.188V2.916h1.458c1.532 0 2.917 1.386 2.917 2.917v23.334c0 1.53-1.385 2.916-2.917 2.916h-17.5c-1.53 0-2.916-1.385-2.916-2.916v-1.459H4.375v-2.916h2.917v-5.834H4.375v-2.916h2.917v-5.834H4.375Zm5.833 5.833H7.292v2.917h2.916v-2.916Zm0-5.833V7.291H7.292v2.917h2.916Zm0 17.5v-2.916H7.292v2.916h2.916Z"
        />
    </Svg>
);
export default JournalSvg;
