"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = exports.handleError = void 0;
function handleError({ err, res }) {
    return res.status(500).send({ message: err.message });
}
exports.handleError = handleError;
function sendResponse({ data, res, statusCode, message }) {
    return res.status(statusCode).send({ data, message });
}
exports.sendResponse = sendResponse;
//# sourceMappingURL=routesUtils.js.map