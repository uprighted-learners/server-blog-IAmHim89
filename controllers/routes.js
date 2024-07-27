const router = require("express").Router();

//file system import
const fs = require("fs");

// path for json
const path = require("path");

const myFullPath = path.join(__dirname, "../api/blog.json");
//? get endpoint display all comments
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
      res.status(500).send("Your Json didn't render!");
    }
  });
});
//? get endpoint display 1 comment
router.get("/post_id/:id", (req, res) => {
  fs.readFile(myFullPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading comments file");
    }
    try {
      //const postId = req.params.id;
      const allComments = JSON.parse(data);
      const singleComment = allComments.findIndex(
        (allComments) => allComments.post_id === req.params.id
      );

      console.log(allComments);
      if (allComments) {
        res.status(200).json({ singleComment });
      } else {
        res.status(500).send("Error with your comments!!");
      }
    } catch (error) {
      res.status(500).json({
        Error: error,
      });
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
    const create = {
      post_id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
    };
    try {
      jsonData = JSON.parse(data);
      jsonData.push(create);
      fs.writeFileSync(myFullPath, JSON.stringify(jsonData));
      res.status(200).json({ jsonData });
    } catch (err) {
      res.status(500).json({
        Error: err,
      });
    }
  });
});
//? patch endpoint to update comment
router.patch("/update/:id", (req, res) => {
  fs.readFile(myFullPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error with connecting Path");
    }

    try {
      const jsonBlog = JSON.parse(data);

      let jsonIndex = jsonBlog.findIndex(
        (jsonBlog) => jsonBlog.post_id == req.params.id
      );

      jsonBlog[jsonIndex] = {
        post_id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        text: req.body.text,
      };
      res.status(200).json({
        updated: jsonBlog[jsonIndex],
        Results: jsonBlog,
      });
      fs.writeFileSync(myFullPath, JSON.stringify(jsonBlog));
      console.log(jsonIndex);
    } catch (error) {
      res.status(500).send("Server not Working!");
    }
  });
});
router.delete("/remove/:id", (req, res) => {
  fs.readFile(myFullPath, "utf8", (err, data) => {
    if (err) throw res.status(500).send("Something went wrong with file Path");
    try {
      const jsonBlog = JSON.parse(data);
      let jIndex = jsonBlog.findIndex(
        (jsonBlog) => jsonBlog.post_id == req.params.id
      );
      jsonBlog.splice(jIndex, 1);
      fs.writeFileSync(myFullPath, JSON.stringify(jsonBlog));
      res.status(200).json({
        Deleted: 1,
        Results: jsonBlog,
      });
    } catch (err) {
      res.status(500).json({
        Error: err.message,
      });
    }
  });
});

module.exports = router;

// // const update = req.body;
