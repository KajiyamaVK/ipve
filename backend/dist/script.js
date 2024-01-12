"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// script to select all screens
async function main() {
    const screens = await prisma.screens.findMany();
    console.log(screens);
}
main()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
});
//# sourceMappingURL=script.js.map