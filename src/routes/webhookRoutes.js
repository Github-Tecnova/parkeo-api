"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const MY_AUTH_TOKEN = process.env.MY_AUTH_TOKEN;
const CLIENT_AUTH_TOKEN = process.env.CLIENT_AUTH_TOKEN;
router.post("/change", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    // Vérifiez le jeton d'authentification
    if (token !== `Bearer ${MY_AUTH_TOKEN}` &&
        token !== `Bearer ${CLIENT_AUTH_TOKEN}`) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    // Récupérer le payload complet de la requête
    const payload = req.body;
    try {
        // Sauvegarder le payload complet dans la base de données
        const webhookEvent = yield prisma.payload.create({
            data: {
                data: payload,
            },
        });
        res.status(200).json(webhookEvent);
    }
    catch (error) {
        // Affirmer que `error` est de type `Error`
        const errorMessage = error.message;
        res.status(400).json({ error: errorMessage });
    }
}));
exports.default = router;
