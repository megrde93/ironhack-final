var express = require("express");
var router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");

router.post("/add-post", auth, function (req, res, next) {
  console.log("The new post:", req.body);

  const postToCreate = new Post({
    creatorID: req.body.creatorID,
    username: req.body.username,
    location: req.body.location,
    dontMiss: req.body.dontMiss,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    thubnailPic: req.body.thumbNailPic,
    blog: req.body.blog,
    imgOne: req.body.imgOne,
    favOne: req.body.favOne,
    favTwo: req.body.favTwo,
    favThree: req.body.favThree,
  });

  Post.create(postToCreate)
    .then((results) => {
      console.log("These are the results", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.get("/all-posts/:username", (req, res) => {
  console.log("we are hitting this route", req.params.username);
  Post.find({ username: req.params.username })
    .then((results) => {
      console.log("Getting All Posts", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json({ error: err.message });
    });
});
router.get("/all-posts", (req, res) => {
  Post.find()
    .populate("creatorID")
    .then((results) => {
      console.log("Getting All Posts", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json({ error: err.message });
    });
});

router.get("/get-post/:postId", auth, (req, res) => {
  console.log("this is params", req.params);
  Post.findById(req.params.postId)
    .then((results) => {
      console.log("getting an inidividual post", results);
      let newStartDate = results.startDate.toString("YYYY-MM-DD");
      newStartDate = newStartDate.slice(0, 15);
      let newEndDate = results.endDate.toString("YYYY-MM-DD");
      newEndDate = newEndDate.slice(0, 15);
      res.json({
        creatorID: results.creatorID,
        username: results.username,
        location: results.location,
        dontMiss: results.dontMiss,
        startDate: newStartDate,
        endDate: newEndDate,
        thubnailPic: results.thumbNailPic,
        blog: results.blog,
        imgOne: results.imgOne,
        favOne: results.favOne,
        favTwo: results.favTwo,
        favThree: results.favThree,
      });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json({ error: err.message });
    });
});

router.delete("/delete-post/:postId", auth, (req, res) => {
  console.log("this is params", req.params);
  Post.findByIdAndDelete(req.params.postId)
    .then((post) => {
      res.json({ message: "post deleted sucessfully" });
    })
    .catch((err) => {
      res.json(err);
    });
});

// Update Post functionality

// router.post("/update-post/:postId", (req, res) => {
//   Post.findByIdAndUpdate(req.params.postId, { ...req.body })
//     .then((updateddata) => {
//       console.log("Update successful: ", updateddata);
//       res.json(updateddata);
//     })
//     .catch((err) => {
//       console.log("Something went wrong: ", err);
//     });
// });

module.exports = router;
