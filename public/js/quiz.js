import axios from "axios";
import { showAlert, hideAlert } from "./alert";

export const addQuiz = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/quiz/",
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", "Quiz added successfully!");
      window.setTimeout(() => {
        location.assign("/quizzes");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const evaluateQuiz = async (questions, markedAnswers, quizId) => {
  try {
    window.onbeforeunload = null;
    const res = await axios({
      method: "POST",
      url: `http://localhost:3000/api/quiz/${quizId}`,
      data: { questions, markedAnswers },
    });
    if (res.data.status === "success") {
      showAlert("success", "Quiz submitted successfully!");
      window.onbeforeunload = null;
      window.setTimeout(() => {
        location.assign(`/quizzes/${quizId}/result`);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const updateQuiz = async(quizid,active) => {
  try{
    const res = await axios({
      method: "PATCH",
      url: `http://localhost:3000/api/quiz/${quizid}`,
      data : {active},
    });
    if (res.data.status === "success") {
      const message = `${active ? "Quiz is active now." : "Quiz is disabled for students"}`;
      showAlert("success", message);
      window.setTimeout(() => {
        location.assign(`/quizzes`);
      }, 1500);
    }

  } catch(err){
    showAlert("error", err.response.data.message);
  }
}