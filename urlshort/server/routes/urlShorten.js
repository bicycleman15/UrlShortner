const express = require("express");
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = require("../models/urlShorten");
const shortid = require("shortid");
const router = express.Router();

//error url to redirect to
const errorUrl = "http://localhost/error";

//tester get route
router.get("/", (req, res) => {
  res.send("You have hit the item route");
});

//get request to redirect to a url from a shortened url
router.get("/:code", async (req, res) => {
  const urlCode = req.params.code;
  const item = await UrlShorten.findOne({ urlCode: urlCode });
  if (item) {
    return res.redirect(item.originalUrl);
  } else {
    return res.redirect(errorUrl);
  }
});

//Post request to create a new shortened url
router.post('/', async (req, res) => {
  const { originalUrl, shortBaseUrl } = req.body;
  if (validUrl.isUri(shortBaseUrl)) {
  } else {
    return res.status(401).json("Invalid Base Url");
  }
  const urlCode = shortid.generate();
  const updatedAt = new Date();
  if (validUrl.isUri(originalUrl)) {
    try {
      let item = await UrlShorten.findOne({ originalUrl: originalUrl });
      console.log("hello2");
      if (item) {
        res.status(200).json(item);
      }
        
      shortUrl = shortBaseUrl + "/" + urlCode;
      const newItem = new UrlShorten({
        originalUrl,
        shortUrl,
        urlCode,
        updatedAt
      });
      console.log("hello2");
      await newItem.save();
      res.status(200).json(newItem);
    } catch (err) {
      console.log(err)
    }
  } else {
    return res.status(401).json("Invalid Original Url");
  }
});

module.exports = router;
