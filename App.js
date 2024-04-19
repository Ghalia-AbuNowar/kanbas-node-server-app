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
// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/kanbas'


mongoose.connect( CONNECTION_STRING)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
const app = express();

app.use(
    cors({
        credentials: true,
        origin: [process.env.FRONTEND_URL,  "http://localhost:3000"]
    })
);


app.use(express.json());





  const sessionOptions = {
    secret: "super session secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain:  "https://kanbas-node-server-app-a6-oshm.onrender.com",
    };
  }
  app.use(session(sessionOptions));






UserRoutes(app);

AssignmentsRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Hello(app)
Lab5(app);

app.listen(process.env.PORT || 4000);