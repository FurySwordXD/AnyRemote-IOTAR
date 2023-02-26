/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native,']);

AppRegistry.registerComponent(appName, () => App);
