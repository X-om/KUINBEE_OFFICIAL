// *################################ CONSTANTS ################################* //
export const roleOptions = ['SUPERADMIN', 'ADMIN', 'USER'] as const;





// *################################ TYPES ################################* //
export type RoleOptions = typeof roleOptions[number];