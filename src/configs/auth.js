module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "dafault",
    expiresIn: "1d"
  }
}