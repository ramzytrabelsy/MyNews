import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS, Platform } from 'react-native';

import { EventEmitter } from '../common/events';

import { createLogger } from '../common/logger';

const Logger = createLogger('PushNotificationService');

export const PushNotificationServiceImpl = class PushNotificationService {
  events = new EventEmitter();

  token = null;

  async initialize() {
    PushNotification.configure({
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,

      onRegister: this.onRegistration.bind(this),

      onNotification: this.onNotification.bind(this),
    });

    PushNotificationIOS.addEventListener('notification', this.onNotification.bind(this));
  }

  onRegistration(token) {
    Logger.debug('onRegistration', token);

    this.token = token;

    this.events.emit('registration', token);
  }

  onNotification(nativeNotification) {
    Logger.debug('onNotification', nativeNotification);

    const notification = {
      title: nativeNotification.title,
      message: nativeNotification.message,
      payload: Platform.OS === 'ios' ? nativeNotification.data : nativeNotification.userInfo,
    };

    this.events.emit('received', notification, nativeNotification);

    if (nativeNotification.userInteraction) {
      this.events.emit('opened', notification, nativeNotification);
    }

    nativeNotification.finish(PushNotificationIOS.FetchResult.NoData);
  }

  sendLocalNotification(content) {
    PushNotification.localNotification({
      title: content.title,
      message: content.message,
      userInfo: content.payload,
    });
  }

  scheduleLocalNotification(content, date) {
    PushNotification.localNotificationSchedule({
      title: content.title,
      message: content.message,
      userInfo: content.payload,
      date,
    });
  }
};

export const PushNotificationService = new PushNotificationServiceImpl();

if (process.env.NODE_ENV === 'development') {
  global.PushNotificationService = PushNotificationService;
}
