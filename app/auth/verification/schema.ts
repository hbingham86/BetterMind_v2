import * as Yup from 'yup';
export const schema = Yup.object().shape({
    code: Yup.number().required('*Required').typeError('Code must be a number'),
});
