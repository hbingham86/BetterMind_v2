import React, { FC, useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useFormContext } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import CalendarSvg from '@/SVG/CalendarSvg';

interface IDateTimePickerCompProps {
    name: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    rules?: any;
    mode?: 'date' | 'time';
    defaultValue?: Date;
}

const DateTimePickerComp: FC<IDateTimePickerCompProps> = ({ name, label, placeholder, errorMessage, rules, mode = 'date', defaultValue }) => {
    const [date, setDate] = useState<Date | null>(defaultValue || null);
    const [show, setShow] = useState(false);
    const {
        setValue,
        formState: { errors },
    } = useFormContext();

    const error = errors[name]?.message || errorMessage;

    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setValue(name, currentDate?.toISOString(), { shouldValidate: true });
    };

    const getIcon = () => {
        switch (mode) {
            case 'date':
                return <CalendarSvg />;
            case 'time':
                return <FontAwesome5 name="clock" size={20} color="#E6E6E6" />;
            default:
                return <CalendarSvg />;
        }
    };

    useEffect(() => {
        if (defaultValue && defaultValue !== date) {
            setDate(defaultValue);
        }
    }, [defaultValue]);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <Pressable style={styles.inputWrapper} onPress={() => setShow(true)}>
                {getIcon()}
                <Text style={styles.input}>{date ? date.toLocaleDateString('en-GB') : placeholder} </Text>
                <View></View>
            </Pressable>

            {show && <DateTimePicker testID="dateTimePicker" value={date || new Date()} mode={mode} display="default" onChange={onChange} />}

            {error && <Text style={styles.errorText}>{typeof error === 'string' ? error : String(error?.message || '')}</Text>}
        </View>
    );
};

export default DateTimePickerComp;
