const User = require("../models/user");

exports.currentUserf = (req) => {
  let currentUsr ="hello";
  try {
    const user = Promise.resolve(User.findById(req.user_id));
    user.then((usr) => {
      currentUsr = usr;
    });
    return currentUsr ;
  } catch (error) {
    console.log("internal server Error", error);
  }
};
