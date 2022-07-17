const auth = require("../firebase/auth");
const fetch = require("../firebase/firestore");

const getUsers = async () => {
  const authData = await auth();
  const usersDB = await fetch("users");

  let usersData = [];

  authData.forEach((user) => {
    for (let i = 0; i < usersDB.length; i++) {
      if (user.uid === usersDB[i].data.uid && user.email === usersDB[i].data.email) {
        usersData.push({ user: user, data: usersDB[i] });
      }
    }
  });

  console.log(usersData);
  return usersData;
};


const createUsers = async () => {
  const authData = await auth();
  const usersDB = await fetch("users");

  let usersData = [];

  authData.forEach((user) => {
    for (let i = 0; i < usersDB.length; i++) {
      if (user.uid === usersDB[i].data.uid && user.email === usersDB[i].data.email) {
        usersData.push({ user: user, data: usersDB[i] });
      }
    }
  });

  console.log(usersData);
  return usersData;
};

module.exports = getUsers