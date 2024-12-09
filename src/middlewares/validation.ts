import { type Response, type Request, type NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { validationResult, body } from "express-validator";
import createHttpError from "http-errors";

export const validate = (validationName: string): any[] => {
    switch (validationName) {
        case "create:recommendation": {
            return [
                body("userId").exists().bail().withMessage("User id is required"),
                body("preferences")
                    .exists()
                    .bail()
                    .withMessage("Preferences are required")
                    .isArray({ min: 1 })
                    .bail()
                    .withMessage("Minimum one preference is required"),
            ];
        }
        default:
            return [];
    }
};

export const catchError = expressAsyncHandler(
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        const isError = errors.isEmpty();
        if (!isError) {
            const data = { errors: errors.array() };
            throw createHttpError(400, {
                message: "Validation error!",
                data,
            });
        } else {
            next();
        }
    }
);
