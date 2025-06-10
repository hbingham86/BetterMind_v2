import React from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ThemedText } from '../ThemedText';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    title?: any;
}

const BottomSheetModal = ({ isVisible, onClose, children, title }: Props) => {
    return (
        <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <View className="flex flex-row justify-center items-center mt-3">
                                <ThemedText type="defaultSemiBold">{title}</ThemedText>
                            </View>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#082C33',
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(3),
        paddingBottom: responsiveHeight(5),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
    },
});

export default BottomSheetModal;
