const router = require("express").Router();

/* const { ifError } = require("assert");
const { isUtf8 } = require("buffer");
const { json } = require("express"); */
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
//?get endpoint display 1 comment
//TODO Makesure to fix post_id single comment display
router.get("/post_id/:id", (req, res) => {
  fs.readFile(myFullPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading comments file");
    }
    try {
      const postId = req.params.id;
      const allComments = JSON.parse(data);
      const singleComment = allComments.find(
        (allComments) => allComments.post_id === postId
      );

      if (allComments) {
        res.status(200).json({ singleComment });
      } else {
        req.status(500).send("Error with your comments!!");
      }
    } catch (error) {
      res.status(500).json({
        Error: error,
      });
      console.log(error);
    }
  });
});
//? post endpoint create new comment
router.post("/create", (req, res) => {
  fs.readFile(myFullPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Something went wrong with your path");
    }
    let jsonData = [];
    const create = req.body;
    try {
      jsonData = JSON.parse(data);
      jsonData.push(create);

      res.status(200).json({ jsonData });
    } catch (err) {
      res.status(500).json({
        Error: err,
      });
    }
  });
});
router.patch("/update/:id", (req, res) => {
  fs.readFile(myFullPath, "utf8", async (err, data) => {
    if (err) {
      return res.status(500).send("Error with connecting Path");
    }
    try {
      const update = req.body;
      const id = req.params.id;
      let jsonBlog = JSON.parse(data);
    } catch (error) {
      res.status(500).send("Server not Working!");
    }
  });
});
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
