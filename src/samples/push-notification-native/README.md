# Usage

## Initialize and setup

```javascript
await PushNotificationService.initialize();

PushNotificationService.events.on('registration', () => {
  function registerPushId() {
    const { token } = PushNotificationService;
    // register with backend
  }

  function unregisterPushId() {
    const { token } = PushNotificationService;
    // unregister from backend
  }

  if (AuthService.isAuthenticated()) {
    registerPushId();
  }

  AuthService.events.on('login', () => {
    registerPushId();
  });

  AuthService.events.on('logout', () => {
    unregisterPushId();
  });
});
```

## Handle events

```javascript
PushNotificationService.events.on('received', (notification) => {
  console.log(notification);
});

PushNotificationService.events.on('opened', (notification) => {
  console.log(notification);
});
```
