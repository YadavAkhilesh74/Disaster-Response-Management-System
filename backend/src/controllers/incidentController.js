import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";
import Incident from "../models/incident.js";
import { uploadImages } from "../services/cloudinaryServices.js";
import { getCoordinates } from "../services/geocodingService.js";

export const createIncident = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        type,
        severity,
        location,
    } = req.body;

    const { imageUrls, publicIds } = await uploadImages(req.files);
    const coordinates = await getCoordinates(location);
    try {
        const incident = await Incident.create({
            title,
            description,
            type,
            severity,
            location,
            coordinates: coordinates || null,
            images: imageUrls,
            reportedBy: req.user.userId,
        });
        res.status(201).json({
            success: true,
            message: "Incident reported successfully",
            incident,
        });
    } catch (error) {

        for (const id of publicIds) {
            try {
                await cloudinary.uploader.destroy(id);
            } catch (destroyError) {
                console.error(
                    "Failed to delete Cloudinary image:",
                    destroyError.message
                );
            }
        }

        throw error;
    }
});

export const getAllIncidents = asyncHandler(async (req, res) => {
    const incidents = await Incident.find()
        .populate("reportedBy", "name email")
        .sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        count: incidents.length,
        incidents,
    });
});

export const getIncidentById = asyncHandler(async (req, res) => {
    const incident = await Incident.findById(req.params.id)
    .populate("reportedBy", "name email");

    if (!incident) {
        res.status(404);
        throw new Error("Incident not found");
    }

    res.status(200).json({
        success: true,
        incident,
    });
});

export const updateIncident = asyncHandler(async (req, res) => {
    const { status, severity } = req.body;

    const incident = await Incident.findByIdAndUpdate(
        req.params.id,
        {
            status,
            severity,
        },
        {
            new: true,
        }
    );

    if (!incident) {
        res.status(404);
        throw new Error("Incident not found");
    }

    res.status(200).json({
        success: true,
        message: "Incident updated successfully",
        incident,
    });
});

export const deleteIncident = asyncHandler(async (req, res) => {
    const incident = await Incident.findByIdAndDelete(req.params.id);

    if (!incident) {
        res.status(404);
        throw new Error("Incident not found");
    }

    res.status(200).json({
        success: true,
        message: "Incident deleted successfully",
        incident,
    });
});

export const getIncidentStats = asyncHandler(async (req, res) => {

    const total = await Incident.countDocuments();

    const reported = await Incident.countDocuments({
        status: "reported",
    });

    const inProgress = await Incident.countDocuments({
        status: "in-progress",
    });

    const resolved = await Incident.countDocuments({
        status: "resolved",
    });

    res.status(200).json({
        success: true,
        total,
        reported,
        inProgress,
        resolved,
    });

});