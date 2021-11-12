import jwt from "jsonwebtoken";
import { DecodedToken, UserDocument } from "../typings";

process.env.TS_NODE_DEV && require("dotenv").config();
if (!process.env.JWT_SECRET) {
  throw new Error("No JWT Secret")}

export const JWTAuthenticate = async (user: UserDocument) => {
  // given the user the function gives us back the access token
  // const accessToken = await generateJWT({ _id: user._id });
  const accessToken = await generateJWT(user);
  return accessToken;
};

// Generate JWT Token

const generateJWT = (user: UserDocument) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      {_id: user._id},
      process.env.JWT_SECRET!,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );

// Verify JWT Token
export const verifyJWT = (token: string) => (
  new Promise<DecodedToken>((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET!, (err, decodedToken) => {
      if (err) rej(err);
      else res(decodedToken as DecodedToken);
    })
  )
)
