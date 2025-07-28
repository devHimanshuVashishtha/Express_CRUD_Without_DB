const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const users = [];



app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.json({ message: "No name and Email Enter" });
  const emailExit = users.find((u) => u.email === email);
  if (emailExit)
    return res.json({ message: "Email already exist" });
  const newUser = {
    id: users.length + 1,
    name,
    email,
    createdAt: new Date(),
  };
  users.push(newUser);
  res.status(202).json({ message: "User add Successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

