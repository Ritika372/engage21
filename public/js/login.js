import axios from "axios";
import { showAlert, hideAlert } from "./alert";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Logged In successfully!");
      window.setTimeout(() => {
        location.assign("/profile");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const signup = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/users/signup",
      data: data,
    });

    if (res.data.status === "success") {
      showAlert("success", "Registered successfully!");
      window.setTimeout(() => {
        location.assign("/profile");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
