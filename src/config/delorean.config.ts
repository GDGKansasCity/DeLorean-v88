const greenColor = '#0F9D58';
const blueColor = '#4285F4';
const yellowColor = '#fbbc03';
const redColor = '#ea4335';
const almostBlack = '#E8';

export const SiteTheme = {
  Secondary: yellowColor,
  Primary: blueColor,
  AppBar: {
    Primary: almostBlack,
    Color: '#fff'
  },
  YellowSection: {
    backgroundColor: yellowColor,
    color: '#000'
  },
  BlueSection: {
    backgroundColor: blueColor,
    color: '#fff'
  },
  BlackSection: {
    backgroundColor: almostBlack,
    color: '#fff'
  },
  CallToAction: {
    backgroundColor: greenColor,
    color: '#fff'
  },
  SponsorHeader: {
    backgroundColor: greenColor,
    color: '#fff'
  }
};

export const FirebaseConfig = {
  apiKey: process.env.DELOREAN_API_KEY,
  authDomain: "devfest-kc-2026.firebaseapp.com",
  projectId: "devfest-kc-2026",
  storageBucket: "devfest-kc-2026.firebasestorage.app",
  messagingSenderId: "838370455463",
  appId: "1:838370455463:web:22cbd6529e519fa55d9082",
  measurementId: "G-F3FYFDJ1KP"
};

export const EventbriteConfig = {
  eventId: process.env.DELOREAN_EVENT_ID,
  url: ''
};

export const MapsConfig = {
  apiKey: process.env.DELOREAN_MAP_API
};