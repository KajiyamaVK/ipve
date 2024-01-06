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
    app.get('/roles', async (req, res) => {
        await prisma.peopleRoles.findMany().then((data) => {
            return res.status(200).send(data);
        });
    });
    app.get('/roles/:id', async (req) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        await prisma.peopleRoles.findUnique({
            where: {
                id,
            },
        });
    });
    app.post('/roles', async (req, res) => {
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { id, name, tailwindColor, description } = req.body;
        console.log('app.post  name', name);
        try {
            prisma.peopleRoles
                .create({
                data: {
                    id,
                    name,
                    tailwindColor,
                    description,
                },
            })
                .then((data) => {
                return res.status(201).send(data);
            });
        }
        catch (err) {
            return res.status(500).send({ message: err });
        }
    });
    app.post('/roles/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { name, tailwindColor, description } = req.body;
        console.log('app.post  name', name);
        try {
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
            return res.status(201).send(data);
        }
        catch (err) {
            return res.status(500).send({ message: err });
        }
    });
    app.delete('/roles/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        console.log('app.delete  id', id);
        console.log('app.get /roles/[id] req.params', req.params);
        try {
            await prisma.peopleRoles.delete({
                where: {
                    id,
                },
            });
            return res.status(200).send({ message: 'Deleted' });
        }
        catch (err) {
            return res.status(500).send({ message: err });
        }
    });
    app.get('/titles', async (req, res) => {
        await prisma.peopleTitles.findMany().then((data) => {
            console.log('Get Titles success', data);
            return res.status(200).send(data);
        });
    });
    app.get('/titles/:id', async (req) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        await prisma.peopleTitles.findUnique({
            where: {
                id,
            },
        });
    });
    app.post('/titles/', async (req, res) => {
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { id, name } = req.body;
        console.log('app.post  name', name);
        try {
            await prisma.peopleTitles
                .create({
                data: {
                    id,
                    name,
                },
            })
                .then((data) => {
                return res.status(201).send(data);
            });
        }
        catch (err) {
            return res.status(500).send({ message: err });
        }
    });
    app.post('/titles/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { name } = req.body;
        console.log('app.post  name', name);
        try {
            const data = await prisma.peopleTitles.update({
                where: {
                    id,
                },
                data: {
                    name,
                },
            });
            return res.status(201).send(data);
        }
        catch (err) {
            return res.status(500).send({ message: err });
        }
    });
    app.delete('/titles/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        console.log('app.delete  id', id);
        console.log('app.get /roles/[id] req.params', req.params);
        try {
            await prisma.peopleTitles.delete({
                where: {
                    id,
                },
            });
            return res.status(200).send({ message: 'Deleted' });
        }
        catch (err) {
            return res.status(500).send({ message: err });
        }
    });
    app.get('/', async (req, res) => {
        await prisma.people
            .findMany()
            .then((data) => {
            return res.status(200).send(data);
        })
            .catch((err) => {
            return res.status(500).send({ message: err });
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
            return res.status(200).send(data);
        })
            .catch((err) => {
            return res.status(500).send({ message: err });
        });
    });
    app.post('/', async (req, res) => {
        if (!req.body)
            return res.status(400).send({ message: 'No body provided' });
        const { id, fullName, titleId, rolesId, dateOfBirth, gender, address, complement, city, suburb, uf, cep, phone1, phone1IsWhatsapp, phone2, photoUrl, email, } = req.body;
        console.log('app.post  name', fullName);
        try {
            await prisma.people
                .create({
                data: {
                    id,
                    fullName,
                    titleId,
                    rolesId,
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
                .then((data) => {
                return res.status(201).send(data);
            });
        }
        catch (err) {
            return res.status(500).send({ message: err });
        }
    });
    app.post('/:id', async (req, res) => {
        const { id, fullName, titleId, rolesId, dateOfBirth, gender, address, complement, city, suburb, uf, cep, phone1, phone1IsWhatsapp, phone2, photoUrl, email, } = req.body;
        try {
            const data = await prisma.people.update({
                where: {
                    id,
                },
                data: {
                    fullName,
                    titleId,
                    rolesId,
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
            return res.status(201).send(data);
        }
        catch (err) {
            return res.status(500).send({ message: err });
        }
    });
    app.delete('/:id', async (req, res) => {
        const params = paramsSchema.parse(req.params);
        const id = parseInt(params.id);
        console.log('app.delete  id', id);
        console.log('app.get /roles/[id] req.params', req.params);
        try {
            await prisma.people.delete({
                where: {
                    id,
                },
            });
            return res.status(200).send({ message: 'Deleted' });
        }
        catch (err) {
            return res.status(500).send({ message: err });
        }
    });
}
exports.people = people;
//# sourceMappingURL=people.js.map