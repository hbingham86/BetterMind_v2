import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const Person = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            fill="#fff"
            fillOpacity={0.6}
            d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 14.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5Z"
        />
    </Svg>
);
export default Person;
