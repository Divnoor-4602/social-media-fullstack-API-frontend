// todo: implement a mongo database and save the user in it
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import User from "./userDB.js";

// creating a server
const app = express();
const port = 3000;

// specifying salt rounds for hashing and salting the password
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

// create a new user in the users database
async function createNewUser(fullname, email, password) {
  try {
    const newUser = await User.create({
      fullname: fullname,
      email: email,
      password: password,
    });
    console.log(newUser);
  } catch (error) {
    console.log("Error experienced: " + error.message());
  }
}

// route for registering the user in the database
app.post("/auth/register", (req, res) => {
  const email = req.body.email;
  const fullname = req.body.fullname;
  const password = req.body.password;

  // checking the password and email requirements
  let checkPassPattern = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  );
  // if email or password is invalid send 401 status
  if (checkPassPattern.test(password) == false) {
    res.status(401).send("Invalid password");
    return;
  } else {
    // password hashing
    bcrypt.hash(password, saltRounds, (err, hashGenerated) => {
      if (err) {
        console.log("error while hashing " + err);
      } else {
        // create a user if hashing succesful
        // todo: Add a user only if the email is not already registered
        createNewUser(fullname, email, hashGenerated);
        res.status(200).send("Succesfully registerd");
      }
    });
  }
});

// route to login and verify the user
app.post("/auth/login", (req, res) => {
  // get user details
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
