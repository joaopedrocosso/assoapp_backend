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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const UserDAO_1 = require("../domain/daos/UserDAO");
const firebase_1 = require("../infraestructure/database/firebase");
const router = express_1.default.Router();
const userDAO = new UserDAO_1.UserDAO(firebase_1.database);
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let authResponse = { status: 500, response: [] };
        const { accessKey } = req.query;
        let newHeader = new Headers({
            Authorization: `Bearer ${accessKey}`,
        });
        let checkAuth = yield fetch(`https://firestore.googleapis.com/v1/projects/msfassoapp/databases/(default)/documents/backofficeusers`, { headers: newHeader })
            .then((response) => {
            console.log(response);
            authResponse.status = response.status;
            authResponse.response.push(response);
            return authResponse;
        })
            .catch((error) => {
            console.error(error);
            authResponse.status = 400;
            authResponse.response.push(error);
            return authResponse;
        });
        if (checkAuth.status == 200) {
            console.log("Auth OK.");
            next();
        }
        else {
            console.log("Auth Failed.");
            res.status(checkAuth.status).send(checkAuth.response);
        }
    });
}
exports.authMiddleware = authMiddleware;
router.post("/backoffice/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const response = yield userDAO.getAuth(email, password);
    console.log("user:", email, " auth ok");
    res.status(response.status).send(response.response);
}));
router.get("/backoffice/getuserinfo/all", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield userDAO.getUserAll();
    console.log(response.response);
    res.status(response.status).send(response.response);
}));
router.get("/backoffice/getuserinfo/:uid", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.uid;
    const response = yield userDAO.getUserInfo(uid);
    res.status(response.status).send(response.response);
}));
router.all("*", (req, res, next) => {
    res.status(500).send("Something gone wrong...");
});
exports.default = router;
