# engage21

Head to https://exam-portal-engage.herokuapp.com/ for hosted website.

To run this project on a local computer, clone the project first.
Run "npm i" in bash. This will install all necessary modules.
Then run "npm start". Server will start on localhost:3000

By default, a user can only register as student.
For setting the role as admin, only the person with database access can modify that, thus prevented illegal admin access.
For testing purposes: admin credentials are: 
Email Id: admin@gmail.com
Password: adminadmin


Features List:
1. Login/Register using JWT.
2. Protected and restricted routes for users.
3. Add subject, quiz, questions, notes (in any form - pdf, images,etc) for studying.
4. Publish/Unpublish quiz anytime.
5. Random set of questions for different users in a same quiz will be there, thus preventing cheating.
6. Auto submission when quiz timer ends.
7. Prevents reloading, going back in a quiz as question set will be changed.
8. Only 1 attempt per quiz for each user.
9. Quiz has negative marking schemes also.
10. Quiz is auto-graded atfer submission.
11. Can print quiz result.
12. Quiz result will be mailed to registered user email id.
13. Performance chart for a particular user in all quizzes attempted by him till now.
14. Admin can see quiz attempts.
15. Admin can print as well as download all quiz results for different students in an excel file.
16. For each quiz, top 3 performer scores in a horizontal bar graph.
17. Average score per quiz along with a difficulty level of each quiz (calculated on the basis of average percentage of different users) in a pie chart.

