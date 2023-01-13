const express = require("express");
const netflixModel = require("../models/netflixModel");

const router = express.Router();

let findItemByTitle = async (req, res, next) => {
  console.log(req.query);

  //title to search for
  let title = req.query.title;
  // finds item if it contains the phrase in the title
  let result = await netflixModel.find({ $text: { $search: `\"${title}\"` } });
  console.log(result);

  res.status(200).json({
    status: "success",
    body: result,
  });
};

let findMovieByTitle = async (req, res, next) => {
  console.log("HERE");
  let title = req.query.title;
  let result = await netflixModel
    .find({ $text: { $search: `\"${title}\"` } })
    .and({ type: "movie" });

  res.status(200).json({
    status: "success",
    body: result,
  });
};

let findTvShowByTitle = async (req, res, next) => {
  let title = req.query.title;
  let result = await netflixModel
    .find({ $text: { $search: `\"${title}\"` } })
    .and({ type: "tv" });

  res.status(200).json({
    status: "success",
    body: result,
  });
};

// this is a large request, better way to do this?
let getAllItems = async (req, res, next) => {
  let result = await netflixModel.find();
  console.log(result.length);
  res.status(200).json({
    status: "success",
    body: result,
  });
};

let getAllTvShows = async (req, res, next) => {
  let result = await netflixModel.find({ type: "tv" });
  console.log(result.length);
  res.status(200).json({
    status: "success",
    body: result,
  });
};

let getAllMovies = async (req, res, next) => {
  let result = await netflixModel.find({ type: "movie" });
  console.log(result.length);
  res.status(200).json({
    status: "success",
    body: result,
  });
};

router.route("/").get(findItemByTitle);
router.route("/movies").get(findMovieByTitle);
router.route("/tv").get(findTvShowByTitle);
router.route("/allItems").get(getAllItems);
router.route("/allTvShows").get(getAllTvShows);
router.route("/allMovies").get(getAllMovies);

module.exports = router;
