import React, { FC } from 'react';
import { View, TextInput, Text, TextInputProps, StyleProp, TextStyle } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { InputCompStyles } from './inputStyles';

interface SimpleInputProps extends TextInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    inputStyle?: StyleProp<TextStyle>;
}

const SimpleInput: FC<SimpleInputProps> = ({
    name,
    label,
    placeholder,
    errorMessage,
    backgroundColor = '#3E5659',
    borderColor = '#4C6571',
    borderRadius = 40,
    inputStyle,
    ...rest
}) => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();
    const error = errors[name]?.message || errorMessage;

    return (
        <View style={[InputCompStyles.smcontainer, { width: '85%' }]}>
            {label && <Text style={InputCompStyles.label}>{label}</Text>}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={[
                        {
                            flex: 1,
                            backgroundColor,
                            borderColor,
                            borderRadius,
                        },
                        inputStyle,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="#FFFFFF66"
                    onChangeText={(text) => setValue(name, text, { shouldValidate: true })}
                    {...register(name)}
                    {...rest}
                />
            </View>
            {error && <Text style={InputCompStyles.errorText}>{typeof error === 'string' ? error : String(error?.message || '')}</Text>}
        </View>
    );
};

export default SimpleInput;
