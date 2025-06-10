import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import GradientLayout from '@/Layout/GradientLayout/GradientLayout';
import TopBar from '@/components/TopBar';
import ProfileStyles from '../home/profile/styles';
import { styles } from './styles';
import { useNavigation } from 'expo-router';
import CustomButton from '@/components/CustomButton';

const PrivacyPolicy = () => {
    const navigation = useNavigation<any>();

    const Data = [
        {
            heading: '1. Information We Collect',
            subText: 'We collect the following types of information to provide and improve our services:',
            title: 'a. Information You Provide',
            items: [
                '• Account Information: Name, email address, and other details you provide during account creation.',
                '• Journals and Mood Entries: Text and data you input into the app, such as journal entries, mood selections, and preferences.',
                '• Chat Messages: Interactions with the AI chatbot are processed to improve responses and provide personalized support.',
            ],
        },
        {
            title: 'b. Automatically Collected Information',
            items: [
                '• Device Information: IP address, device type, operating system, and app usage data.',
                '• Analytics Data: Usage patterns and trends to enhance app functionality.',
            ],
        },
        {
            title: 'c. Third-Party Integrations',
            items: [
                '• If you choose to link third-party accounts (e.g., Google Sign-In), we may collect basic profile information as authorized by you.',
            ],
        },
        {
            heading: '2. How We Use Your Information',
            subText: 'We use your data to:',
            items: [
                '• Provide app functionality, including personalized mood tracking, journaling, and AI interactions.',
                '• Improve and optimize our services based on usage analytics',
                '• Ensure security and prevent misuse',
                '• Offer tailored recommendations and resources.',
                'We do not sell your personal information to third parties',
            ],
        },
        {
            heading: '3. Data Storage and Security',
            items: [
                '• Local Storage: Journals, mood data, and analytics are stored locally on your device to ensure privacy.',
                '• Encrypted Communication: Any data transmitted to our servers (e.g., for AI processing) is encrypted using industry-standard protocols.',
                '• Access Controls: We restrict access to personal data to authorized personnel only.',
            ],
        },
        {
            heading: '4. Sharing Your Information',
            subText: 'We only share your information under the following circumstances:',
            items: [
                '• With Your Consent: For example, if you share a PDF of your data with a therapist.',
                '• Legal Obligations: If required by law, we may disclose information to comply with a legal process or enforce our terms.',
                '• Service Providers: We may use third-party services (e.g., cloud providers) to support the app, which adhere to strict data protection standards.',
            ],
        },
        {
            heading: '5. Your Rights',
            subText: 'Depending on your location, you may have the following rights under data protection laws:',
            items: [
                'a. Access and Portability:',
                'You can request a copy of your data and, where applicable, export it in a portable format.',
                'b. Correction:',
                'You can request correction of inaccurate or incomplete personal data.',
                'c. Deletion:',
                'You can request deletion of your data. Note: Deleting your account will permanently erase your stored data.',
                'd. Objection:',
                'You can object to data processing for specific purposes, such as marketing.:',
                'e. Withdrawal of Consent:',
                'You can withdraw consent where processing relies on consent.',
                'To exercise your rights, contact us at help@betteru.app',
            ],
        },
        {
            heading: '6. Data Retention',
            subText:
                'We retain your data only for as long as necessary to provide our services or comply with legal obligations. If you delete your account, all associated data will be permanently deleted.',
        },
        {
            heading: '7. Protecting Minors',
            subText:
                'BetterMind is not intended for individuals under the age of 13. We do not knowingly collect or process data from children. If you believe a child has used our app, contact us immediately at help@betteru.app',
        },
        {
            heading: '8. Third-Party Links',
            subText:
                'Our app may contain links to external websites or resources. We are not responsible for the privacy practices or content of these third-party sites. Please review their policies before engaging with their services.',
        },
        {
            heading: '9. Updates to This Policy',
            subText:
                'We may update this Privacy Policy to reflect changes in our practices, technology, or legal requirements. When we make significant updates, we will notify you via the app or email. The Effective Date at the top indicates the latest revision.',
        },
        {
            heading: '10. Contact Us',
            subText: 'If you have any questions or concerns about this Privacy Policy, please contact us at:',
            items: ['• Email: help@betteru.app'],
        },
        {
            subText: 'Key Notes for Compliance',
        },
        {
            subText: '1. GDPR Compliance:',
            items: ['• Ensure users can access, edit, and delete their data.', '• Provide a clear mechanism for withdrawing consent.'],
        },
        {
            subText: '2. CCPA Compliance:',
            items: [
                '• Offer a “Do Not Sell My Personal Information” option if applicable.',
                '• Disclose data categories collected in a transparent manner.',
            ],
        },
        {
            subText: '3. HIPAA Compliance (if handling sensitive mental health data):',
            items: ['• Encrypt all personally identifiable information (PII).', '• Ensure secure handling of journaling and mood data.'],
        },
    ];

    return (
        <GradientLayout>
            <View style={ProfileStyles.Main}>
                <TopBar title="Privacy and Policy" onBackPress={() => navigation.goBack()} />

                <ScrollView contentContainerStyle={ProfileStyles.ScrollContainer}>
                    <View style={styles.main}>
                        <Text style={styles.subhead}>
                            At BetterMind, your privacy is our priority. This Privacy Policy explains how we collect, use, store, and protect your
                            personal information when you use our app and services. By accessing or using BetterMind, you agree to the terms outlined
                            in this Privacy Policy.
                        </Text>

                        {Data.map((section, index) => (
                            <View key={index}>
                                {section.heading && <Text style={styles.mainhead}>{section.heading}</Text>}
                                {section.subText && <Text style={styles.subhead}>{section.subText}</Text>}
                                {section.title && <Text style={styles.subhead}>{section.title}</Text>}

                                {section.items && section.items.length > 0 && (
                                    <>
                                        {section.items.map((item, itemIndex) => (
                                            <Text key={itemIndex} style={styles.subtext}>
                                                {item}
                                            </Text>
                                        ))}
                                    </>
                                )}
                            </View>
                        ))}
                        <CustomButton style={styles.btn} onPress={() => navigation.goBack()}>
                            I understand
                        </CustomButton>
                    </View>
                </ScrollView>
            </View>
        </GradientLayout>
    );
};

export default PrivacyPolicy;
