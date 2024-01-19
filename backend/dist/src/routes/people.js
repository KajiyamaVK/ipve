"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.people = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const paramsSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
async function people(app) {
    const prisma = new client_1.PrismaClient();
    // Abstract error handling into a separate function
    function handleError(err, res) {
        console.error(err);
        return res.status(500).send({ message: err });
    }
    // Abstract response sending into a separate function
    function sendResponse(data, res, statusCode = 200) {
        return res.status(statusCode).send(data);
    }
    app.get('/roles', async (req, res) => {
        await prisma.peopleRoles
            .findMany()
            .then((data) => {
            sendResponse(data, res);
        })
            .catch((err) => {
            handleError(err, res);
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
            sendResponse(data, res);
        })
            .catch((err) => {
            handleError(err, res);
        });
    });
    app.post('/roles', async (req, res) => {
        console.log('req.body', req.body);
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { name, tailwindColor, description } = req.body;
        await prisma.peopleRoles
            .create({
            data: {
                name,
                tailwindColor,
                description,
            },
        })
            .then((data) => {
            sendResponse(data, res, 201);
        })
            .catch((err) => {
            handleError(err, res);
        });
    });
    app.post('/roles/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { name, tailwindColor, description } = req.body;
        const data = await prisma.peopleRoles.update({
            where: {
                id,
            },
            data: {
                name,
                tailwindColor,
                description,
            },
        });
        sendResponse(data, res, 200);
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
            sendResponse({ message: 'Deleted' }, res, 200);
        })
            .catch((err) => {
            handleError(err, res);
        });
    });
    app.get('/titles', async (req, res) => {
        await prisma.peopleTitles
            .findMany()
            .then((data) => {
            sendResponse(data, res);
        })
            .catch((err) => {
            handleError(err, res);
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
            sendResponse(data, res);
        })
            .catch((err) => {
            handleError(err, res);
        });
    });
    app.post('/titles/', async (req, res) => {
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { id, name } = req.body;
        await prisma.peopleTitles
            .create({
            data: {
                id,
                name,
            },
        })
            .then((data) => {
            sendResponse(data, res, 201);
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
            sendResponse(data, res, 200);
        })
            .catch((err) => {
            handleError(err, res);
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
            sendResponse({ message: 'Deleted' }, res, 200);
        })
            .catch((err) => {
            handleError(err, res);
        });
    });
    app.get('/peoplegridHeader', async (req, res) => {
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
                peopleRolesData: {
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
            sendResponse(data, res);
        })
            .catch((err) => {
            handleError(err, res);
        });
    });
    app.get('/', async (req, res) => {
        await prisma.people
            .findMany()
            .then((data) => {
            sendResponse(data, res);
        })
            .catch((err) => {
            handleError(err, res);
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
            sendResponse(data, res);
        })
            .catch((err) => {
            handleError(err, res);
        });
    });
    app.post('/', async (req, res) => {
        const bodySchema = zod_1.z.object({
            dataType: zod_1.z.string(),
        });
        if (!req.body)
            sendResponse({ message: 'No body provided' }, res, 400);
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
                sendResponse(data, res);
            })
                .catch((err) => {
                handleError(err, res);
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
                sendResponse({ message: 'Created' }, res, 201);
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
        sendResponse(data, res, 200);
    });
    app.delete('/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        await prisma.people.delete({
            where: {
                id,
            },
        });
        sendResponse({ message: 'Deleted' }, res, 200);
    });
}
exports.people = people;
//# sourceMappingURL=people.js.map