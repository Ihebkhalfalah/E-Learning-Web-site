
  const User = require("../models/user");

  
  module.exports = {
    
  findUsers: async (req, res) => {
    const users = await User.find();
    res.send(users );
  },

  createUser: async (req, res) => {
    const user = new User(req.body);
    console.log(user);
    await user.save();
    res.status(200).send( user );
  },

  findUser: async (req, res) => {
    try { 
      const user = await User.findById(req.params.id);
      res.send(user );
    } catch {
      res.status(404).send({ error: "user is not found!" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      Object.assign(user, req.body);
      user.save();
      res.send(user);
    } catch {
      res.status(404).send({ error: "user is not found!" });
    }
  },

  deleteUser : async (req, res) => {
      try {
        const user = await User.findById(req.params.id);
        await user.remove();
        res.send(true);
      } catch {
        res.status(404).send({ error: "user is not found!" });
      }
    },

    

};

