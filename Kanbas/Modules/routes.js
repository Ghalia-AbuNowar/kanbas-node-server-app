

import * as dao from "./dao.js";
export default function ModuleRoutes(app) {


    // app.put("/api/modules/:mid", (req, res) => {
    //     const { mid } = req.params;
    //     const moduleIndex = db.modules.findIndex(
    //         (m) => m._id === mid);
    //     db.modules[moduleIndex] = {
    //         ...db.modules[moduleIndex],
    //         ...req.body
    //     };
    //     res.sendStatus(204);
    // });



    // app.delete("/api/modules/:mid", (req, res) => {
    //     const { mid } = req.params;
    //     db.modules = db.modules.filter((m) => m._id !== mid);
    //     res.sendStatus(200);
    // });


    // app.post("/api/courses/:cid/modules", (req, res) => {
    //     const { cid } = req.params;
    //     const newModule = {
    //         ...req.body,
    //         course: cid,
    //         _id: new Date().getTime().toString(),
    //     };
    //     db.modules.push(newModule);
    //     res.send(newModule);
    // });


    const deleteModule = async (req, res) => {
        const { mid } = req.params;
        const status = await dao.deleteModule(mid);
        res.json(status);
    };

    const CreateModule = async (req, res) => {
        const { cid } = req.params;
        const newModule = await dao.createModule(req.body);
        res.json(newModule);

    }


    const updateModule = async (req, res) => {
        const { mid } = req.params;
        const status = await dao.updateModule(mid, req.body);

        res.json(status);
    };

    const findModulesByCourse = async (req, res) => {
        const { cid } = req.params;
        const modules = await dao.findModuleCourse(cid)
        res.send(modules);
    };

    // const findAllModules = async (req, res) => {
    //     const modules = await dao.findAllModules()
    //     res.send(modules);
    // };


    app.get("/api/courses/:cid/modules", findModulesByCourse),
    app.post("/api/courses/:cid/modules", CreateModule),
    app.delete("/api/modules/:mid", deleteModule);
    app.put("/api/modules/:mid", updateModule);
}