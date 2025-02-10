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
    `https://firestore.googleapis.com/v1/projects/msfassoapp/databases/(default)/documents/backofficeusers`,
    { headers: newHeader }
  )
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
  } else {
    console.log("Auth Failed.");
    res.status(checkAuth.status).send(checkAuth.response);
  }
}

router.post("/backoffice/auth", async (req, res) => {
  const { email, password } = req.body;

  const response: ResponseType = await userDAO.getAuth(email, password);

  console.log("user:", email, " auth ok");

  res.status(response.status).send(response.response);
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

router.all("*", (req, res, next) => {
  res.status(500).send("Something gone wrong...");
});

export default router;
