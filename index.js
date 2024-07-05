const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Bonjour depuis le serveur",
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
