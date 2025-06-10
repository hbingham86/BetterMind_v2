import React from 'react';
import { Image, Text, View } from 'react-native';
import BottomSheetModal from '@/components/BottomSheetModal';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../CustomButton';

interface PremiumBenefitsModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const PremiumBenefitsModal: React.FC<PremiumBenefitsModalProps> = ({ isVisible, onClose }) => {
    const navigation = useNavigation<any>();

    return (
        <BottomSheetModal isVisible={isVisible} onClose={onClose} title="Premium benefits">
            <View
                style={{
                    marginTop: responsiveHeight(2),
                    width: '80%',
                }}
            >
                <View style={styles.cont}>
                    <Image source={require('@/assets/images/gpt.png')} />
                    <Text style={styles.text}>Enjoy unlimited messages with advanced GPT, text-to-speech, and priority responses during crises.</Text>
                </View>
                <View style={styles.cont}>
                    <Image source={require('@/assets/images/notebook.png')} />
                    <Text style={styles.text}>
                        Capture unlimited journal entries, voice notes, photos, AI prompts, mood analysis, and export options.
                    </Text>
                </View>
                <View style={styles.cont}>
                    <Image source={require('@/assets/images/report.png')} />
                    <Text style={styles.text}>
                        Dive into 90-day analytics with mood tracking, triggers, custom reports, and seamless cross-platform sync.
                    </Text>
                </View>
                <View style={styles.cont}>
                    <Image source={require('@/assets/images/safety.png')} />
                    <Text style={styles.text}>Get personalized safety plans.</Text>
                </View>
                <View style={styles.cont}>
                    <Image source={require('@/assets/images/backup.png')} />
                    <Text style={styles.text}>Access cloud backup, cross-device sync, dark mode, offline use, and priority support.</Text>
                </View>
            </View>

            {/* Space between text and button */}
            <View style={{ marginTop: responsiveHeight(4) }} />

            <CustomButton style={{ marginTop: 10 }} onPress={() => navigation.navigate('SUBSCRIPTION')}>
                Get Premium
            </CustomButton>
        </BottomSheetModal>
    );
};

export default PremiumBenefitsModal;
