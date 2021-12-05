import firebase from 'firebase-admin';
import access from './FirebaseServiceCredentials';

const app = firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(JSON.stringify(access))),
  storageBucket: 'movieparty-a1227.appspot.com',
});

export default app;
