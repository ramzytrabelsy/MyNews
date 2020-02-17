import OneSignal from 'react-native-onesignal';

import { EventEmitter } from '../common/events';

import { createLogger } from '../common/logger';

const Logger = createLogger('PushNotificationService');

export const PushNotificationServiceImpl = class PushNotificationService {
  events = new EventEmitter();

  userId = null;

  token = null;

  async initialize(onesignalAppId) {
    OneSignal.configure();

    OneSignal.addEventListener('ids', this.onRegistration.bind(this));
    OneSignal.addEventListener('received', this.onNotificationReceived.bind(this));
    OneSignal.addEventListener('opened', this.onNotificationOpened.bind(this));

    OneSignal.inFocusDisplaying(2);
    OneSignal.enableVibrate(true);

    OneSignal.init(onesignalAppId);
  }

  onRegistration(device) {
    Logger.debug('onRegistration', device);

    this.userId = device.userId;
    this.token = device.token;

    this.events.emit('registration', device);
  }

  onNotificationReceived(nativeNotification) {
    Logger.debug('onNotificationReceived', nativeNotification);

    const notification = {
      title: nativeNotification.payload.title,
      message: nativeNotification.payload.body,
      payload: nativeNotification.payload.additionalData,
    };

    this.events.emit('received', notification, nativeNotification);
  }

  onNotificationOpened(openResult) {
    Logger.debug('onNotificationOpened', openResult);

    const nativeNotification = openResult.notification;

    const notification = {
      title: nativeNotification.payload.title,
      message: nativeNotification.payload.body,
      payload: nativeNotification.payload.additionalData,
    };

    this.events.emit('opened', notification, nativeNotification, openResult);
  }
};

export const PushNotificationService = new PushNotificationServiceImpl();

if (process.env.NODE_ENV === 'development') {
  global.PushNotificationService = PushNotificationService;
}
