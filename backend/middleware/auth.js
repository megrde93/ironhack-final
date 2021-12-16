require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //Get the token
  let token = req.headers.authorization; //This will give us our token
  console.log("THE TOKEN", token);

  if (!token) {
    return res.json({ message: "No token found" });
  }

  //Make sure token is valid

  try {
    //verify all the information is correct
    //1st arg: the token we grabbed from the header
    //2nd arg": the .env SECRET we added
    const decodedInfo = jwt.verify(token, process.env.SECRET);
    console.log("This info was hidden in the token", decodedInfo);
    req.user = decodedInfo.user;
    next();
  } catch (err) {
    res.json(err);
  }
};

module.exports = auth;
