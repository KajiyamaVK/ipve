"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZPeople = exports.ZRoles = void 0;
const zod_1 = require("zod");
exports.ZRoles = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    tailwindColor: zod_1.z.string(),
    description: zod_1.z.string().optional(),
});
const GenderTypeValues = ['m', 'f'];
// Create a Zod schema for the enum
const ZGenderType = zod_1.z.enum(GenderTypeValues);
exports.ZPeople = zod_1.z.object({
    id: zod_1.z.number().optional(),
    fullName: zod_1.z.string({ required_error: 'Nome completo é um campo obrigatório' }).min(1),
    titleIdFK: zod_1.z.number({ required_error: 'Cargo é um campo obrigatório' }).min(1),
    peopleRolesDataFK: zod_1.z.array((0, zod_1.number)()).optional().nullable(),
    dateOfBirth: zod_1.z.date().optional().nullable(),
    gender: ZGenderType,
    address: zod_1.z.string().optional().nullable(),
    complement: zod_1.z.string().optional().nullable(),
    city: zod_1.z.string().optional().nullable(),
    suburb: zod_1.z.string().optional().nullable(),
    uf: zod_1.z.string().optional().nullable(),
    cep: zod_1.z.string().optional().nullable(),
    phone1: zod_1.z.string().optional().nullable(),
    phone1IsWhatsapp: zod_1.z.boolean().default(false),
    phone2: zod_1.z.string().optional().nullable(),
    photoUrl: zod_1.z.string().optional().nullable(),
    email: zod_1.z.string().email().optional().nullable(),
});
//# sourceMappingURL=people.js.map