import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./db/connect.js";
import asyncHandler from "express-async-handler";
import fs from "fs";
import User from "./models/UserModel.js";
import { log } from "console";
dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://jobcamr-66zm1pst8-cnator5s-projects.vercel.app"
];

// Remove the auth configuration
const config = {
  // ...existing code...
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Remove the auth middleware
// app.use(auth(config));

// function to check if user exists in the db
const enusureUserInDB = asyncHandler(async (user) => {
  try {
    const existingUser = await User.findOne({ auth0Id: user.sub });

    if (!existingUser) {
      // create a new user document
      const newUser = new User({
        auth0Id: user.sub,
        email: user.email,
        name: user.name,
        role: "jobseeker",
        profilePicture: user.picture,
      });

      await newUser.save();

      console.log("User added to db", user);
    } else {
      console.log("User already exists in db", existingUser);
    }
  } catch (error) {
    console.log("Error checking or adding user to db", error.message);
  }
});

app.get("/", async (req, res) => {
  // Remove authentication check
  // if (req.oidc.isAuthenticated()) {
  //   // check if Auth0 user exists in the db
  //   await enusureUserInDB(req.oidc.user);

  //   // redirect to the frontend
  //   return res.redirect(process.env.CLIENT_URL);
  // } else {
  //   return res.send("Logged out");
  // }
  return res.send("Welcome to JobCamr");
});

app.get("/check-auth", (req, res) => {
  // Remove authentication check
  // if (req.oidc.isAuthenticated()) {
  //   res.json({ authenticated: true, user: req.oidc.user });
  // } else {
  //   res.json({ authenticated: false });
  // }
  res.json({ authenticated: false });
});

// Add error handling for the /api/v1/jobs route
app.get("/api/v1/jobs", async (req, res) => {
  try {
    // Your logic to fetch jobs
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// routes
const routeFiles = fs.readdirSync("./routes");

routeFiles.forEach((file) => {
  // import dynamic routes
  import(`./routes/${file}`)
    .then((route) => {
      app.use("/api/v1/", route.default);
    })
    .catch((error) => {
      console.log("Error importing route", error);
    });
});

const server = async () => {
  try {
    await connect();

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
};

server();