import bcrypt from "bcryptjs";

// export const authHashPassword = (password) => {
//   const hashPassword = bcryptjs.hashSync(password, 8);
//   return hashPassword;
// };
export const authHashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, hashPassword) => {
  const isMatch = bcrypt.compareSync(password, hashPassword);
  return isMatch;
};
