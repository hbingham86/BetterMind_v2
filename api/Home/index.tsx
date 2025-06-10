import { queryFn } from '@/util/axios';

export const getMoodTracking = (duration: string) => ({
    queryKey: ['moodTrackingData', duration],
    queryFn: () => queryFn<any>(`moods-tracked/my-moods?duration=${encodeURIComponent(duration)}`),
});
