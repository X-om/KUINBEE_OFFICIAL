import { Response } from "express";
import { Role } from "@prisma/client";
import { prisma } from "../../../client/getPrismaClient";
import { checkAdminConflicts, checkAuthEmailConflict } from "../../../helpers/Superadmin/conflictCheckHelper";
import { createDefaultPassword, hashPassword } from "../../../utility/common/security/crypto";
import { IUnifiedResponse } from "../../../utility/common/interfaces/customeResponseInterface";
import { ICutomeSuperAdminRequest } from "../../../utility/common/interfaces/customeRequestInterface";

const addAdminController = async (req: ICutomeSuperAdminRequest, res: Response<IUnifiedResponse>): Promise<void> => {
    const { personalEmailId, officialEmailId, phNo, alternativePhNo, title, firstName, middleName, lastName, personalInfo, AdminPermissions } = req.body;

    try {
        const [authConflict, adminConflict] = await Promise.all([
            checkAuthEmailConflict({ personalEmailId, officialEmailId }), checkAdminConflicts({ personalEmailId, officialEmailId, phNo }),
        ]);

        if (authConflict) return void res.status(400).json({ success: false, message: `${authConflict.field} already exists with value: ${authConflict.value}`, });
        if (adminConflict) return void res.status(400).json({ success: false, message: `${adminConflict.field} already exists with value: ${adminConflict.value}`, });

        const defaultPassword = createDefaultPassword(firstName);
        const [hashedPassword, createdPersonalInfo] = await Promise.all([hashPassword(defaultPassword), prisma.personalInfo.create({ data: personalInfo, }),]);

        if (!req.id) return void res.status(400).json({ success: false, message: "Missing createdById" });
        const createdAdmin = await prisma.admin.create({
            data: {
                title, firstName, middleName, lastName,
                personalEmailId, officialEmailId, phNo, alternativePhNo,
                createdById: req.id, adminPermissionsId: AdminPermissions.id, personalInfoId: createdPersonalInfo.id,
            },
        });
        const [auth, passwordDetails] = await Promise.all([
            prisma.auth.create({ data: { emailId: officialEmailId, password: hashedPassword, role: Role.ADMIN, adminId: createdAdmin.id, }, }),
            prisma.passwordDetails.create({ data: { userId: createdAdmin.id, password: hashedPassword, updatePasswordTimeStamp: new Date(), }, }),
        ]);
        return void res.status(201).json({ success: true, data: { officialEmailId: createdAdmin.officialEmailId, password: defaultPassword }, });

    } catch (error) {
        return void res.status(500).json({ success: false, error: "Internal server error", });
    }
};

export { addAdminController };
