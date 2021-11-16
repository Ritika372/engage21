import "@babel/polyfill";

import { login, signup } from "./login";
import { addSubject } from "./subject";
import { addQuiz } from "./quiz";

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const addSubjectForm = document.getElementById("addSubject-form");
const addQuizForm = document.getElementById("addQuiz-form");
const questionsButton = document.getElementById("open-questions");

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

    addQuiz(data);
  });
}

if(questionsButton) {
  questionsButton.addEventListener("click", (event) => {
    const quizId = questionsButton.dataset.quizid;
    
    location.assign(`/quizzes/${quizId}/questions`);
  })
}