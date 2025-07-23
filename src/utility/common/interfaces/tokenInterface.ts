import { AdminPermissions } from "@prisma/client";

export interface IMinimalLoginToken {
    id: string;
    email: string;
    role: string;
    superAdminId?: string;
    adminId?: string;
    userId?: string;
    adminPermissions?: AdminPermissions['permissions'];
};