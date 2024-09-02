export const roles = ['ADMIN', 'USER'] as const;

export type ROLE = (typeof roles)[number];
