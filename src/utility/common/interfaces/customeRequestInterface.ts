import { Request } from "express";

interface ICustomLogInRequest extends Request {
    body: {
        emailId: string;
        password: string;
    }
}


export { ICustomLogInRequest };