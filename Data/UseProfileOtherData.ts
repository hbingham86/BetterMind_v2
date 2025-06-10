import { useState } from 'react';
import HelpSvg from '@/SVG/HelpSvg';
import BellSvg from '@/SVG/BellSvg';
import SheildSvg from '@/SVG/SheildSvg';
import DelSvg from '@/SVG/DelSvg';
export const UseOtherData = () => {
    const [OtherData, SetOtherData] = useState([
        {
            svg: HelpSvg,
            text: 'Help Center',
            nav: 'help',
        },
        {
            svg: BellSvg,
            text: 'Notifications',
            nav: 'notification',
        },
        {
            svg: SheildSvg,
            text: 'Privacy & Policy',
            nav: 'privacy',
        },
        {
            svg: DelSvg,
            text: 'Logout',
        },
        {
            svg: DelSvg,
            text: 'Delete Account',
        },
    ]);

    return { OtherData, SetOtherData };
};
