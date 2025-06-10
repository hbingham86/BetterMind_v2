import { useState } from 'react';
export const UseExercisesData = () => {
    const [ExercisesData, SetExercisesData] = useState([
        {
            title: 'Box Breathing',
            text: 'Calm your mind with this structured 4-second inhale, hold, exhale, and rest cycle.',
            nav: 'one',
        },
        {
            title: 'Deep Belly Breathing',
            text: 'Breathe deeply into your diaphragm to promote relaxation and improve oxygen flow.',
            nav: 'two',
        },
        {
            title: '4-7-8 Breathing Technique',
            text: 'A soothing pattern to reduce stress and help you drift into restful sleep.',
            nav: 'three',
        },
    ]);

    return { ExercisesData, SetExercisesData };
};
