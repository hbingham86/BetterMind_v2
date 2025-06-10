import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useFormContext, Controller, FieldError } from 'react-hook-form';
import { styles } from './styles';

interface IRadioButtonGroupProps {
    name: string;
    options: string[];
    rules?: any;
    errorMessage?: string;
    onValueChange?: (value: string) => void;
}

const RadioButtonGroup: FC<IRadioButtonGroupProps> = ({ name, options, rules, errorMessage, onValueChange }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name]?.message || errorMessage;

    const renderError = () => {
        if (typeof error === 'string') {
            return error;
        } else if (error && (error as FieldError)?.message) {
            return (error as FieldError).message;
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value } }) => (
                    <View>
                        {options.map((option) => (
                            <Pressable
                                key={option}
                                style={styles.optionWrapper}
                                onPress={() => {
                                    onChange(option);
                                    if (onValueChange) onValueChange(option);
                                }}
                            >
                                <RadioButton
                                    value={option}
                                    status={value === option ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        onChange(option);
                                        if (onValueChange) onValueChange(option);
                                    }}
                                    uncheckedColor="#FFFFFF"
                                    color="#FFFFFF"
                                />
                                <Text style={styles.text}>{option}</Text>
                            </Pressable>
                        ))}
                    </View>
                )}
            />
            {renderError() && <Text style={styles.errorText}>{renderError()}</Text>}
        </View>
    );
};

export default RadioButtonGroup;
