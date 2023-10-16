const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendMail } = require("../helpers/emailConfirmation");
const {
  VERIFICATION_BODY_EMAIL,
  ACCOUNT_VERIFICATION_ROUTE,
  VERIFICATION_SUBJECT_EMAIL,
} = require("../helpers/constants");
const logger = require("../helpers/logger");

const signUpController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = Promise.resolve(User.findOne({ email }));

  if (await user)
    return res.status(409).json({
      msg: "user already exists",
    });

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  /*
  User.createMapping((err, mapping) => {
    console.log('mapping created');
});
*/
  await User.create({
    name,
    email,
    password: hashPassword,
  })
    .then((data) => {
      sendMail(
        data.email,
        VERIFICATION_SUBJECT_EMAIL,
        VERIFICATION_BODY_EMAIL,
        data._id,
        res,
        ACCOUNT_VERIFICATION_ROUTE
      );
      /*
      User.on('es-indexed', (err, result) => {
        console.log('indexed to elastic search');
    });
    */
      logger.info(
        `msg: new User was added to DB\n  \n method: ${req.method}\n path: ${req.url}`
      );

      return res.status(200).json({
        msg: "user created",
      });
    })
    .catch((error) => {
      logger.error(
        `msg: Issue Creating new User\n error: ${error.message} at  ${__filename} `
      );
      res.status(500).json({
        msg: "User not created",
        erro: erro.message,
      });
    });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({
      msg: "user not found",
    });
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(401).json({
      msg: "wrong credentilas",
    });

  if (!user.isAccountActive) {
    return res.status(401).json({
      msg: "Please activate your account, by verifying your email",
    });
  }
  const acesstoken = jwt.sign(
    { id: user._id, role: user.UserRole },
    process.env.JWTSECRETKEY,
    {
      expiresIn: "30m",
    }
  );

  const refreshTokken = jwt.sign(
    { id: user._id, role: user.UserRole },
    process.env.JWTREFRESHSECRETKEY,
    {
      expiresIn: "1d",
    }
  );

  //save refresh token to db
  user.refreshToken = refreshTokken;
  await user.save();
  //send refresh token as httpOnlycookie prevent prevents client-side scripts from accessing data
  res.cookie("jwt", refreshTokken , {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, //one day max age
  });

  const newuser = {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    acesstoken,
  };
  logger.info(`msg: user  logged,  method: ${req.method}, path: ${req.url}`);

  res.status(200).json({
    newuser,
  });
};

module.exports = {
  signUpController,
  loginController,
};
