import { ICutomeSuperAdminRequest } from "../../utility/common/interfaces/customeRequestInterface";
import { IUnifiedResponse } from "../../utility/common/interfaces/customeResponseInterface";
import { NextFunction, Response } from "express";
import { emailInputValidation } from "../../validations/inputValidation";
import { adminPersonalInfoValidation } from "../../validations/personalInfoValidation";
import { ProjectionArray } from "../../utility/projectionTypes";
import { ICustomAddAdmin } from "../../utility/common/interfaces/customeInterfaces";

export const handleAddAdminValidation = async (req: ICutomeSuperAdminRequest, res: Response<IUnifiedResponse>, next: NextFunction) => {
    const adminData: ICustomAddAdmin = req.body;
    const requiredFieldsAdminData = ["title", "firstName", "lastName", "personalEmailId", "officialEmailId", "phNo", "createdById", 'personalInfo'] as const satisfies ProjectionArray<ICustomAddAdmin>
    for (const field of requiredFieldsAdminData) {
        if (!adminData[field as keyof typeof adminData]) return res.status(400).json({ success: false, error: `${field} is required.` });
    }

    if (!emailInputValidation(adminData.personalEmailId)) return res.status(400).json({ success: false, error: "Invalid personal email format." });
    if (!emailInputValidation(adminData.officialEmailId)) return res.status(400).json({ success: false, error: "Invalid official email format." });

    const personalInfoError = adminPersonalInfoValidation(adminData.personalInfo);
    if (personalInfoError) return res.status(400).json({ success: false, error: `${personalInfoError} is required.` });

    return next();
};
