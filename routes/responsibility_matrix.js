import express from "express";
import {
  
    createResponsibilityMatrix,
    get_All_r_matrix,
    updateResponsibilityMatrix,
    delete_res_matrix,
    SingleMatrix


} from "../controllers/responsibility_matrix.js";

const router = express.Router();

router.post("/", createResponsibilityMatrix);
router.get("/", get_All_r_matrix);
router.get("/:id", SingleMatrix);

router.patch("/:id", updateResponsibilityMatrix);

router.delete("/:id", delete_res_matrix);  

export default router;
