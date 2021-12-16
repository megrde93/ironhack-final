var express = require("express");
var router = express.Router();
const Post = require("../models/Post");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(`home page, this will should recent posts by time stamp`);
});

module.exports = router;
