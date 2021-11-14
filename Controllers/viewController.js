const Subject = require("../Model/subjectModel");

exports.getLoginForm = async (req, res, next) => {
  res.status(200).render("login");
};

exports.getSignUpForm = async (req, res, next) => {
  res.status(200).render("signup");
};

exports.getProfilePage = async (req, res, next) => {
  res.status(200).render("admin_profile");
};

exports.getSubjectPage = async (req, res, next) => {
  try {
    const subjects = await Subject.find();

    res.status(200).render("subjects", { subjects });
  } catch (err) {
    next(err);
  }
};

exports.getAddSubjectPage = async (req, res, next) => {
  res.status(200).render("addSubject");
};
