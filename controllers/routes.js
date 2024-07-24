const router = require("express").Router();

const { json } = require("express");
//file system import
const fs = require("fs");
//const { dirname } = require("path");

// path for json
const path = require("path");

const myFullPath = path.join(__dirname, "../api/blog.json");
//?get endpoint display comments
router.get("/project", (req, res) => {
  fs.readFile(myFullPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log("File contents:", data);

    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (error) {
      res.status(500).send("Your Json didn't render!", error);
    }
  });
});
router.get("project/:post_id", (req, res) => {
  fs.readFile(myFullPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading comments file");
    }
    try {
      const postId = req.params.post_id;
      const allComments = json.parse(data);
      const singleComment = allComments.find(
        (allComments) => allComments.post_id === postId
      );

      if (allComments) {
        res.status(200).json(singleComment);
      } else {
        req.status(500).send("Error with your comments!!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
});
router.post("/project", (req, res) => {});
router.put("/project", (req, res) => {});
router.delete("/project", (req, res) => {});

module.exports = router;

/* 

fs.readFile(path, "utf8", (err, data) => {
    // condtitional to check setup works properlf through fs
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    //try catch for parse json data trial and error
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (Err) {
      res.status(500).send("Error parsing JSON data:");
    }
  });

*/
