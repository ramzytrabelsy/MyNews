import { Alert } from 'react-native';
import { Toast } from 'native-base';

export const SUCCESS = 'success';
export const FAILURE = 'failure';
export const WARNING = 'warning';
export const INFO = 'info';

export const TEXT_OK = 'OK';
export const TEXT_CANCEL = 'Cancel';
export const TEXT_RETURN = 'Return';

const DIALOG_TYPE = {
  [SUCCESS]: 'success',
  [FAILURE]: 'danger',
  [WARNING]: 'warning',
  [INFO]: '',
  default: '',
};

export function toast(_type, content, _options = {}) {
  const type = DIALOG_TYPE[_type] || DIALOG_TYPE.default;

  const options = {
    buttonText: TEXT_OK,
    ..._options,
  };

  Toast.show({
    type,
    text: content,
    position: 'bottom',
    buttonText: options.buttonText,
  });
}

export function status(_type, message, _options = {}) {
  const type = DIALOG_TYPE[_type] || DIALOG_TYPE.default;

  const options = {
    buttonText: TEXT_OK,
    ..._options,
  };

  Toast.show({
    type,
    text: message,
    position: 'bottom',
    buttonText: options.buttonText,
  });
}

const ALERT_OPTIONS = {
  cancelable: false,
};

export function alert(title, content, _options = {}) {
  const options = {
    okButtonText: TEXT_OK,
    ..._options,
  };

  return new Promise((resolve) => {
    const buttons = [
      {
        style: 'positive',
        text: options.okButtonText,
        onPress: () => resolve(options.okButtonText),
      },
    ];
    Alert.alert(title, content, buttons, ALERT_OPTIONS);
  });
}

export function confirm(title, content, _options = {}) {
  const options = {
    okButtonText: TEXT_OK,
    cancelButtonText: TEXT_CANCEL,
    ..._options,
  };

  return new Promise((resolve) => {
    const buttons = [
      {
        style: 'cancel',
        text: options.cancelButtonText,
        onPress: () => resolve(options.cancelButtonText),
      },
      {
        style: 'positive',
        text: options.okButtonText,
        onPress: () => resolve(options.okButtonText),
      },
    ];
    Alert.alert(title, content, buttons, ALERT_OPTIONS);
  });
}

export function confirmWithNeutral(title, content, _options = {}) {
  const options = {
    okButtonText: TEXT_OK,
    cancelButtonText: TEXT_CANCEL,
    neutralButtonText: TEXT_RETURN,
    ..._options,
  };

  return new Promise((resolve) => {
    const buttons = [
      {
        style: 'neutral',
        text: options.neutralButtonText,
        onPress: () => resolve(options.neutralButtonText),
      },
      {
        style: 'cancel',
        text: options.cancelButtonText,
        onPress: () => resolve(options.cancelButtonText),
      },
      {
        style: 'positive',
        text: options.okButtonText,
        onPress: () => resolve(options.okButtonText),
      },
    ];
    Alert.alert(title, content, buttons, ALERT_OPTIONS);
  });
}
