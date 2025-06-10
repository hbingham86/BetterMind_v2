import * as Yup from 'yup';

export const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('*Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('*Required'),
    code: Yup.number().required('*Required').typeError('Code must be a number'),
});
