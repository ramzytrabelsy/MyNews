import './common/init';

import { AppRegistry } from 'react-native';
import { name as APP_NAME } from '../app.json';

import { setupStore } from './store';
import bootstrap from './bootstrap';

import AppContainer from './AppContainer';

setupStore();

AppRegistry.registerComponent(APP_NAME, () => AppContainer);

bootstrap();
