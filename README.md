# social-trivia

This is currently an in-house trivia app that will be used to take lunch trivia sessions to a new level of awesomeness! No longer will teams be referred to as tables as each team will be able to pool their creativity for the best team name. The great part is that everyone will get to see the team names. White boards are no longer needed to display the team answer as teams will be able to enter their answers from their team view via their computer (one computer per team for entering the answer). This opens up the trivia questions to allow for internet sleuthing for the correct answer. 

Which team can track down the answer the fastest? Mulitple computers, tablets, or phones can be used for internet sleuthing if desired or allowed by the trivia host. 

## Usage

This is a trivia app that allows teams to use a computer, one per group, to create their team name and enter their answer per the question read aloud by the trivia host within the time frame given. 

At this time, all trivia questions expect the answer to be a number. The object of the game is to get either the correct answer or the answer closest to the correct answer without going over.

Each team is only allowed to submit one answer, so all answers are final once the submit button is clicked. If the timer is at 0, the team is not allowed to enter an answer. 

Once the team enters their answer, the game view will indicate that the team has locked in their answer. 

As the trivia host, you simply type admin (case sensitive) as the team name and you will be presented the admin view. Within this view, you will enter in the answer to the question that was read aloud. This answer will be matched against the answers provided by the various teams to validate which teams matched the correct answer or closest team to the answer without going over. You will set the timer for the desired time frame per question and start the timer; you will be able to start/pause/reset the timer as needed. 

To view the game view, the trivia host will click the Open Game view link. This view will be opened in a new tab and can then be displayed on another screen for all to see. The game view will display the timer and the teams playing the game. 

When the timer has reached 0, the trivia host will click the Show Answers button to display the hosts answer and all the answers entered for the teams so that everyone can see what others submitted and what the correct answer is. By clicking the Update Scores button, the teams with the correct or closest answer without going over, will update the score(s) to reflect who gets a point for that round.

This app is hosted on firebase at https://aquent-trivia.firebaseapp.com/. 

# Contribution Overview

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Setup

* Fork the project
* Clone the project
* Install node 6 or greater ?
* Install project dependencies: `yarn install`
* To start the app: `yarn start`
* To run the tests: `yarn test`

## Testing app Functionality

* Once you do a `yarn start`, the app should open in the browser at [http://localhost:3000](http://localhost:3000). 
* Type in admin (case sensitive) into the input on the screen. This will open the admin view at [http://localhost:3000/admin](http://localhost:3000/admin)
* When in the admin view, click on the Open Game View link. This will open a new tab that will display all the teams that are created, their scores, their answers (when Show Answers button is clicked), and the timer at [http://localhost:3000/teams](http://localhost:3000/teams).  
* To create individual teams, open a new browser tab at [http://localhost:3000](http://localhost:3000) for each team you want to create, then type in the name of the team. Upon creation of the team, the url will be routed to [http://localhost:3000/team/teamName](http://localhost:3000/team/teamName). From each team tab, you can now enter in answers for that team. 
* In order to test firebase data persistence, since this is currently being hosted on a personal account, you will need to create a firebase project of your own and then update the src/data/firebase.js file with your databaseURL. 

## Contribution

Contribution is encouraged! Help make this trivia app the best it can be. 

If you have an idea on how to make this app better or you find a bug please write up an issue. 

This app was build with a TDD approach so please include tests for any code changes you make. Feel free to add any tests that might have been missed or overlooked. 

## Future Enhancement Ideas

* Implement the ability to add extra points for the team that answers the quickest. 
* Implement the ability to disqualify the team who answers last.  