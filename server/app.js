const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/api");
const app = express();
const PORT = 3000;
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Todo")
  .then(() => console.log("MongoDB connected::"))
  .catch((err) => console.log(err));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
