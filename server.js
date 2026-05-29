import express from "express";3

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

const port = 3000;

app.listen(port, () => {
    console.log("Hey there!");
});