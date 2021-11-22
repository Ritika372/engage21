import axios from "axios";
import { showAlert, hideAlert } from "./alert";

export const updateProfile = async (data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/users/updateMe",
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", "Profile updated successfully!");
      window.setTimeout(() => {
        location.assign("/home");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

