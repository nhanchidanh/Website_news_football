const mongoose = require("mongoose");

//off warning
mongoose.set("strictQuery", false)

//connect
mongoose.connect(process.env.MONGO_URI)
  .then(_ => console.log('connect database success'))
  .catch((error) => console.log('Error connect...', error));

mongoose.set("debug", true);

mongoose.set("debug", {color: false});

mongoose.set("debug", {shell: true});

module.exports = mongoose;
