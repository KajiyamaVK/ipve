"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalRoutes = void 0;
const client_1 = require("@prisma/client");
async function generalRoutes(app) {
    const prisma = new client_1.PrismaClient();
    app.get('/menuScreens', async (req, res) => {
        const result = await prisma.screens.findMany();
        return res.status(200).send(result);
    });
}
exports.generalRoutes = generalRoutes;
//# sourceMappingURL=general.js.map