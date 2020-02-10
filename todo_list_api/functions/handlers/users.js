const { admin, db } = require("../utils/admin");

const config = require("../utils/config");

const firebase = require("firebase").initializeApp(config);

const {
  validateSignupData,
  validateLoginData
} = require("../utils/validators");

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  const noImg = "no-img.png";

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already is use" });
      } else {
        return res
          .status(500)
          .json({ general: "Something went wrong, please try again" });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) {
    return res.status(400).json(errors);
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json(token);
    })
    .catch(err => {
      console.error(err);
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again." });
    });
};
exports.fetchUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.params.userHandle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("blobs")
          .where("userHandle", "==", req.params.userHandle)
          .orderBy("postedAt", "desc")
          .get();
      } else {
        return res.status(404).json({ message: "User not found!" });
      }
    })
    .then(data => {
      userData.blobs = [];
      data.forEach(doc => {
        userData.blobs.push({
          userHandle: doc.data().userHandle,
          userImage: doc.data().userImage,
          body: doc.data().body,
          postedAt: doc.data().postedAt,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          blobId: doc.id
        });
      });
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json(err);
    });
};