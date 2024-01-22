"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.people = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const routesUtils_1 = require("../utils/routesUtils");
const paramsSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
async function people(app) {
    const prisma = new client_1.PrismaClient();
    // Abstract error handling into a separate function
    // Abstract response sending into a separate function
    app.get('/roles', async (req, res) => {
        await prisma.peopleRoles
            .findMany()
            .then((data) => {
            (0, routesUtils_1.sendResponse)({ data, res, statusCode: 200 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.get('/roles/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        await prisma.peopleRoles
            .findUnique({
            where: {
                id,
            },
        })
            .then((data) => {
            (0, routesUtils_1.sendResponse)({ data, res, statusCode: 200 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.post('/roles', async (req, res) => {
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { name, description } = req.body;
        await prisma.peopleRoles
            .create({
            data: {
                name,
                description,
            },
        })
            .then((data) => {
            (0, routesUtils_1.sendResponse)({ data, res, statusCode: 201 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.put('/roles/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { name, description } = req.body;
        const data = await prisma.peopleRoles
            .update({
            where: {
                id,
            },
            data: {
                name,
                description,
            },
        })
            .then(() => {
            (0, routesUtils_1.sendResponse)({ data, res, statusCode: 200 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.delete('/roles/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        await prisma.peopleRoles
            .delete({
            where: {
                id,
            },
        })
            .then(() => {
            (0, routesUtils_1.sendResponse)({ data: { message: 'Deleted' }, res, statusCode: 200 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.get('/titles', async (req, res) => {
        await prisma.peopleTitles
            .findMany()
            .then((data) => {
            (0, routesUtils_1.sendResponse)({ data, res, statusCode: 200 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.get('/titles/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        await prisma.peopleTitles
            .findUnique({
            where: {
                id,
            },
        })
            .then((data) => {
            (0, routesUtils_1.sendResponse)({ data, res, statusCode: 200 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.post('/titles', async (req, res) => {
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { name } = req.body;
        await prisma.peopleTitles
            .create({
            data: {
                name,
            },
        })
            .then((data) => {
            (0, routesUtils_1.sendResponse)({ data, res, statusCode: 201 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.post('/titles/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { name } = req.body;
        await prisma.peopleTitles
            .update({
            where: {
                id,
            },
            data: {
                name,
            },
        })
            .then((data) => {
            (0, routesUtils_1.sendResponse)({ data, res, statusCode: 200 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.delete('/titles/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        await prisma.peopleTitles
            .delete({
            where: {
                id,
            },
        })
            .then(() => {
            (0, routesUtils_1.sendResponse)({ data: { message: 'Deleted' }, res, statusCode: 200 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.get('/', async (req, res) => {
        await prisma.people
            .findMany({
            select: {
                id: true,
                fullName: true,
                phone1: true,
                phone1IsWhatsapp: true,
                dateOfBirth: true,
                peopleTitles: {
                    select: {
                        name: true,
                    },
                },
                peopleRolesDataFK: {
                    select: {
                        peopleRoles: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        })
            .then((data) => {
            const newData = data.map((item) => ({
                ...item,
                dateOfBirth: item.dateOfBirth ? item.dateOfBirth.toLocaleDateString('pt-BR') : null,
                peopleTitles: item.peopleTitles.name,
            }));
            (0, routesUtils_1.sendResponse)({ data: newData, res, statusCode: 200 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.get('/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        await prisma.people
            .findUnique({
            where: {
                id,
            },
        })
            .then((data) => {
            (0, routesUtils_1.sendResponse)({ data, res, statusCode: 200 });
        })
            .catch((err) => {
            (0, routesUtils_1.handleError)({ err, res });
        });
    });
    app.post('/', async (req, res) => {
        const bodySchema = zod_1.z.object({
            dataType: zod_1.z.string(),
        });
        if (!req.body)
            (0, routesUtils_1.sendResponse)({ data: { message: 'No body provided' }, res, statusCode: 400 });
        const validatedBody = bodySchema.parse(req.body);
        const { dataType } = validatedBody;
        if (dataType === 'getGrid') {
            const selectFields = {
                select: {
                    id: true,
                    fullName: true,
                    titleId: true,
                    rolesId: true,
                    phone1: true,
                    phone1IsWhatsapp: true,
                    dateOfBirth: true,
                },
            };
            await prisma.people
                .findMany(selectFields)
                .then((data) => {
                (0, routesUtils_1.sendResponse)({ data, res, statusCode: 200 });
            })
                .catch((err) => {
                (0, routesUtils_1.handleError)({ err, res });
            });
        }
        else {
            const { fullName, titleIdFK, dateOfBirth, gender, address, complement, city, suburb, uf, cep, phone1, phone1IsWhatsapp, phone2, photoUrl, email, } = req.body;
            await prisma.people
                .create({
                data: {
                    fullName,
                    titleIdFK,
                    dateOfBirth,
                    gender,
                    address,
                    complement,
                    city,
                    suburb,
                    uf,
                    cep,
                    phone1,
                    phone1IsWhatsapp,
                    phone2,
                    photoUrl,
                    email,
                    createdAt: new Date(),
                },
            })
                .then(async (data) => {
                const { rolesId } = req.body;
                rolesId.forEach(async (id) => {
                    await prisma.peopleRolesData.createMany({
                        data: {
                            peopleIdFK: data.id,
                            roleIdFK: id,
                        },
                    });
                });
            })
                .then(() => {
                (0, routesUtils_1.sendResponse)({ data: { message: 'Created' }, res, statusCode: 201 });
            })
                .catch((err) => {
                (0, routesUtils_1.handleError)({ err, res });
            });
        }
    });
    app.put('/:id', async (req, res) => {
        const { id, fullName, titleIdFK, dateOfBirth, gender, address, complement, city, suburb, uf, cep, phone1, phone1IsWhatsapp, phone2, photoUrl, email, } = req.body;
        const data = await prisma.people.update({
            where: {
                id,
            },
            data: {
                fullName,
                titleIdFK,
                dateOfBirth,
                gender,
                address,
                complement,
                city,
                suburb,
                uf,
                cep,
                phone1,
                phone1IsWhatsapp,
                phone2,
                photoUrl,
                email,
            },
        });
        (0, routesUtils_1.sendResponse)({ data, res, statusCode: 200 });
    });
    app.delete('/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        await prisma.people.delete({
            where: {
                id,
            },
        });
        (0, routesUtils_1.sendResponse)({ data: { message: 'Deleted' }, res, statusCode: 200 });
    });
}
exports.people = people;
//# sourceMappingURL=people.js.map