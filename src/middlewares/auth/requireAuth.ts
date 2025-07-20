import { Response, Request, NextFunction } from "express";

// TODO: OM need to add more exact type for request ( create custome request interface )
export interface ICustomRequest extends Request {
    user_id?: string; authToken?: string; // this is just and example
}
const requireAuth = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        req.user_id = '123';
        return next();
    } catch (err) {
        // need to add handlecatch function here
        res.status(500).json({ error: 'something went wrong' });
    }
};

export { requireAuth };