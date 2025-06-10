import * as yup from 'yup';

export const schema = yup.object().shape({
    AiName: yup.string().required('AI name is required.').min(3, 'AI name must be at least 3 characters long.'),
});
