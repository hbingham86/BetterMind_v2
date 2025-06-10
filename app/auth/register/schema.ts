import * as yup from 'yup';

export const schema = yup.object().shape({
    email: yup.string().required('*Required').email('Enter a valid email address'),
    password: yup.string().required('*Required'),
    confirmPassword: yup
        .string()
        .required('*Required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    selectedOption: yup.string().required('*Required'),
});
