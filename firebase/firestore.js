const { response } = require("express");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const app = require("./firebaseinit");

// Initialize Firestore App
const db = getFirestore(app);

// Fetch data by collection
const fetchData = async (col) => {
  let data = [];
  const snapshot = await db.collection(col).get();
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, data: doc.data() });
  });
  return data;
};

// Fetch data by collection
const addData = async (col, data, docID) => {
  let res;

  if (docID) {
    await db
      .collection(col)
      .doc(docID)
      .set({ ...data })
      .then(() => {
        res = { code: 200, message: `Data created!` };
      })
      .catch((error) => {
        res = { code: 500, message: `Error fetching user data: ${error}` };
      });
  } else {
    await db
      .collection(col)
      .doc()
      .set({ ...data })
      .then(() => {
        res = { code: 200, message: `Data created!` };
      })
      .catch((error) => {
        res = { code: 500, message: `Error fetching user data: ${error}` };
      });
  }

  return res;
};

// Export
module.exports = fetchData;
module.exports = { fetchData: fetchData, addData: addData };
