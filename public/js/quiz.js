import axios from "axios";
import { showAlert, hideAlert } from "./alert";

export const addQuiz = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/quiz/",
      data
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
