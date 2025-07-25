import { Response, NextFunction, RequestHandler } from "express";
import { ICustomRequest } from "../../utility/common/interfaces/customeRequestInterface";
import { decodeAuthToken } from "../../utility/common/security/jwtUtils";
import { IMinimalUserToken } from "../../utility/common/interfaces/tokenInterface";

const requireAuth = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const authHeaderToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1].split('|') : null;

        const authToken = authHeaderToken && authHeaderToken[0];
        const identityToken = authHeaderToken && authHeaderToken[1];

        if (!authToken || !identityToken) {
            res.status(401).json({ success: false, error: 'Authentication token is missing or invalid' });
            return;
        }

        const decoded = decodeAuthToken<IMinimalUserToken>(authToken);
        if (!decoded.decodedToken?.user_id) {
            res.status(401).json({ success: false, error: 'Invalid authentication token data' });
            return;
        }

        req.id = decoded.decodedToken.user_id;
        req.authToken = authToken;
        req.role = decoded.decodedToken.role || 'USER';
        req.identityToken = identityToken;

        return next();
    } catch (err) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export default requireAuth;