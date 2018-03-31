import { Alert } from 'react-native'
export const confirmAlert = ({ title, text, handleConfirm, handleCancel }) => {
    Alert.alert(
        title,
        text,
        [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: handleCancel
            },
            {
                text: 'OK',
                onPress: handleConfirm
            }
        ],
        { cancelable: false }
    )
}
