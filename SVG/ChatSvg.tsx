import * as React from 'react';
import Svg, { Rect, Path, Defs, LinearGradient, Stop, SvgProps } from 'react-native-svg';
const ChatSvg = (props: SvgProps) => (
    <Svg width={48} height={48} fill="none" {...props}>
        <Rect width={48} height={48} fill="url(#a)" rx={24} />
        <Path
            fill="#01191E"
            d="M21.469 18.267c.523-1.531 2.639-1.578 3.259-.14l.052.14.707 2.066a3.498 3.498 0 0 0 1.991 2.11l.19.07 2.065.706c1.531.523 1.578 2.639.14 3.259l-.14.052-2.065.707a3.5 3.5 0 0 0-2.11 1.991l-.071.19-.706 2.065c-.523 1.531-2.639 1.578-3.258.14l-.054-.14-.706-2.065a3.5 3.5 0 0 0-1.991-2.11l-.19-.071-2.064-.706c-1.532-.523-1.579-2.639-.14-3.258l.14-.054 2.065-.706a3.501 3.501 0 0 0 2.11-1.991l.07-.19.706-2.065Zm8.656-3.017a.875.875 0 0 1 .786.49l.042.102.306.898.899.306a.875.875 0 0 1 .103 1.615l-.103.042-.898.306-.306.899a.875.875 0 0 1-1.615.102l-.042-.102-.306-.898-.899-.306a.875.875 0 0 1-.103-1.615l.103-.042.898-.306.306-.899a.875.875 0 0 1 .829-.592Z"
        />
        <Defs>
            <LinearGradient id="a" x1={41.691} x2={-5.462} y1={-11.466} y2={47.129} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#22BCD4" />
                <Stop offset={1} stopColor="#1AC398" />
            </LinearGradient>
        </Defs>
    </Svg>
);
export default ChatSvg;
