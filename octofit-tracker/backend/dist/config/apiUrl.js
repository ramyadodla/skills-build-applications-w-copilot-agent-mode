"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.apiBaseUrl = void 0;
const PORT = 8000;
exports.PORT = PORT;
const codespaceName = process.env.CODESPACE_NAME;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-${PORT}.app.github.dev`
    : `http://localhost:${PORT}`;
