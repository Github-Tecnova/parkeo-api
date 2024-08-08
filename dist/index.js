"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const webhookRoutes_1 = __importDefault(require("./routes/webhookRoutes"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Route de test pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Bonjour depuis le serveur",
    });
});
// Utiliser le router pour la route webhook
app.use("/", webhookRoutes_1.default);
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
