import * as yup from 'yup';
export interface IFogotFormValues {
    email: string;
}

export const schema = yup.object().shape({
    email: yup.string().required('*Required').email('Enter a valid email address'),
});
