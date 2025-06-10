import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface JournalProps {
    color?: string;
}

const Journal: React.FC<JournalProps> = ({ color = '#4B5563', ...props }) => (
    <Svg width={22} height={22} fill="none" {...props}>
        <Path
            fill={color}
            d="M12.395 1.813H6.406a2.628 2.628 0 0 0-2.625 2.625v13.125a2.628 2.628 0 0 0 2.625 2.625h5.989V1.813Zm3.199 0h-.739v18.375h.739a2.628 2.628 0 0 0 2.625-2.625V4.438a2.628 2.628 0 0 0-2.625-2.625Z"
        />
    </Svg>
);

export default Journal;
