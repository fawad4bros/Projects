//Defining All the API's EndPoint's
const express = require("express");
const router = express.Router();
//
const User = require("../models/user");
//Connecting Mongoose DB

const mongoose = require("mongoose");
const db = "";
mongoose.connect(db, (err) => {
  if (err) {
    console.log("ERROR !" + err);
  } else {
    console.log("Mongoose Database has been connected");
  }
});
router.get("/", (req, res) => {
  res.send("Hello from the other side");
});

router.post("/register", (req, res) => {
  var user = new User(req.body);
  //Passing the user data in User('data') other arguments already have been passed in user.js mongoose.model('data', schema_name, 'collection_name_in_database')
  user
    .save()
    .then((registeredUser) => {
      res.status(200).send(registeredUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  // body: { email: 'fawad@gmail.com', password: 'Fawadnaeem' }
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send(`Invalid Email: ${userData.email}`);
      } else {
        if (user.password !== userData.password) {
          res.status(401).send(`Invalid password of: ${userData.email}`);
        } else {
          res.status(200).send(user);
          // user {
          //   _id: new ObjectId("6177c13e12dc23726dd5b097"),
          //   email: 'fawad@gmail.com',
          //   password: 'Fawadnaeem',
          //   __v: 0
          // }
        }
      }
    }
  });
});
router.get("/events", (req, res) => {
  let events = [
    {
      _id: "1",
      name: "Event 1",
      description: "Event 1 description",
      date: "2021-01-23T18:2:43.511Z",
    },
    {
      _id: "2",
      name: "Event 2",
      description: "Event 2 description",
      date: "2021-02-23T18:2:43.511Z",
    },
    {
      _id: "3",
      name: "Event 3",
      description: "Event 3 description",
      date: "2021-03-23T18:2:43.511Z",
    },
    {
      _id: "4",
      name: "Event 4",
      description: "Event 4 description",
      date: "2021-04-23T18:2:43.511Z",
    },
  ];
  res.json(events);
});
router.get("/special", (req, res) => {
  let special = [
    {
      _id: "1",
      name: "special 1",
      description: "special 1 description",
      date: "2021-01-23T18:2:43.511Z",
    },
    {
      _id: "2",
      name: "special 2",
      description: "special 2 description",
      date: "2021-02-23T18:2:43.511Z",
    },
    {
      _id: "3",
      name: "special 3",
      description: "special 3 description",
      date: "2021-03-23T18:2:43.511Z",
    },
    {
      _id: "4",
      name: "special 4",
      description: "special 4 description",
      date: "2021-04-23T18:2:43.511Z",
    },
  ];
  res.json(special);
});
module.exports = router;
