import { body, validationResult } from "express-validator";

export const validateIncident = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ min: 5, max: 100 })
        .withMessage("Title must be between 5 and 100 characters."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required.")
        .isLength({ min: 20 })
        .withMessage("Description must be at least 20 characters."),

    body("type")
        .isIn([
            "flood",
            "fire",
            "earthquake",
            "cyclone",
            "landslide",
            "medical",
        ])
        .withMessage("Invalid incident type."),

    body("severity")
        .optional()
        .isIn([
            "minor",
            "moderate",
            "severe",
        ])
        .withMessage("Invalid severity."),

    body("location")
        .trim()
        .notEmpty()
        .withMessage("Location is required."),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
                errors: errors.array(),
            });

        }

        next();

    },

];