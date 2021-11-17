import axios from "axios";
import { showAlert, hideAlert } from "./alert";

export const addQuestion = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/questions/",
      data
    });
    if (res.data.status === "success") {
      showAlert("success", "Question added successfully!");
      window.setTimeout(() => {
        location.assign(`/quizzes/${data.quiz}/questions`);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
