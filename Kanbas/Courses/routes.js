// // import Database from "../Database/index.js";


// import * as dao from "./dao.js";

// export default function CourseRoutes(app) {

//     app.get("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         const course = Database.courses
//             .find((c) => c._id === id);
//         if (!course) {
//             res.status(404).send("Course not found");
//             return;
//         }
//         res.send(course);
//     });


//     app.put("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         const course = req.body;
//         Database.courses = Database.courses.map((c) =>
//             c._id === id ? { ...c, ...course } : c
//         );
//         res.sendStatus(204);
//     });


//     app.delete("/api/courses/:id", (req, res) => {
//         const { id } = req.params;
//         Database.courses = Database.courses
//             .filter((c) => c._id !== id);
//         res.sendStatus(204);
//     });


//     app.post("/api/courses", (req, res) => {
//         const course = {
//             ...req.body,
//             _id: new Date().getTime().toString()
//         };
//         Database.courses.push(course);
//         res.send(course);
//     });

//     app.get("/api/courses", (req, res) => {
//         const courses = Database.courses;
//         res.send(courses);
//     });
// }


// import db from "../Database/index.js";
import * as dao from "./dao.js";

export default function CourseRoutes(app) {

    const findAllCouses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    };

    const findCourseById = async (req, res) => {
        const id = req.params.id;
        const course = await dao.findCourseById(id);
        res.json(course);
    };

    const createCourse = async (req, res) => {
        const newCourse = await dao.createCourse(req.body);
        res.json(newCourse);
    };

    const updateCourse = async (req, res) => {
        const { id } = req.params;
        const status = await dao.updateCourse(id, req.body);
    
        res.json(status);
    };


    const deleteCourse = async (req, res) => {

        const status = await dao.deleteCourse(req.params.id);
        res.json(status);
    };

    app.get("/api/courses", findAllCouses);
    app.get("/api/courses/:id", findCourseById);
    app.post("/api/courses", createCourse);
    app.put("/api/courses/:id", updateCourse);
    app.delete("/api/courses/:id", deleteCourse);
}