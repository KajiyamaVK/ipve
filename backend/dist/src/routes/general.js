"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalRoutes = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const getBaseData = zod_1.z.object({
    typeOfData: zod_1.z.enum(['screens', 'churchBranches']),
});
async function generalRoutes(app) {
    const prisma = new client_1.PrismaClient();
    app.post('/', async (req, res) => {
        let body;
        try {
            body = getBaseData.parse(req.body);
        }
        catch (err) {
            res.status(500).send({ message: `Zod Parse: ${err}` });
        }
        if (body) {
            let data;
            try {
                switch (body.typeOfData) {
                    case 'screens':
                        data = await prisma.screens.findMany();
                        break;
                    case 'churchBranches':
                        data = await prisma.churchBranches.findMany();
                        break;
                    default:
                        res.status(500).send({ message: 'Invalid typeOfData' });
                        break;
                }
                res.status(200).send({ data });
            }
            catch (err) {
                res.status(500).send({ message: `Erro ao rodar o Prisma: ${err}` });
            }
        }
    });
}
exports.generalRoutes = generalRoutes;
//# sourceMappingURL=general.js.map