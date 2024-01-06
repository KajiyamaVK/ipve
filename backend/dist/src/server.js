"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const general_1 = require("./routes/general");
const cookie_1 = __importDefault(require("@fastify/cookie"));
const people_1 = require("./routes/people");
const cors_1 = __importDefault(require("@fastify/cors"));
const app = (0, fastify_1.default)();
app.register(cookie_1.default); // Tem que ser o primeiro register dessa lista
app.register(cors_1.default);
app.register(general_1.generalRoutes);
app.register(people_1.people, {
    prefix: '/people',
});
app
    .listen({
    port: 3001,
})
    .then(() => {
    console.log('Server listening on port 3001');
});
//# sourceMappingURL=server.js.map