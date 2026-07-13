import express from "express";
import { createIncident, getAllIncidents , getIncidentById, updateIncident,deleteIncident,getIncidentStats} from "../controllers/incidentController.js";
import {protect,adminOnly} from "../middleware/authMiddleware.js"
import upload from "../middleware/uploadMiddleware.js";
import { validateIncident } from "../validators/incidentValidator.js";

const router  =  express.Router();
router.get("/",getAllIncidents);
router.get("/stats", getIncidentStats);
router.post("/",protect,upload.array("images",4),validateIncident,createIncident);
router.get("/:id",getIncidentById);

router.patch("/:id",protect,adminOnly,updateIncident);
router.delete("/:id",protect,adminOnly,deleteIncident);

export default router;