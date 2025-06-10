import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ProfileSvgProps {
    color?: string;
}

const ProfileSvg: React.FC<ProfileSvgProps> = ({ color = '#4B5563', ...props }) => (
    <Svg width={18} height={18} fill="none" {...props}>
        <Path fill={color} d="M12.5 7.25a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
        <Path
            fill={color}
            fillRule="evenodd"
            d="M8.643 17.743A8.75 8.75 0 1 1 9 17.75h-.12a3.98 3.98 0 0 1-.237-.007Zm-5.258-3.222A1.324 1.324 0 0 1 4.49 12.77c3.41-.377 5.632-.343 9.026.008a1.31 1.31 0 0 1 1.093 1.75 7.875 7.875 0 1 0-11.223-.007Z"
            clipRule="evenodd"
        />
    </Svg>
);

export default ProfileSvg;
