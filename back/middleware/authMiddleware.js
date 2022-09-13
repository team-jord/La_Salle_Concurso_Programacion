const jwtService = require("../services/jwt.service");
const jwtServiceInstance = new jwtService();

module.exports = async function auth(ctx, next) {
  try {
    const token = ctx.request.headers.Authentication;

    if (token) {
      const user = await jwtServiceInstance.verify(token);
      ctx.currentUser = user;
      return next();
    } else {
      throw "no token";
    }
  } catch (e) {
    ctx.response.status = 401;
    ctx.response.body = "Invalid token.";
  }
}