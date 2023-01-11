module.exports.OPTION_CORS = {
  origin: process.env.URL_CLIENT,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
};
