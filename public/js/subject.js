import axios from "axios";
import { showAlert, hideAlert } from "./alert";

export const addSubject = async (name, description) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/subjects/",
      data: {
        name,
        description,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Subject added successfully!");
      window.setTimeout(() => {
        location.assign("/subjects");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const addNotes = async (data,id) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/subjects/${id}/addNotes`,
      data
    });
    if (res.data.status === "success") {
      showAlert("success", "Notes added successfully!");
      window.setTimeout(() => {
        location.assign("/subjects");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
