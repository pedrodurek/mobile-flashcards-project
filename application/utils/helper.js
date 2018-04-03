import { Alert, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'flashcards:notifications'

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

export const simpleAlert = (title) => {
    Alert.alert(title)
}

const settingsLocalNotficiation = {
    title: "Long time no see you!",
    body: "Don't forget to take a quiz today!",
    ios: {
        sound: true
    },
    android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
    }
}

export const disableLocalNotification = () =>
    AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    )

export const enableLocalNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((result) => {
            if (result === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                    ({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                settingsLocalNotficiation(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )
                            AsyncStorage.setItem(
                                NOTIFICATION_KEY,
                                JSON.stringify(true)
                            )
                        }
                    }
                )
            }
        })
}
