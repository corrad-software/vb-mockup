import jwt from "jsonwebtoken";

const ENV = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  // BYPASS: Always set a mock authenticated user
  event.context.user = {
    userID: 1,
    email: "admin@test.com",
    roles: ["superadmin", "admin"],
  };
  return;
});

function parseCookie(str) {
  return str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
}

function verifyAccessToken(accessToken) {
  try {
    const token = ENV.auth.secretAccess;
    return jwt.verify(accessToken, token);
  } catch (error) {
    return false;
  }
}

function verifyRefreshToken(refreshToken) {
  try {
    const token = ENV.auth.secretRefresh;
    return jwt.verify(refreshToken, token);
  } catch (error) {
    return false;
  }
}

function generateAccessToken(user) {
  try {
    const token = ENV.auth.secretAccess;
    return jwt.sign(user, token, { expiresIn: "1d" });
  } catch (error) {
    return false;
  }
}

async function getUserInfo(username) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        userUsername: username,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
  }
}
