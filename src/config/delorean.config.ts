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
  InfoSection: {
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
  authDomain: "devfest-kc-2023.firebaseapp.com",
  projectId: "devfest-kc-2023",
  storageBucket: "devfest-kc-2023.appspot.com",
  messagingSenderId: "374670673309",
  appId: "1:374670673309:web:1f51d56313f9650f019b74",
  measurementId: "G-9TEP7Z401Y",
};

export const EventbriteConfig = {
  eventId: process.env.DELOREAN_EVENT_ID
};

export const MapsConfig = {
  apiKey: process.env.DELOREAN_MAP_API
};