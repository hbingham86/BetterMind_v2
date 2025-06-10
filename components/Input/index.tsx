import React, { FC, useState } from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity, Text, StyleProp, TextStyle } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { InputCompStyles } from './inputStyles';

interface IInputCompProps extends TextInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    isPassword?: boolean;
    rules?: RegisterOptions;
    errorMessage?: string;
    leftIcon?: React.ReactNode;
    leftIconColor?: string;
    keyboardType?: TextInputProps['keyboardType'];
    disabled?: boolean;
    onEditPress?: () => void;
    isEditable?: boolean;
    showEditIcon?: boolean;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    inputStyle?: StyleProp<TextStyle>;
    onSubmitEditing?: any;
    inputWrapperStyles?: any;
}

const InputComp: FC<IInputCompProps> = ({
    name,
    label,
    placeholder,
    isPassword,
    rules,
    errorMessage,
    leftIcon,
    leftIconColor = '#fff',
    keyboardType,
    disabled = false,
    onEditPress,
    isEditable = true,
    showEditIcon = false,
    backgroundColor = '#3E5659',
    borderColor = '#4C6571',
    borderRadius = 40,
    inputStyle,
    onSubmitEditing,
    inputWrapperStyles,
    ...rest
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

    const error = errors[name]?.message || errorMessage;

    return (
        <View style={InputCompStyles.container}>
            {label && <Text style={InputCompStyles.label}>{label}</Text>}
            <View
                style={[
                    InputCompStyles.inputWrapper,
                    inputWrapperStyles,
                    {
                        backgroundColor,
                        borderColor,
                        borderRadius,
                    },
                ]}
            >
                {leftIcon && <View style={InputCompStyles.iconWrapper}>{leftIcon}</View>}

                <TextInput
                    style={[InputCompStyles.input, inputStyle]}
                    placeholder={placeholder}
                    placeholderTextColor="#FFFFFF66"
                    keyboardType={keyboardType}
                    onSubmitEditing={onSubmitEditing}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    onChangeText={(text) => setValue(name, text, { shouldValidate: true })}
                    {...register(name)}
                    {...rest}
                />

                {isPassword ? (
                    <TouchableOpacity onPress={togglePasswordVisibility} disabled={disabled}>
                        <Entypo name={isPasswordVisible ? 'eye' : 'eye-with-line'} size={20} color="#fff" />
                    </TouchableOpacity>
                ) : (
                    <MaterialCommunityIcons name="radiobox-blank" size={20} color="transparent" />
                )}

                {showEditIcon && (
                    <TouchableOpacity onPress={onEditPress} disabled={disabled}>
                        <MaterialCommunityIcons name="pencil" size={24} color={isEditable ? '#4CAF50' : '#ccc'} />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={InputCompStyles.errorText}>{typeof error === 'string' ? error : String(error?.message || '')}</Text>}
        </View>
    );
};

export default InputComp;
