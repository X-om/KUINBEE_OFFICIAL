import { Response } from "express";
import { IUnifiedResponse } from "../../utility/common/interfaces/customeResponseInterface";
import { ICustomLogInRequest } from "../../utility/common/interfaces/customeRequestInterface";

const loginController = async (req: ICustomLogInRequest, res: Response<IUnifiedResponse>): Promise<void> => {
    try {
        const { emailId, password } = req.body;
        

    } catch (error) {
        return void res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


export { loginController };