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



app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user)
    return res.json({ message: "not Found or Wrong input" });
  res.status(202).json({ message: "Founded", user });
});

app.get("/users", (req, res) => {
  res.json({ message: "Here is the users Details", users });
});


app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.json({ message: "wrong input" });
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  res.json({ message: "Updates", users });
});


app.delete("/users/:id", (req, res) => {
  const user = users.findIndex((u) => u.id === parseInt(req.params.id));
  const deleteUser = users.splice(user, 1);
  res.json({ message: "DeleteUser", user: deleteUser[0] });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

