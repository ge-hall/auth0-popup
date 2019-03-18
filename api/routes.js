// api/routes.js

const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const path = require("path");

const allShows = require("./data/tvShows");
const allMovies = require("./data/movies");
const config = require("./config");

const router = express.Router();

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: [config.AUDIENCE],
  issuer: `https://${config.AUTH0_DOMAIN}/`,
  algorithm: "RS256"
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
  // When the application is built, this file will be created.
  // It currently is not created.
});

router.get("/api/", (req, res) => {
  res.send("API is working");
});

router.get("/api/data/tvshows", (req, res) => {
  res.json(allShows);
});

router.get("/api/data/movies", authCheck, (req, res) => {
  res.json(allMovies);
});

module.exports = router
