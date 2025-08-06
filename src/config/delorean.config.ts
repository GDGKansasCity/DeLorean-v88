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
  authDomain: "devfest-kc-8b940.firebaseapp.com",
  projectId: "devfest-kc-8b940",
  storageBucket: "devfest-kc-8b940.firebasestorage.app",
  messagingSenderId: "1029251079616",
  appId: "1:1029251079616:web:d9424aaf0fe5b69bf5bc25",
  measurementId: "G-ZE01V3DG9Z"
};

export const EventbriteConfig = {
  eventId: process.env.DELOREAN_EVENT_ID,
  url: 'https://devfestkc25.eventbrite.com/?aff=dotcom'
};

export const MapsConfig = {
  apiKey: process.env.DELOREAN_MAP_API
};