import ModuleModel from "./model.js";

export const updateModule = (mid, module) => ModuleModel.updateOne({ _id: mid }, { $set: module });

export const deleteModule = (mid) => ModuleModel.deleteOne({ _id: mid });

export const createModule = (module) => {
    delete module._id
    return ModuleModel.create(module);
}

export const findModuleCourse = (courseId) => ModuleModel.find({ course: courseId });
export const findAllModules = () => ModuleModel.find();


