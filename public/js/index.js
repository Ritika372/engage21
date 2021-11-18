import "@babel/polyfill";

import { login, signup } from "./login";
import { addSubject } from "./subject";
import { addQuiz, evaluateQuiz } from "./quiz";
import { addQuestion } from "./question";

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const addSubjectForm = document.getElementById("addSubject-form");
const addQuizForm = document.getElementById("addQuiz-form");
const addQuesForm = document.getElementById("addQue-form");
const submitQuizForm = document.getElementById("submitQuiz-form");

const questionsButton = document.getElementsByName("open-questions");

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
    event.preventDefault();
    const numberOfQuestions = submitQuizForm.dataset.numberofquestions;
    const quizId = submitQuizForm.dataset.quizid;
    let questions = [];
    let markedAnswers = [];

    for (let i = 0; i < numberOfQuestions; i += 1) {
      let queId = `questionId${i}`;
      if (document.getElementById(queId)) {
        questions.push(document.getElementById(queId).dataset.queid);
      }

      let markedAns = document.getElementsByName(`option${i}`);
      for (let i = 0; i < markedAns.length; i++) {
        if (markedAns[i].checked) {
          markedAnswers.push(markedAns[i].value);
          break;
        }
      }
    }

    evaluateQuiz(questions, markedAnswers, quizId);
  });
}

if (questionsButton) {
  console.log(questionsButton);
  questionsButton.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const quizId = btn.dataset.quizid;
      location.assign(`/quizzes/${quizId}/questions`);
    });
  });
}
