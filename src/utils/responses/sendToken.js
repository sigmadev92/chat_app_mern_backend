const sendToken = async (user, res, statusCode) => {
  const token = user.getJWTToken();
  const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  res
    .status(statusCode)
    .cookie("f3Token", token, cookieOptions)
    .json({ success: true, user, f3Token: token });
};

export default sendToken;
// from chatGPT
// res.cookie("token", jwtToken, {
//   httpOnly: true, // cannot be accessed via JS (XSS protection)
//   secure: true, // only send over HTTPS
//   sameSite: "strict", // CSRF protection
//   maxAge: 24 * 60 * 60 * 1000, // 1 day
// });
