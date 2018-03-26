# social-trivia

This is a trivia app that allows teams to use a computer, one per group, to create their team name and enter their answer per the question read aloud by the trivia host within the time frame given. 

At this time, all trivia questions expect the answer to be a number. The object of the game is to get either the correct answer or the answer closest to the correct answer without going over.

Each team is only allowed to submit one answer, so all answers are final once the submit button is clicked. If the timer is at 0, the team is not allowed to enter an answer. 

As the trivia host, you simply type admin as the team name and you will be presented the admin view. Within this view, you will enter in the answer to the question that was read aloud. This answer will be matched against the answers provided by the various teams to validate which teams matched the correct answer or closest team to the answer without going over. You will set the timer for the desired time frame per question and start the timer; you will be able to start/pause/reset the timer as needed. 

To view the game view, the trivia host will click the Open Game view link. This view will be opened in a new tab and can then be displayed on another screen for all to see. The game view will display the timer and the teams playing the game. 

When the timer has reached 0, the trivia host will click the Show Answers button to display all the answers entered for the teams so that everyone can see what others submitted. By clicking the Update Scores button, the teams with the correct or closest answer without going over, will update the scores to reflect who gets a point for that round.

This app is hosted on firebase at https://aquent-trivia.firebaseapp.com/. 
