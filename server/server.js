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
app.use(cors());

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
app.post("/auth/register", async (req, res) => {
  const email = req.body.email;
  const fullname = req.body.fullname;
  const password = req.body.password;

  // checking the password and email requirements
  let checkPassPattern = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  );
  // if email or password is invalid send 401 status
  if (checkPassPattern.test(password) == false) {
    res.status(400).send("Invalid password");
    return;
  } else {
    // password hashing
    bcrypt.hash(password, saltRounds, async (err, hashGenerated) => {
      if (err) {
        console.log("error while hashing " + err);
      } else {
        // create a user if hashing succesful
        const userExists = await User.find({ email: email });
        if (userExists.length === 0) {
          createNewUser(fullname, email, hashGenerated);
          res.sendStatus(200);
          return;
        } else {
          res.sendStatus(404);
          return;
        }
      }
    });
  }
});

// route to login and verify the user
app.post("/auth/login", async (req, res) => {
  // get user details
  const emailToVerify = req.body.email;
  const passwordToVerify = req.body.password;
  // fetch the user using email
  const user = await User.findOne({ email: emailToVerify });
  if (user != null) {
    // compare the password to the hash in the database
    bcrypt.compare(passwordToVerify, user.password, (error, result) => {
      if (error) {
        console.log(error);
        // invalid password
        res.sendStatus(400);
        return;
      } else {
        if (result) {
          // valid credentials login succesful
          res.status(200).send({ name: user.fullname });
          return;
        } else {
          // invalid password
          res.status(400).send("Invalid password");
          return;
        }
      }
    });
  } else {
    // invalid email
    res.sendStatus(404);
    return;
  }
});

// route to update password
app.post("/auth/forget", (req, res) => {
  // todo: get the user by email and update their password, in the form or through sending a gmail
});

// Social Media Posts

// fetch all posts
app.get("/posts/all", async (req, res) => {
  let totalPosts = [];
  try {
    const allUserPosts = await User.find({});
    // creating a post object to render

    for (const user of allUserPosts) {
      if (user.posts != undefined) {
        for (const post of user.posts) {
          totalPosts.push({
            authorName: user.fullname,
            authorEmail: user.email,
            postTitle: post.title,
            postContent: post.postContent,
            postTime: post.postTime,
            likes: post.likes,
          });
        }
      } else {
        console.log("no posts exist");
        res.status(300);
        return;
      }
    }

    res.status(200).json(totalPosts);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
});

// create a post
app.post("/posts/create", async (req, res) => {
  let postsToAdd;
  const title = req.body.postTitle;
  const content = req.body.postContent;
  const emailToUpdate = req.body.email;
  const postUploadTime = req.body.postTime;
  console.log(
    title + " " + content + " " + emailToUpdate + " " + postUploadTime
  );

  // fetching posts of the current user
  let user = await User.findOne({ email: emailToUpdate });
  // check if the user have any prior posts
  if (user.posts == undefined) {
    postsToAdd = [];
  } else {
    postsToAdd = [...user.posts];
  }
  postsToAdd.push({
    title: title,
    postContent: content,
    postTime: postUploadTime,
    likes: 0,
  });
  //  finding the user and updating the posts
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: emailToUpdate },
      { posts: postsToAdd },
      { new: true }
    );
    console.log(updatedUser);
    // successfully posted
    res.status(200).send();
  } catch (error) {
    // error while posting
    res.status(300).send();
    console.log(error);
  }
});

// delete a post
app.post("/posts/remove", async (req, res) => {
  const postTitle = req.body.postName;
  const postContent = req.body.postText;
  const postAuthor = req.body.postAuthorEmail;

  // finding the post
  try {
    const postWriter = await User.findOne({ email: postAuthor });

    let updatedPost = Array.from(postWriter.posts);
    try {
      for (let i = 0; i < Array.from(postWriter.posts).length; i++) {
        if (updatedPost[i].title == postTitle) {
          updatedPost.postContent = postContent;
          break;
        }
      }

      const updatePost = updatedPost.filter((post) => post.title != postTitle);
      console.log("updated post" + updatePost);

      // inserting the update document back
      const updatedUser = await User.findOneAndUpdate(
        { email: postAuthor },
        { posts: updatePost },
        { new: true }
      );
      console.log(updatedUser);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

// specific user posts
app.post("/posts/personal", async (req, res) => {
  const emailToFind = req.body.email;
  console.log(emailToFind);
  let totalPosts = [];
  try {
    const allUserPosts = await User.findOne({ email: emailToFind });
    console.log(allUserPosts);
    // creating a post object to render

    if (allUserPosts != null) {
      for (const post of allUserPosts.posts) {
        totalPosts.push({
          authorName: allUserPosts.fullname,
          authorEmail: allUserPosts.email,
          postTitle: post.title,
          postContent: post.postContent,
          postTime: post.postTime,
          likes: post.likes,
        });
      }
    } else {
      console.log("no posts exist");
      res.status(300);
      return;
    }

    res.status(200).json(totalPosts);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
});

// edit posts
app.put("/posts/edit", async (req, res) => {
  const postTitle = req.body.postName;
  const postContent = req.body.postText;
  const postAuthor = req.body.postAuthorEmail;

  // finding the post
  try {
    const postWriter = await User.findOne({ email: postAuthor });

    let updatedPost = Array.from(postWriter.posts);
    try {
      for (let i = 0; i < Array.from(postWriter.posts).length; i++) {
        if (updatedPost[i].title == postTitle) {
          updatedPost[i].postContent = postContent;
          break;
        }
      }

      // inserting the update document back
      const updatedUser = await User.findOneAndUpdate(
        { email: postAuthor },
        { posts: updatedPost },
        { new: true }
      );
      console.log(updatedUser);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

// likes & comments

// like updating
app.put("/posts/likes", async (req, res) => {
  const postTitle = req.body.postName;
  const likeCount = req.body.likes;
  const postAuthor = req.body.postAuthorEmail;

  // finding the post
  try {
    const postWriter = await User.findOne({ email: postAuthor });
    let updatedLikesPost = Array.from(postWriter.posts);
    try {
      for (let i = 0; i < Array.from(postWriter.posts).length; i++) {
        if (updatedLikesPost[i].title == postTitle) {
          updatedLikesPost[i].likes = likeCount;
          break;
        }
      }

      // inserting the update document back
      const updatedUser = await User.findOneAndUpdate(
        { email: postAuthor },
        { posts: updatedLikesPost },
        { new: true }
      );
      console.log(updatedUser);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
