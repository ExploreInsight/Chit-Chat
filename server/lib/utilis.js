import jwt from 'jsonwebtoken';

export const generateTokenWithCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set cookie in response
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // ✅ typo fixed here
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};
