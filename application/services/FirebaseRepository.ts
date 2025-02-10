import { FirebaseApp } from "firebase/app";
import { Firestore, WhereFilterOp, getFirestore } from "firebase/firestore";
import {
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ResponseType } from "../../domain/types/ResponseType";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export class FirebaseRepository {
  private app: FirebaseApp;
  private db: Firestore;
  private auth: Auth;

  constructor(app: FirebaseApp, db: Firestore) {
    this.app = app;
    this.db = db;

    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);

    // Add a new document with a generated id.
  }

  public async create(
    dataBaseCollection: string,
    objToBeCreated: any
  ): Promise<ResponseType> {
    const createReponse: ResponseType = { status: 400, response: [] };
    console.log("Creating a item on firebase.");
    const docRef: any = async (
      dataBaseCollection: string,
      objToBeCreated: any
    ) => {
      try {
        const docCreatedRef = await addDoc(
          collection(this.db, dataBaseCollection),
          objToBeCreated
        );
        const createdItem = await this.read(
          dataBaseCollection,
          docCreatedRef.id
        );
        createReponse.response.push(createdItem);
        console.log("Item created successfully.");
        createReponse.status = 200;
        return createReponse;
      } catch (err) {
        console.log(`Something gone wrong: \n${err}`);
        return createReponse;
      }
    };
    return docRef(dataBaseCollection, objToBeCreated);
  }

  public async update(
    dataBaseCollection: string,
    objIdToBeUpdated: string,
    objToBeUpdated: any
  ): Promise<ResponseType> {
    const updateReponse: ResponseType = { status: 400, response: [] };
    console.log("Updating a item on firebase.");
    const docRef: any = async (
      dataBaseCollection: string,
      objToBeUpdated: any
    ) => {
      try {
        const objRef = doc(this.db, dataBaseCollection, objIdToBeUpdated);

        const docUpdatedRef = await updateDoc(objRef, objToBeUpdated);
        const updatedItem = await this.read(dataBaseCollection, objRef.id);
        updateReponse.response.push(updatedItem);
        updateReponse.status = 200;
        console.log("Item has been updated successfully.");
        return updateReponse;
      } catch (err) {
        console.log(`Something gone wrong: \n${err}`);
        updateReponse.response.push(err);
        return updateReponse;
      }
    };
    return docRef(dataBaseCollection, objToBeUpdated);
  }

  public async delete(
    dataBaseCollection: string,
    objIdToBeDeleted: string
  ): Promise<ResponseType> {
    const deleteReponse: ResponseType = { status: 400, response: [] };
    console.log("Deleting a item on firebase.");
    const docRef: any = async (
      dataBaseCollection: string,
      objIdToBeDeleted: any
    ) => {
      try {
        const docDeletedRef = await deleteDoc(
          doc(this.db, dataBaseCollection, objIdToBeDeleted)
        );
        const deletedItem = await this.read(
          dataBaseCollection,
          objIdToBeDeleted
        );
        deleteReponse.status = 200;
        deleteReponse.response.push(deletedItem);
        console.log("Item has been deleted successfully.");
        return deleteReponse;
      } catch (err) {
        console.log(`Something gone wrong: \n${err}`);
        deleteReponse.response.push(err);
        return deleteReponse;
      }
    };
    return docRef(dataBaseCollection, objIdToBeDeleted);
  }

  public async read(
    dataBaseCollection: string,
    objIdToBeRead: string
  ): Promise<ResponseType> {
    const readReponse: ResponseType = { status: 400, response: [] };
    console.log("Reading a item on firebase.");
    const docRef: any = async (
      dataBaseCollection: string,
      objIdToBeRead: any
    ) => {
      try {
        const docReadRef = doc(this.db, dataBaseCollection, objIdToBeRead);
        const docSnap = await getDoc(docReadRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          readReponse.status = 200;
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          readReponse.status = 404;
        }
        readReponse.response.push({ id: docSnap.id, data: docSnap.data() });
        console.log("Item has been readed successfully.");
        return readReponse;
      } catch (err) {
        console.log(`Something gone wrong: \n${err}`);
        readReponse.response.push(err);
        return readReponse;
      }
    };
    return docRef(dataBaseCollection, objIdToBeRead);
  }

  public async readAll(dataBaseCollection: string): Promise<ResponseType> {
    const readAllReponse: ResponseType = { status: 400, response: [] };
    console.log("Reading a collection on firebase.");
    const docRef: any = async (dataBaseCollection: string) => {
      try {
        const q = query(collection(this.db, dataBaseCollection));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          readAllReponse.response.push({ id: doc.id, data: doc.data() });
          console.log(doc.id, " => ", doc.data());
        });

        console.log("Collection has been readed successfully.");
        readAllReponse.status = 200;
        return readAllReponse;
      } catch (err) {
        console.log(`Something gone wrong: \n${err}`);
        readAllReponse.response.push(err);
        return readAllReponse;
      }
    };
    return docRef(dataBaseCollection);
  }

  public async readWithQuery(
    collectionInputed: string,
    parameterInputed: string,
    stringOperatorInputed: string,
    valueInputed: string
  ) {
    const readWithQueryReponse: ResponseType = { status: 400, response: [] };
    try {
      const q = query(
        collection(this.db, collectionInputed),
        where(
          parameterInputed,
          stringOperatorInputed as WhereFilterOp,
          valueInputed
        )
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        readWithQueryReponse.response.push({ id: doc.id, data: doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      console.log("Collection has been readed with query successfully.");
      readWithQueryReponse.status = 200;
      return readWithQueryReponse;
    } catch (err) {
      console.log(`Something gone wrong: \n${err}`);
      readWithQueryReponse.response.push(err);
      return readWithQueryReponse;
    }
  }

  public async uploadFile(
    referencePath: string,
    referenceName: string,
    originalName: string,
    file: Express.Multer.File
  ) {
    const uploadFileReponse: ResponseType = { status: 400, response: [] };
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `${referencePath}/${referenceName}-${originalName}`
    );

    try {
      // 'file' comes from the Blob or File API
      const result = await uploadBytes(
        storageRef,
        file.buffer as unknown as File
      ).then(async (snapshot) => {
        console.log("Uploaded a blob or file!");
        let urlOfProfilePhoto = await getDownloadURL(storageRef).then(
          (url) => url
        );

        uploadFileReponse.status = 200;
        return urlOfProfilePhoto;
      });
      uploadFileReponse.response.push(result);
      console.log(uploadFileReponse);
      return uploadFileReponse;
    } catch (err) {
      console.log(`Something gone wrong: \n${err}`);
      uploadFileReponse.response.push(err);
      return uploadFileReponse;
    }
  }

  public async getAuth(email: string, password: string): Promise<ResponseType> {
    const getAuthReponse: ResponseType = { status: 400, response: [] };
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        getAuthReponse.status = 200;
        getAuthReponse.response.push(user);
        return getAuthReponse;
        // ...
      })
      .catch((error) => {
        console.log(error);
        getAuthReponse.status = 400;
        getAuthReponse.response.push(error);
        return getAuthReponse;
      });
    return getAuthReponse;
  }

  /*   public async verifyIdToken(idToken: string): Promise<ResponseType> {
    getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        // ...
      })
      .catch((error) => {
        // Handle error
      });
  } */
}
