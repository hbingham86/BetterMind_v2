import { Moods } from '@/constants';
import { useUserStore } from '@/store/useUserStore';
import { useState, useEffect } from 'react';

export const UseFeelingData = () => {
    const { user } = useUserStore();
    const premium = user?.isPremium;
    const [feelingData, setFeelingData] = useState<any[]>([]);

    useEffect(() => {
        const moods: { text: Moods; haspremium: boolean }[] = [
            { text: Moods.HAPPY, haspremium: false },
            { text: Moods.ANGRY, haspremium: !premium },
            { text: Moods.DESPAIR, haspremium: !premium },
            { text: Moods.ANXIOUS, haspremium: !premium },
            { text: Moods.SAD, haspremium: false },
            { text: Moods.NEUTRAL, haspremium: !premium },
            { text: Moods.CONFUSED, haspremium: !premium },
            { text: Moods.JOYFUL, haspremium: !premium },
            { text: Moods.CONFIDENT, haspremium: !premium },
            { text: Moods.DEPRESSED, haspremium: !premium },
            { text: Moods.FRUSTRATED, haspremium: !premium },
            { text: Moods.HOPEFUL, haspremium: !premium },
        ];
        const updatedFeelingData = moods.map(({ text, haspremium }) => ({
            text,
            enabledGradientColors: haspremium ? ['#0A2F36', '#0A2F36'] : ['transparent', 'transparent'],
            haspremium,
        }));

        setFeelingData(updatedFeelingData);
    }, [premium]);

    return { feelingData, setFeelingData };
};
