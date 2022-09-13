const jwt = require("jsonwebtoken");
const secret = process.env.ELECTION_SECRET;

module.exports = class jwtService {
  async sign(user) {
    return await jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      secret,
      { expiresIn: "30d" }
    );
  }

  async verify(token) {
    const data = await jwt.verify(token, secret);
    return data;
  };
}



