import { Prisma } from "@prisma/client";
import { IAdmin } from "./model/modelnterface";
import { AdminPermissionOptions } from "../../../constants/modelConstants";

export type AdminBaseInput = Omit<IAdmin, "createdBy" | "personalInfo" | "permissions" | "Auth" | "createdAt" | "personalInfoId" | "adminPermissionsId">
export type PersonalInfoInput = Omit<Prisma.PersonalInfoCreateInput, "id" | "Admin" | "SuperAdmin">;

export interface ICustomAddAdmin extends AdminBaseInput {
    personalInfo: PersonalInfoInput;
    permissions: AdminPermissionOptions[];
}
