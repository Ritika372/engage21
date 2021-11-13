exports.getLoginForm = async (req, res, next) => {
  res.status(200).render("login");
};

exports.getSignUpForm = async (req, res, next) => {
  res.status(200).render("signup");
};

exports.getProfilePage = async (req, res, next) => {
  res.status(200).render("admin_profile");
};
