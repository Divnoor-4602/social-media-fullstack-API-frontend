import mongoose from "mongoose";

// database setup

const connectUserDB = () => {
  mongoose
    .connect(
      "mongodb+srv://divnoorsingh4602:Divnoor@notmyspace.ya7dgto.mongodb.net/?retryWrites=true&w=majority"
    )
    .then("succesfully connected")
    .catch((err) => console.log(err));
};

connectUserDB();

// user database schema
const userSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, required: true, lowercase: true },
  password: {
    type: String,
    required: true,
  },
  posts: { type: Object },
  likes: String,
  comments: String,
});

// post schema

// creating a user model
const User = mongoose.model("User", userSchema);

export default User;
