import * as firebase from 'firebase'

const config = {
    databaseURL: "https://aquent-trivia.firebaseio.com"
};

firebase.initializeApp(config);

export const database = firebase.database()