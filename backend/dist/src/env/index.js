"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string(),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    throw new Error('Variáveis de ambiente não definidas ou incorretas.');
}
exports.env = _env.data;
//# sourceMappingURL=index.js.map