import "@babel/polyfill";

import { login, signup } from "./login";
import { addSubject, addNotes } from "./subject";
import { addQuiz, evaluateQuiz, updateQuiz } from "./quiz";
import { addQuestion } from "./question";
import { updateProfile } from "./user";

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const addSubjectForm = document.getElementById("addSubject-form");
const addQuizForm = document.getElementById("addQuiz-form");
const addQuesForm = document.getElementById("addQue-form");
const submitQuizForm = document.getElementById("submitQuiz-form");
const updateProfileForm = document.getElementById("updateProfile-form");
const addNotesForm = document.getElementById("addNotes-form");

const questionsButton = document.getElementsByName("open-questions");
const startQuizButtons = document.getElementsByName("start-quiz");
const showAttemptsButtons = document.getElementsByName("show-attempts");

const markQuizActive = document.getElementsByName("markQuiz-active");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#login-email").value;
    const pass = document.querySelector("#login-password").value;

    login(email, pass);
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let data = {};
    data.email = document.querySelector("#signup-email").value;
    data.password = document.querySelector("#signup-password").value;
    data.firstName = document.querySelector("#signup-firstname").value;
    data.lastName = document.querySelector("#signup-lastname").value;
    data.phone = document.querySelector("#signup-phone").value;
    data.passwordConfirm = document.querySelector(
      "#signup-confirm-password"
    ).value;

    signup(data);
  });
}

if (addSubjectForm) {
  addSubjectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#addSubject-title").value;
    const description = document.querySelector("#addSubject-description").value;
    addSubject(name, description);
  });
}

if (addQuizForm) {
  addQuizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let data = {};
    data.name = document.getElementById("addQuiz-name").value;
    data.description = document.getElementById("addQuiz-description").value;
    data.maxMarks = document.getElementById("addQuiz-maxMarks").value;
    data.numberOfQuestions = document.getElementById(
      "addQuiz-numberOfQuestions"
    ).value;
    data.subject = document.getElementById("addQuiz-subject").value;
    data.active = document.getElementById("addQuiz-active").checked;
    data.negativeMarking = parseFloat(
      document.getElementById("addQuiz-negMarking").value
    );
    data.timer =
      parseFloat(document.getElementById("addQuiz-timer").value) * 60;
    addQuiz(data);
  });
}

if (addQuesForm) {
  addQuesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let data = {};
    data.content = document.getElementById("question-content").value;
    data.quiz = document.getElementById("addQue-submit").dataset.quizid;
    let options = [];
    document.querySelectorAll("#option").forEach((input) => {
      if (input.value) options.push(input.value);
    });
    data.options = options;
    data.answer = document.getElementById("answer").value;

    addQuestion(data);
  });
}

if (submitQuizForm) {
  submitQuizForm.addEventListener("submit", (event) => {
    window.onbeforeunload = null;
    document.getElementById("submitButton").innerText = "Submitting ...";

    event.preventDefault();
    const numberOfQuestions = submitQuizForm.dataset.numberofquestions;
    const quizId = submitQuizForm.dataset.quizid;
    let questions = [];
    let markedAnswers = [];

    for (let i = 0; i < numberOfQuestions; i += 1) {
      let queId = `questionId${i}`;

      let markedAns = document.getElementsByName(`option${i}`);

      for (let i = 0; i < markedAns.length; i++) {
        if (markedAns[i].checked) {
          questions.push(document.getElementById(queId).dataset.queid);
          markedAnswers.push(markedAns[i].value);
          break;
        }
      }
    }
    window.onbeforeunload = null;
    evaluateQuiz(questions, markedAnswers, quizId);
  });
}

if (updateProfileForm) {
  updateProfileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let data = {};
    data.firstName = document.getElementById("update-firstName").value;
    data.lastName = document.getElementById("update-lastName").value;
    data.phone = document.getElementById("update-phone").value;
    data.email = document.getElementById("update-email").value;

    updateProfile(data);
  });
}

if (questionsButton) {
  questionsButton.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const quizId = btn.dataset.quizid;
      location.assign(`/quizzes/${quizId}/questions`);
    });
  });
}

if (startQuizButtons) {
  startQuizButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const quizId = btn.dataset.quizid;
      location.assign(`/quizzes/${quizId}/attemptQuiz`);
    });
  });
}

if (showAttemptsButtons) {
  showAttemptsButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const quizId = btn.dataset.quizid;
      location.assign(`/quizzes/${quizId}/attempts`);
    });
  });
}

if (markQuizActive) {
  markQuizActive.forEach((input) => {
    input.addEventListener("change", (event) => {
      const quizid = input.dataset.quizid;
      const active = input.checked;
      updateQuiz(quizid, active);
    });
  });
}

if (addNotesForm) {
  addNotesForm.addEventListener("submit", (event) => {
    event.preventDefault();

    document.getElementById("addNotes-btn").innerText = "Adding...";

    const subjectId = document.getElementById("addNotes-subject").value;
    const form = new FormData();
    form.append('filename', document.getElementById('myFile').files[0]);
    form.append('notesname', document.getElementById("addNotes-name").value)

    addNotes(form, subjectId);
  });
}
