import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useFormContext } from 'react-hook-form';
import CustomLinearGradient from '../LinearGradientComp';

interface IDropdownCompProps {
    name: string;
    placeholder?: string;
    items: { label: string; value: string; icon?: JSX.Element }[];
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    errorMessage?: string;
}

const DropdownComp: FC<IDropdownCompProps> = ({
    name,
    placeholder = 'Select',
    items,
    backgroundColor = '#3E5659',
    borderColor = '#4C6571',
    borderRadius = 40,
    errorMessage,
}) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const {
        setValue,
        formState: { errors },
    } = useFormContext();

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        setValue(name, value, { shouldValidate: true });
        setIsDropdownOpen(false);
    };

    const error = errors[name]?.message || errorMessage;

    return (
        <>
            <View style={[styles.container, { borderColor, borderRadius }]}>
                <Pressable style={[styles.dropdownHeader, { backgroundColor }]} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <Text style={styles.selectedText}>{selectedValue ? items.find((item) => item.value === selectedValue)?.label : placeholder}</Text>
                    <MaterialCommunityIcons name={isDropdownOpen ? 'chevron-up' : 'chevron-down'} size={24} color="#1AC398" />
                </Pressable>
                {isDropdownOpen && (
                    <CustomLinearGradient
                        GradientColors={['#00DDFF', '#00FFBE']}
                        start={{ x: -0.2, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.dropdownList}
                    >
                        <FlatList
                            data={items}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item.value)}>
                                    <View style={styles.itemRow}>
                                        <Text style={styles.itemText}>{item.label}</Text>
                                        {item.icon}
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </CustomLinearGradient>
                )}
            </View>
            {error && <Text style={styles.errorText}>{typeof error === 'string' ? error : String(error?.message || '')}</Text>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        width: responsiveWidth(28),
    },
    selectedText: {
        fontSize: 16,
        color: '#1AC398',
    },
    dropdownList: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        borderWidth: 1,
        borderColor: '#1AC398',
        zIndex: 10,
        // maxHeight: responsiveHeight(30),
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    dropdownItem: {
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(2),
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: responsiveFontSize(1.6),
        color: '#0A2F36',
    },
    errorText: {
        marginTop: 4,
        fontSize: responsiveFontSize(1.5),
        paddingLeft: responsiveWidth(1),
        textAlign: 'left',
        color: '#42FFEA',
    },
});

export default DropdownComp;
