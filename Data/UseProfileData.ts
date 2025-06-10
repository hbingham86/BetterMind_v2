import ShineSvg from '@/SVG/ShineSvg';
import { useState } from 'react';
import Person from '@/SVG/Person';
import LinkSvg from '@/SVG/LinkSvg';
import { useUserStore } from '@/store/useUserStore';
export const UseProfileData = () => {
    const { user } = useUserStore();
    const isPremium = user?.isPremium;
    const [ProfileData, SetProfileData] = useState([
        {
            svg: Person,
            text: 'Personal Info',
            nav: 'PersoanlInfo',
        },
        // {
        //     svg: PaymentSvg,
        //     text: 'Payment Methods',
        //     nav: 'payment',
        // },
        {
            svg: ShineSvg,
            text: "Personalize your AI's name",
            nav: 'ai',
        },
        {
            svg: LinkSvg,
            text: isPremium ? 'Manage your subscription' : 'Go Premium',
            nav: 'GoPremium',
        },
    ]);

    return { ProfileData, SetProfileData };
};
