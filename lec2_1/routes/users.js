const express = require('express');
const usersRouter = express.Router();

usersRouter.get("/", (req, res) => res.json([ { login: 'admin' } ]));
usersRouter.get("/:id", (req, res) => res.status(404).end("Not found"));

module.exports = usersRouter;
