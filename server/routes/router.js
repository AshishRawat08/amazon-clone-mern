const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// get all productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    // console.log("console the data" + productsdata);
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

// get individual product data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const individualdata = await Products.findOne({ id: id });
    // console.log(individualdata + "individual data");
    res.status(201).json(individualdata);
  } catch (error) {
    res.status(400).json(individualdata);
    console.log("error" + error.message);
  }
});

// register user data
router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "fill all the data" });
    console.log("no data available");
  }

  try {
    const preuser = await USER.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "This user is already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password and cpassword not matched" });
    } else {
      const finalUser = new USER({ fname, email, mobile, password, cpassword });

      // hashing algo (bcryptjs)
      // password hashing process
      const storedata = await finalUser.save();
      console.log(storedata);

      res.status(201).json(storedata);
    }
  } catch (error) {}
});

// Login user api

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill all the data" });
  }

  try {
    const userlogin = await USER.findOne({ email: email });
    console.log(userlogin + "user value");

    if (userlogin) {
      const isMatch = await bcryptjs.compare(password, userlogin.password);
      console.log(isMatch + " password match");

      // token generate
      const token = await userlogin.generateAuthToken();
      // console.log(token);

      res.cookie("Amazonweb", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalid details" });
      } else {
        res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "invalid details" });
    }
  } catch (error) {
    res.status(400).json({ error: "invalid details" });
  }
});

// adding data into cart
router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    console.log(cart + "cart value");

    const UserContact = await USER.findOne({ _id: req.userID });
    console.log(UserContact);

    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart);
      await UserContact.save();
      console.log(cartData);
      res.status(201).json(UserContact);
    } else {
      res.status(401).json({ error: "invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "invalid user" });
  }
});

module.exports = router;
