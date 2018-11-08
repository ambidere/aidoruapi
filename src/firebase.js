
import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAHEl_S7mLnGUssbGvsSuIuLth-wqDLJGk',
  authDomain: 'aidoruapi.firebaseapp.com',
  databaseURL: 'https://aidoruapi.firebaseio.com',
  projectId: 'aidoruapi',
  storageBucket: 'aidoruapi.appspot.com',
  messagingSenderId: '926155890436'
}

var App = firebase.initializeApp(config)
export default App
