const moongose = require("mongoose");
const app = require("./app");

const CONNECT_DB =
  "mongodb+srv://andrew:On8nlwRFeL6HcOsN@cluster0.dy8pfpy.mongodb.net/recipe?retryWrites=true&w=majority";
moongose.set("strictQuery", true);

moongose
  .connect(CONNECT_DB)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
