const express = require("express");
const app = express();

app.use(express.json());

const user = [];

app.post("/user", (req, res) => {
    console.log(req.body);

    user.push(req.body);

    res.status(201).json({
        message: "User created successfully",
        data: req.body
    });
});

app.get("/user", (req, res) => {
    res.status(200).json({
        message: "Users fetched successfully",
        data: user
    });
});

app.put("/user/:index", (req, res) => {
    const index = Number(req.params.index);
    const { username } = req.body;

    if (!user[index]) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user[index].username = username;

    res.status(200).json({
        message: "Username updated successfully",
        data: user[index]
    });
});

app.delete("/user/:index", (req, res) => {
    const index = Number(req.params.index);

    if (!user[index]) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.splice(index, 1);

    res.status(200).json({
        message: "User deleted successfully"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});