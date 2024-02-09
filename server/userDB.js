import mongoose from "mongoose";

// database setup

const connectUserDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://divnoorsingh4602:Divnoor@notmyspace.ya7dgto.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connected with database");
  } catch (error) {
    console.log(error);
  }
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
  posts: [
    {
      title: { type: String },
      postContent: { type: String },
      postTime: { type: String },
      likes: { type: Number },
    },
  ],
});

// post schema

// creating a user model
const User = mongoose.model("User", userSchema);

export default User;
