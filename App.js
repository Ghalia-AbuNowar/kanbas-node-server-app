import "dotenv/config";

import session from "express-session";
import express from 'express';
import Hello from './Hello.js';
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentsRoutes from "./Kanbas/Assignments/routes.js";




import mongoose from "mongoose";
import UserRoutes from "./Kanbas/Users/routes.js";
import cors from "cors";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'


mongoose.connect(CONNECTION_STRING)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);


app.use(express.json());





  const sessionOptions = {
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain:  "kanbas-node-server-app.onrender.com",
    };
  }
  app.use(session(sessionOptions));

// const sessionOptions = {
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true, // Consider this for setting initial session data
//     cookie: {
//         secure: process.env.NODE_ENV === 'production', // Ensure secure is enabled in production
//         sameSite: 'strict'
//     }
// };
// app.use(session(sessionOptions));




UserRoutes(app);

AssignmentsRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Hello(app)
Lab5(app);

app.listen(process.env.PORT || 4000);