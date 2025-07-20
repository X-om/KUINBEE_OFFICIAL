import { Request, Response, NextFunction } from 'express';
// TODO : OM need to create admin specific auth middleware here ICuromeAdminRequest here
// TODO : OM need to create admin cutome reque
const requireAdminAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        return next();
    } catch (error) {
        console.error("need to add handlecatch function here", error);
    }
}


export { requireAdminAuth };