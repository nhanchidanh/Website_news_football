require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 4040;

const server = app.listen(PORT, () => {
  console.log("Server on running on http://localhost:" + PORT);
});

process.on("SiGNIN", () => {
  server.close(() => console.log("Exits server express"));
});
