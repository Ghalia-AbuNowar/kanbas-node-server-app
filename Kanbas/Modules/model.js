import mongoose from "mongoose";
import moduleSchema from "./schema.js";
const ModuleModel = mongoose.model("moduleModel", moduleSchema);
export default ModuleModel;
