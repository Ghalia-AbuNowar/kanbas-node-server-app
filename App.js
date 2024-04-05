import express from 'express';
import Hello from './Hello.js';
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentsRoutes from "./Kanbas/Assignments/routes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

AssignmentsRoutes(app)
ModuleRoutes(app);
CourseRoutes(app);
Hello(app)
Lab5(app);

app.listen(process.env.PORT || 4000);