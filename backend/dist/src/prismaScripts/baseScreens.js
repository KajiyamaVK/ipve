"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.screens.createMany({
        data: [
            {
                id: 1,
                name: 'dashboard',
                displayName: 'Dashboard',
                menuLabel: 'Dashboard',
                type: 'normal',
                order: 1,
                icon: '<Gauge size={32} />',
            },
            {
                id: 2,
                name: 'register',
                displayName: 'Cadastros',
                menuLabel: 'Cadastros',
                type: 'parent',
                order: 2,
                icon: '<Keyboard size={32} />',
            },
            {
                id: 3,
                name: 'people',
                displayName: 'Cadastro de Pessoas',
                menuLabel: 'Pessoas',
                type: 'child',
                order: 1,
                formType: 'page',
                parentId: 2,
            },
            {
                id: 4,
                name: 'member_titles',
                displayName: 'Cadastro de Cargos',
                menuLabel: 'Cargos',
                type: 'child',
                order: 2,
                formType: 'dialog',
                parentId: 2,
            },
            {
                id: 5,
                name: 'roles',
                displayName: 'Cadastro de Funções',
                menuLabel: 'Funções',
                type: 'child',
                order: 3,
                formType: 'dialog',
                parentId: 2,
            },
        ],
    });
}
main()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=baseScreens.js.map