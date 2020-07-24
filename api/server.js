const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/accounts", (req, res) => {
  db("accounts")
    .where("budget", "<", req.query.max)
    .orderBy("budget", req.query.order)
    .limit(req.query.limit)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => res.status(500).send());
});

server.get("/accounts/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(500).send());
});

server.post("/accounts", (req, res) => {
  db("accounts")
    .insert(req.body)
    .then((results) => res.status(201).send())
    .catch((err) => res.status(500).send());
});

server.put("/accounts/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then((results) => res.status(201).send())
    .catch((err) => res.status(500).send());
});

server.delete("/accounts/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then((results) => res.status(204).send())
    .catch((err) => res.status(500).send());
});
module.exports = server;
