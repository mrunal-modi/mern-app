const myModel = require("./model");

const create = async (req, res) => {
  try {
    const email = req.body.email;
    const exists = await myModel.findOne({ email: email})
    if (exists) {
      return res.status("400").json({
        error: "User already exists"
      })
    }
    // Create a Mongoose object
    const user = new myModel({ email: email});
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
    const email = req.params.email;
    const result = await myModel.findOne({ email: email });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "message": "An error occured", "errors": err });
  }
};

const readAll = async (req, res) => {
  try {
    const email = req.query.email;
    const q = {};
    if (email) {
      q["email"] = email;
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
    const email = req.params.email;
    const result = await myModel.findOneAndUpdate({ email: email }, {
      $set: {
        email: req.body.email
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
    const email = req.params.email;
    const result = await myModel.findOneAndDelete({ email: email });
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
