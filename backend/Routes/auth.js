const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { loginStatus } = require("../middleware/authMiddleware");

// ashen 


router.get("/loggedin",loginStatus);


router.post("/", async (req, res, next) => {
	try {
	 
	  if (req.user) {
		return res.status(400).send({ message: "User already logged in." });
	  }
  
	  const { error } = validate(req.body);
	  if (error)
		return res.status(400).send({ message: error.details[0].message });
  
	  const user = await User.findOne({ email: req.body.email }).select("+password +role");
  
	  if (!user)
		return res.status(401).send({ message: "Invalid Email or Password" });
  
	  const validPassword = await bcrypt.compare(req.body.password, user.password);
	  if (!validPassword)
		return res.status(401).send({ message: "Invalid Email or Password" });
  
	  const token = user.generateAuthToken();
	  // Set the token in a cookie
	  res.cookie('authToken', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production', 
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	  }).status(200).send({ message: "Logged in successfully", _id: user.id, role: user.role });
	} catch (error) {
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });
  

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};





module.exports = router;
