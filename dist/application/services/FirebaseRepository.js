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
exports.FirebaseRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firestore_2 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
const auth_1 = require("firebase/auth");
class FirebaseRepository {
    constructor(app, db) {
        this.app = app;
        this.db = db;
        this.db = (0, firestore_1.getFirestore)(this.app);
        this.auth = (0, auth_1.getAuth)(this.app);
        // Add a new document with a generated id.
    }
    create(dataBaseCollection, objToBeCreated) {
        return __awaiter(this, void 0, void 0, function* () {
            const createReponse = { status: 400, response: [] };
            console.log("Creating a item on firebase.");
            const docRef = (dataBaseCollection, objToBeCreated) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const docCreatedRef = yield (0, firestore_2.addDoc)((0, firestore_2.collection)(this.db, dataBaseCollection), objToBeCreated);
                    const createdItem = yield this.read(dataBaseCollection, docCreatedRef.id);
                    createReponse.response.push(createdItem);
                    console.log("Item created successfully.");
                    createReponse.status = 200;
                    return createReponse;
                }
                catch (err) {
                    console.log(`Something gone wrong: \n${err}`);
                    return createReponse;
                }
            });
            return docRef(dataBaseCollection, objToBeCreated);
        });
    }
    update(dataBaseCollection, objIdToBeUpdated, objToBeUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateReponse = { status: 400, response: [] };
            console.log("Updating a item on firebase.");
            const docRef = (dataBaseCollection, objToBeUpdated) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const objRef = (0, firestore_2.doc)(this.db, dataBaseCollection, objIdToBeUpdated);
                    const docUpdatedRef = yield (0, firestore_2.updateDoc)(objRef, objToBeUpdated);
                    const updatedItem = yield this.read(dataBaseCollection, objRef.id);
                    updateReponse.response.push(updatedItem);
                    updateReponse.status = 200;
                    console.log("Item has been updated successfully.");
                    return updateReponse;
                }
                catch (err) {
                    console.log(`Something gone wrong: \n${err}`);
                    updateReponse.response.push(err);
                    return updateReponse;
                }
            });
            return docRef(dataBaseCollection, objToBeUpdated);
        });
    }
    delete(dataBaseCollection, objIdToBeDeleted) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteReponse = { status: 400, response: [] };
            console.log("Deleting a item on firebase.");
            const docRef = (dataBaseCollection, objIdToBeDeleted) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const docDeletedRef = yield (0, firestore_2.deleteDoc)((0, firestore_2.doc)(this.db, dataBaseCollection, objIdToBeDeleted));
                    const deletedItem = yield this.read(dataBaseCollection, objIdToBeDeleted);
                    deleteReponse.status = 200;
                    deleteReponse.response.push(deletedItem);
                    console.log("Item has been deleted successfully.");
                    return deleteReponse;
                }
                catch (err) {
                    console.log(`Something gone wrong: \n${err}`);
                    deleteReponse.response.push(err);
                    return deleteReponse;
                }
            });
            return docRef(dataBaseCollection, objIdToBeDeleted);
        });
    }
    read(dataBaseCollection, objIdToBeRead) {
        return __awaiter(this, void 0, void 0, function* () {
            const readReponse = { status: 400, response: [] };
            console.log("Reading a item on firebase.");
            const docRef = (dataBaseCollection, objIdToBeRead) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const docReadRef = (0, firestore_2.doc)(this.db, dataBaseCollection, objIdToBeRead);
                    const docSnap = yield (0, firestore_2.getDoc)(docReadRef);
                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        readReponse.status = 200;
                    }
                    else {
                        // docSnap.data() will be undefined in this case
                        console.log("No such document!");
                        readReponse.status = 404;
                    }
                    readReponse.response.push({ id: docSnap.id, data: docSnap.data() });
                    console.log("Item has been readed successfully.");
                    return readReponse;
                }
                catch (err) {
                    console.log(`Something gone wrong: \n${err}`);
                    readReponse.response.push(err);
                    return readReponse;
                }
            });
            return docRef(dataBaseCollection, objIdToBeRead);
        });
    }
    readAll(dataBaseCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            const readAllReponse = { status: 400, response: [] };
            console.log("Reading a collection on firebase.");
            const docRef = (dataBaseCollection) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const q = (0, firestore_2.query)((0, firestore_2.collection)(this.db, dataBaseCollection));
                    const querySnapshot = yield (0, firestore_2.getDocs)(q);
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        readAllReponse.response.push({ id: doc.id, data: doc.data() });
                        console.log(doc.id, " => ", doc.data());
                    });
                    console.log("Collection has been readed successfully.");
                    readAllReponse.status = 200;
                    return readAllReponse;
                }
                catch (err) {
                    console.log(`Something gone wrong: \n${err}`);
                    readAllReponse.response.push(err);
                    return readAllReponse;
                }
            });
            return docRef(dataBaseCollection);
        });
    }
    readWithQuery(collectionInputed, parameterInputed, stringOperatorInputed, valueInputed) {
        return __awaiter(this, void 0, void 0, function* () {
            const readWithQueryReponse = { status: 400, response: [] };
            try {
                const q = (0, firestore_2.query)((0, firestore_2.collection)(this.db, collectionInputed), (0, firestore_2.where)(parameterInputed, stringOperatorInputed, valueInputed));
                const querySnapshot = yield (0, firestore_2.getDocs)(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    readWithQueryReponse.response.push({ id: doc.id, data: doc.data() });
                    console.log(doc.id, " => ", doc.data());
                });
                console.log("Collection has been readed with query successfully.");
                readWithQueryReponse.status = 200;
                return readWithQueryReponse;
            }
            catch (err) {
                console.log(`Something gone wrong: \n${err}`);
                readWithQueryReponse.response.push(err);
                return readWithQueryReponse;
            }
        });
    }
    uploadFile(referencePath, referenceName, originalName, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadFileReponse = { status: 400, response: [] };
            const storage = (0, storage_1.getStorage)();
            const storageRef = (0, storage_1.ref)(storage, `${referencePath}/${referenceName}-${originalName}`);
            try {
                // 'file' comes from the Blob or File API
                const result = yield (0, storage_1.uploadBytes)(storageRef, file.buffer).then((snapshot) => __awaiter(this, void 0, void 0, function* () {
                    console.log("Uploaded a blob or file!");
                    let urlOfProfilePhoto = yield (0, storage_1.getDownloadURL)(storageRef).then((url) => url);
                    uploadFileReponse.status = 200;
                    return urlOfProfilePhoto;
                }));
                uploadFileReponse.response.push(result);
                console.log(uploadFileReponse);
                return uploadFileReponse;
            }
            catch (err) {
                console.log(`Something gone wrong: \n${err}`);
                uploadFileReponse.response.push(err);
                return uploadFileReponse;
            }
        });
    }
    getAuth(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAuthReponse = { status: 400, response: [] };
            yield (0, auth_1.signInWithEmailAndPassword)(this.auth, email, password)
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
        });
    }
}
exports.FirebaseRepository = FirebaseRepository;
