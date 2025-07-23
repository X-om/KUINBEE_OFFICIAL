import { Response } from "express";
import { IUnifiedResponse } from "../../utility/common/interfaces/customeResponseInterface";
import { ICustomLogInRequest } from "../../utility/common/interfaces/customeRequestInterface";
import { verifyPassword } from "../../utility/common/security/crypto";
import { prisma } from "../../client/getClient";
import { generateAuthToken } from "../../utility/common/security/jwtUtils";
import { IMinimalLoginToken } from "../../utility/common/interfaces/tokenInterface";

const loginPassword = async (req: ICustomLogInRequest, res: Response<IUnifiedResponse>): Promise<void> => {
    try {
        const { emailId, password } = req.body;
        const user = await prisma.auth.findUnique({ where: { email: emailId }, include: { admin: { include: { permissions: true } } } });

        if (!user) return void res.status(404).json({ success: false, error: 'Invalid email or user not found' });
        console.log("User found:", user.password);
        if (!(await verifyPassword(password, user.password))) return void res.status(401).json({ success: false, error: 'Incorrect password' });

        const jwtPayload = {
            id: user.id, email: user.email, role: user.role,
            ...(user.role === 'ADMIN' && { adminId: user.adminId ?? undefined, adminPermissions: user.admin?.permissions.permissions.map(p => p) ?? [] }),
            ...(user.role === 'SUPERADMIN' && { superAdminId: user.superAdminId ?? undefined }),
            ...(user.role === 'USER' && { userId: user.userId ?? undefined }),
        } satisfies IMinimalLoginToken;

        const token = generateAuthToken(jwtPayload);

        return void res.status(200).json({ success: true, data: { token } });
    } catch (error) {
        return void res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


export { loginPassword };