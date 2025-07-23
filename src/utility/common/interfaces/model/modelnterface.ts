import { Prisma } from "@prisma/client";


export type FullAuthModel = Prisma.AuthGetPayload<{ include: Prisma.AuthInclude }>;
export type AuthModel = Prisma.AuthGetPayload<{}>;
export type PasswordModel = Prisma.PasswordDetailsGetPayload<{}>;
export type FullAdminPermissions = Prisma.AdminPermissionsGetPayload<{}>;



export interface IAuthModel extends Omit<FullAuthModel, 'password'> { };
export interface IPasswordModel extends PasswordModel { };
export interface IFullAdminPermissions extends FullAdminPermissions { };