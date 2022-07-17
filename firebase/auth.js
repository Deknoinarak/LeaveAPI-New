const app = require("./firebaseinit");
const auth = require("firebase-admin/auth");

const getUsers = async () => {
  let response;

  await auth
    .getAuth(app)
    .listUsers(1000)
    .then((listUsersResult) => {
      let users = [];
      listUsersResult.users.forEach((userRecord) => {
        users.push(userRecord.toJSON());
      });
      response = users;
    })
    .catch((error) => {
      response = { code: 500, message: `Error fetching user data: ${error}` };
    });

  return response;
};

const createUsers = async (data) => {
  let response;

  await auth
    .getAuth(app)
    .createUser({
      email: data.email,
      emailVerified: false,
      password: data.password,
      displayName: data.displayName,
      photoURL: data.avatar,
      disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch((error) => {
      console.log("Error creating new user:", error);
    });

  return response;
};

module.exports = getUsers;
module.exports = { getUsers: getUsers, createUsers: createUsers };
