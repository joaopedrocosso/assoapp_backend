import express, { NextFunction, Request, Response } from "express";
import { UserDAO } from "../domain/daos/UserDAO";
import { database } from "../infraestructure/database/firebase";
import { ResponseType } from "../domain/types/ResponseType";

const router = express.Router();

const userDAO = new UserDAO(database);

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let authResponse: ResponseType = { status: 500, response: [] };
  const { accessKey } = req.query;
  let newHeader = new Headers({
    Authorization: `Bearer ${accessKey}`,
  });
  
  let checkAuth = await fetch(
    `https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/backofficeusers`,
    { headers: newHeader }
  )
    .then((response) => {
      console.log("Auth Response:", response.status);
      authResponse.status = response.status;
      authResponse.response.push(response);
      return authResponse;
    })
    .catch((error) => {
      console.error("Auth Error:", error);
      authResponse.status = 400;
      authResponse.response.push(error);
      return authResponse;
    });

  if (checkAuth.status == 200) {
    console.log("Auth OK.");
    next();
  } else {
    console.log("Auth Failed.");
    res.status(checkAuth.status).json({
      error: "Authentication failed",
      details: checkAuth.response
    });
  }
}

router.post("/backoffice/auth", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Email and password are required"
      });
    }

    const response: ResponseType = await userDAO.getAuth(email, password);
    console.log("user:", email, " auth attempt");

    res.status(response.status).json(response.response);
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Authentication failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

router.get("/backoffice/getuserinfo/all", authMiddleware, async (req, res) => {
  const response = await userDAO.getUserAll();

  console.log(response.response);

  res.status(response.status).send(response.response);
});

router.get("/backoffice/getuserinfo/:uid", authMiddleware, async (req, res) => {
  const uid = req.params.uid;
  const response = await userDAO.getUserInfo(uid);

  res.status(response.status).send(response.response);
});

export default router;
