import AIChat from '@/SVG/AIChat';
import JournalSvg from '@/SVG/JournalSvg';
import MindFullSvg from '@/SVG/MindFullSvg';
import MoodTrackSvg from '@/SVG/MoodTrackSvg';

const CardData = [
    {
        SvgComponent: MoodTrackSvg,
        heading: 'Mood tracking',
        description: 'Track how you feel daily and view trends to better understand your emotions.',
    },
    {
        SvgComponent: AIChat,
        heading: 'AI chat companion',
        description: 'Talk to an empathetic AI tailored to your needs—solutions, listening, or distractions.',
    },
    {
        SvgComponent: MindFullSvg,
        heading: 'Mindfulness Tools',
        description: 'Access guided meditations, breathing exercises, and affirmations.',
    },
    {
        SvgComponent: JournalSvg,
        heading: 'Secure Journaling',
        description: 'Reflect privately and gain insights into your emotional patterns.',
    },
];

export default CardData;
