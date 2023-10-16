const User = require("../models/user");
const jwt = require("jsonwebtoken");

const refreshTokkenController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ msg: "Unauthorized" });
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  //delete refres token
  const user = await User.findOne({ refreshToken }).exec();

  if (!user) {
    jwt.verify(
      refreshToken,
      process.env.JWTREFRESHSECRETKEY,
      async (error, decoded ) => {
        if (error) return res.sendStatus(401);
        const hackedUser = await User.findOne({
          username: decoded.username,
        }).exec();
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
        console.log(result);
      }
    );
    return res.status(404).json({
      msg: "user not found",
    });
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  jwt.verify(
    refreshToken,
    process.env.JWTREFRESHSECRETKEY,
    async (error, decoded) => {
      if (error) {
        user.refreshToken = [newRefreshTokenArray];
      }
      if (error || user.id !== decoded.id)
        return res.status(403).json({ msg: "Forbidden" });
      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.JWTSECRETKEY,
        { expiresIn: "15m" }
      );
      const _newrefreshTokken = jwt.sign(
        { id: user._id },
        process.env.JWTREFRESHSECRETKEY,
        {
          expiresIn: "1d",
        }
      );
      //save refresh token to db
      user.refreshToken = [...newRefreshTokenArray, _newrefreshTokken];
      await user.save();
      //send refresh token as httpOnlycookie prevent prevents client-side scripts from accessing data
      res.cookie("jwt", _newrefreshTokken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, //one day max age
      });

      return res.status(200).json({ accessToken });
    }
  );
};

module.exports = {
  refreshTokkenController,
};
