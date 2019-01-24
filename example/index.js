/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// import * as RNEP from '@estimote/react-native-proximity';
// RNEP.locationPermission.request().then(
//   permission => {
//     // `permission` will be one of RNEP.locationPermission.DENIED, .ALWAYS, or .WHEN_IN_USE
//     console.log(`location permission: ${permission}`);

//     if (permission !== RNEP.locationPermission.DENIED) {
//       const credentials = new RNEP.CloudCredentials(
//         ESTIMOTE_APP_ID,
//         ESTIMOTE_APP_TOKEN
//       );

//       const config = {
//         // modern versions of Android require a notification informing the user that the app is active in the background
//         // if you don't need proximity observation to work in the background, you can omit the entire `notification` config
//         //
//         // see also: 'Background support' section in the README
//         notification: {
//           title: 'Exploration mode is on',
//           text: 'We will notify you when you are next to something interesting.',
//           //icon: 'my_drawable', // if omitted, will default to the app icon (i.e., mipmap/ic_launcher)

//           // in apps targeting Android API 26, notifications must specify a channel
//           // https://developer.android.com/guide/topics/ui/notifiers/notifications#ManageChannels
//           channel: {
//             id: 'exploration-mode',
//             name: 'Exploration Mode'
//           }
//         }
//       };

//       RNEP.proximityObserver.initialize(credentials, config);
//       // RNEP.proximityObserver.startObservingZones([zone1, zone2]);
//       RNEP.proximityObserver.startObservingZones([zone1]);
//     }
//   },
//   error => {
//     console.error('Error when trying to obtain location permission', error);
//   }
// );
