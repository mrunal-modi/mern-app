const myModel = require("./model");

const create = async (req, res) => {
  try {
    const task = req.body.task;
    const exists = await myModel.findOne({ task: task})
    if (exists) {
      return res.status("400").json({
        error: "User already exists"
      })
    }
    // Create a Mongoose object
    const user = new myModel({ task: task});
    // Saving to the DB Collection
    const result = await user.save(); 
    return res.json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ "message": "An error occured", "errors": err });
  }
};

const read = async (req, res) => {
  try {
    const task = req.params.task;
    const result = await myModel.findOne({ task: task });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "An error occured", "errors": err });
  }
};

const readAll = async (req, res) => {
  try {
    const task = req.query.task;
    const q = {};
    if (task) {
      q["task"] = task;
    }
    const result = await myModel.find(q);
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occured", errors: err });
  }
};

const update = async (req, res) => {
  try {
    const task = req.params.task;
    const result = await myModel.findOneAndUpdate({ task: task }, {
      $set: {
        task: req.body.task
      }
    }, { new: true });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "An error occured", "errors": err });
  }
};

const _delete = async (req, res) => {
  try {
    const task = req.params.task;
    const result = await myModel.findOneAndDelete({ task: task });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "An error occured", "errors": err });
  }
};


module.exports = {
  create: create,
  read: read,
  readAll: readAll,
  update: update,
  _delete: _delete
};
