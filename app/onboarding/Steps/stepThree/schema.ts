import * as yup from 'yup';

export const schema = yup.object().shape({
    fullName: yup.string().required('*Required'),
    dob: yup.date().required('*Required'),
});
