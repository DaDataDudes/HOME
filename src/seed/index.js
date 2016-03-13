/**
  * seed => ()
  * ------------------
  * Run as a node script to populate firebase db
*/
var Firebase = require('firebase');
var casual = require('casual');
var FIREBASE_URL_DB = 'counties';
var FIREBASE_URL = 'https://home-ddd.firebaseio.com/' + FIREBASE_URL_DB;
var firebase = new Firebase(FIREBASE_URL);
var i = 0;
var MOCK_COUNT = 5;

// mock selections for seeding
var counties = require('./counties.json');
var education = ['ged', 'someCollege', 'associate', 'high-school', 'bachelors', 'masters'];
var ethnicity = ['hawaiian', 'caucasian', 'african-american', 'asian', 'multiple',
                   'native-american', 'other-pacific-islander', 'unknown'];
var gender = ['male', 'female', 'transgender', 'refused'];
var homelessDate = ['lessThanYear', 'oneYearOrLonger', 'unknown', 'refused'];
var homelessCount = ['oneToThreeTimes', 'fourOrMoreTimes', 'unknown', 'refused'];
var disabilites = ['missing-limb', 'blind', 'deaf', 'polio'];
var shelterAdjective = ['sunny', 'fresh', 'new', 'sunrise', 'golden'];
var shelterPlace = ['hills', 'meadows', 'beginnings', 'start', 'horizon'];
var geolocation = ['21.4307732,-158.1727855', '21.4300338,-158.1886537', '21.4464635,-158.2032338',
                     '21.4650675,-158.208971', '21.2937603,-157.8671448', '21.2964518,-157.8650594',
                     '21.306360,-158.052092', '21.307289,-158.112380', '21.330125,-157.691935',
                     '21.267555,-157.821828'];
var coin_flip = ["yes", "no"];
var date = {
  month: 'December',
  year: 2015,
};

// loop through count and push to firebase
for (i = 0; i < counties.length; i++) {
  firebase.push(counties[i]);
}

function seed(selectedDate) {
  return {
    age: casual.integer(from = 14, to = 67),
    alcoholDrugProblem: casual.random_element(coin_flip),
    benefitEbt: casual.random_element(coin_flip),
    benefitSsi: casual.random_element(coin_flip),
    benefitTanf: casual.random_element(coin_flip),
    benefitUnemployment: casual.random_element(coin_flip),
    benefitVeteran: casual.random_element(coin_flip),
    benefitWelfare: casual.random_element(coin_flip),
    dateCreated: selectedDate,
    educationLevel: casual.random_element(education),
    employmentCurPay: casual.integer(from = 0, to = 1000),
    employmentLastEmployed: casual.date(format = 'YYYY-MM-DD'),
    employmentStatus: casual.random_element(coin_flip),
    ethnicity: casual.random_element(ethnicity),
    familyMembersAdult: casual.integer(from = 1, to = 3),
    familyMembersChildren: casual.integer(from = 0, to = 7),
    firstName: casual.first_name,
    gender: casual.random_element(gender),
    geoLocation: casual.random_element(counties),
    homelessCount: casual.random_element(homelessCount),
    homelessDate: casual.random_element(homelessDate),
    lastName: casual.last_name,
    mentalHealthDisability: casual.random_element(coin_flip),
    onTheStreets: casual.random_element(coin_flip),
    otherDisability: casual.random_element(disabilites),
    shelterName: (casual.random_element(shelterAdjective) + ' ' + casual.random_element(shelterPlace)),
    shelterStatus: casual.random_element(coin_flip),
    social: casual.phone,
    veteran: casual.random_element(coin_flip)
  };
}
