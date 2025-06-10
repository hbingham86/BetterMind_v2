import React, { FC, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { useFormContext } from 'react-hook-form';
import { styles } from './styles';
import { countryList } from '@/constants';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface IPhoneInputCompProps {
    name: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    defaultValue?: string;
    showDeleteIcon?: boolean;
    onDeletePress?: () => void;
    value?: any;
    onChangeText?: (value: any) => void;
}

const PhoneInputComp: FC<IPhoneInputCompProps> = ({
    name,
    label,
    placeholder = '',
    errorMessage,
    defaultValue = '',
    value = '',
    showDeleteIcon = false,
    onDeletePress,
}) => {
    const [selectedCountry, setSelectedCountry] = useState<any>({
        cca2: 'US',
        callingCode: '1',
    });
    const [inputValue, setInputValue] = useState<string>(value || defaultValue);
    const [callingCode, setCallingCode] = useState<string>('1');
    const [isCountryPickerVisible, setIsCountryPickerVisible] = useState<boolean>(false);

    const {
        setValue,
        formState: { errors },
    } = useFormContext();

    const error = errors[name]?.message || errorMessage;
    const extractCountryCode = (phoneNumber: string): string => {
        const match = phoneNumber.match(/^\+(\d{1,3})/);
        return match ? match[1] : '';
    };

    const extractPhoneNumber = (phoneNumber: string): string => {
        const match = phoneNumber.match(/^\+\d{1,3}\s*(.*)/);
        return match ? match[1] : phoneNumber;
    };

    const getCountryByCallingCode = (callingCode: string) => {
        return countryList.find((country) => country.callingCode === callingCode);
    };

    useEffect(() => {
        if (value) {
            const code = extractCountryCode(value);
            const phone = extractPhoneNumber(value);

            setInputValue(phone);
            setCallingCode(code);

            const country = getCountryByCallingCode(code);
            if (country) {
                setSelectedCountry(country);
            }

            setValue(name, value, { shouldValidate: true });
        }
    }, [value, setValue, name]);

    const handleInputChange = (phoneNumber: string) => {
        setInputValue(phoneNumber);
        setValue(name, `${callingCode ? `+${callingCode}` : ''} ${phoneNumber}`, {
            shouldValidate: true,
        });
    };

    const handleCountrySelect = (country: any) => {
        setSelectedCountry(country);
        setCallingCode(country.callingCode);
        setInputValue('');
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.phoneInputContainer}>
                <CountryPicker
                    countryCode={selectedCountry?.cca2 || 'US'}
                    withCallingCode={true}
                    withFlag={true}
                    withFilter={true}
                    onSelect={handleCountrySelect}
                    visible={isCountryPickerVisible}
                    onClose={() => setIsCountryPickerVisible(false)}
                    onOpen={() => setIsCountryPickerVisible(true)}
                />
                {selectedCountry && (
                    <View style={styles.countryCodeContainer}>
                        <Text style={styles.countryCode}>+{callingCode}</Text>
                    </View>
                )}
                <TextInput
                    style={styles.input}
                    value={inputValue}
                    onChangeText={handleInputChange}
                    placeholder={placeholder}
                    keyboardType="phone-pad"
                />
                {showDeleteIcon && (
                    <TouchableOpacity onPress={onDeletePress}>
                        <MaterialIcons name="delete-outline" size={24} color="#9DB6B7" />
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.errorText}>{typeof error === 'string' ? error : String(error?.message || '')}</Text>}
        </View>
    );
};

export default PhoneInputComp;
