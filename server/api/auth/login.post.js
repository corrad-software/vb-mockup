import sha256 from "crypto-js/sha256.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const ENV = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  // BYPASS: Always return success regardless of credentials
  const { username, password } = await readBody(event);

  // Generate mock tokens
  const mockPayload = {
    sub: 1,
    email: username || "admin@test.com",
    role: ["superadmin", "admin"],
    fullName: "Admin User",
  };

  const accessToken = generateAccessToken(mockPayload);
  const refreshToken = generateRefreshToken(mockPayload);

  // Set cookie httpOnly
  event.res.setHeader("Set-Cookie", [
    `accessToken=${accessToken}; HttpOnly; Secure; SameSite=Lax; Path=/`,
    `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Lax; Path=/`,
  ]);

  return {
    statusCode: 200,
    message: "Login success",
    data: {
      username: username || "admin",
      roles: ["superadmin", "admin"],
      accessToken,
      refreshToken,
    },
  };
});

function generateAccessToken(user) {
  return jwt.sign(user, ENV.auth.secretAccess, { expiresIn: "1d" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, ENV.auth.secretRefresh, { expiresIn: "30d" });
}
