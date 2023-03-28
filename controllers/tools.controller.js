const { ObjectId } = require("mongodb");
// const { getDb } = require("../utils/dbConnect");
const fs = require("fs");
let tools = [
  { id: 1, name: "Hammer" },
  { id: 2, name: "Hammer2" },
  { id: 3, name: "Hammer3" },
];

module.exports.getAllTools = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    // const db = getDb();

    // cursor => toArray(), forEach()
    // const tool = await db
    //   .collection("tools")
    //   .find({})
    // .project({ _id: 0 })
    // .skip(+page * limit)
    // .limit(+limit)
    // .toArray();

    res.status(200).json({ success: true, data: tool });
  } catch (error) {
    next(error);
  }
};

module.exports.saveATool = async (req, res, next) => {
  const newUser = req.body;
  if (newUser.hasOwnProperty("id") && newUser.hasOwnProperty("name")) {
    fs.readFile("data.json", function (err, data) {
      const sorted = JSON.parse(data);
      const newData = [...sorted, newUser];
      fs.writeFile("data.json", JSON.stringify(newData), function (err) {
        if (err) throw err;
        console.log("added!");
        res.status(200).json({ success: true, data: newData });
      });
    });
  } else {
    res.status(400).json({
      success: false,
      message: "object missing one or more properties",
    });
  }
};

module.exports.getToolDetail = async (req, res, next) => {};

module.exports.updateAUser = async (req, res, next) => {
  const id = req.params.id;
  const user = req.body;
  fs.readFile("data.json", function (err, data) {
    const sorted = JSON.parse(data);
    const validateId = sorted.find((data) => data.id == id);
    if (validateId) {
      const dataAfterDeletion = sorted.find((data) => data.id == id);
      const indexed = sorted.indexOf(dataAfterDeletion);
      Object.assign(sorted[indexed], user);

      fs.writeFile("data.json", JSON.stringify(sorted), function (err) {
        if (err) throw err;
        console.log("updated!");
        res.status(200).json({ success: true, data: sorted });
      });
    } else {
      res.status(400).json({
        success: false,
        message: "id not found ",
      });
    }
  });
};
module.exports.bulkUpdateUser = async (req, res, next) => {
  const id = req.params.id;
  const user = req.body;
  fs.readFile("data.json", function (err, data) {
    const sorted = JSON.parse(data);
    const validateId = sorted.find((data) => data.id == id);
    if (validateId) {
      const dataAfterDeletion = sorted.find((data) => data.id == id);
      const indexed = sorted.indexOf(dataAfterDeletion);
      sorted[indexed] = { id: parseInt(id), name: "gasi" };

      fs.writeFile("data.json", JSON.stringify(sorted), function (err) {
        if (err) throw err;
        console.log("updated!");
        res.status(200).json({ success: true, data: sorted });
      });
    } else {
      res.status(400).json({
        success: false,
        message: "id not found ",
      });
    }
  });
};

module.exports.deleteAUser = async (req, res, next) => {
  const id = req.params.id;
  fs.readFile("data.json", function (err, data) {
    const sorted = JSON.parse(data);
    const validateId = sorted.find((data) => data.id == id);
    if (validateId) {
      const dataAfterDeletion = sorted.filter((data) => data.id != id);
      fs.writeFile(
        "data.json",
        JSON.stringify(dataAfterDeletion),
        function (err) {
          if (err) throw err;
          console.log("deleted!");
          res.status(200).json({ success: true, data: dataAfterDeletion });
        }
      );
    } else {
      res.status(400).json({
        success: false,
        message: "id not found ",
      });
    }
  });
};
