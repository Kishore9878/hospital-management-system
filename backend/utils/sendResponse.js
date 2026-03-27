import { generateToken } from "./generateToken.js";

// export const sendResponse = (res, user, statusCode, message) => {
//   const token = generateToken(user._id);

//   // const options = {
//   //   httpOnly: true,
//   //   secure: true,
//   //   sameSite: 'None',
//   // };
//   const { password: pass, ...rest } = user._doc; // hide password
//   return res
//     .status(statusCode)
//     .cookie("token", token, {
//       maxAge: 1 * 24 * 60 * 60 * 1000,
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//     })
//     .json({
//       success: true,
//       message,
//       user: rest,
//     });
// };
export const sendResponse = (
  res,
  user,
  statusCode,
  message,
  profile = null
) => {
  const isProduction = process.env.NODE_ENV === "production";
  const token = generateToken(user._id);

  const { password: pass, ...rest } = user._doc; // hide password

  const responseData = { user: rest };
  if (profile) {
    responseData.profile = profile; // attach patient/doctor profile if available
  }

  return res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // On local `http://localhost` the browser will not store `secure` cookies.
      // In production (HTTPS) we can use `secure: true` + `sameSite: "none"` for cross-site requests.
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    })
    .json({
      success: true,
      message,
      ...responseData,
    });
};
