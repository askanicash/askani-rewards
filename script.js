```javascript
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const auth = window.firebaseAuth;
const db = window.firebaseDb;

let points = 0;
let currentUser = null;

async function loadPoints(uid) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    points = snap.data().points || 0;
  } else {
    points = 0;
    await setDoc(userRef, {
      points: 0,
      createdAt: Date.now()
    });
  }

  document.getElementById("points").innerText = points;
}

window.registerUser = async function () {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registration Successful");
  } catch (e) {
    alert(e.message);
  }
};

window.loginUser = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful");
  } catch (e) {
    alert(e.message);
  }
};

window.logoutUser = async function () {
  await signOut(auth);
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;

    document.getElementById("userInfo").innerText =
      "Logged in: " + user.email;

    await loadPoints(user.uid);

  } else {
    currentUser = null;

    document.getElementById("userInfo").innerText =
      "Not Logged In";

    document.getElementById("points").innerText = 0;
  }
});

window.claimTask = async function (taskId, reward) {

  if (!currentUser) {
    alert("Please Login First");
    return;
  }

  points += reward;

  document.getElementById("points").innerText = points;

  await setDoc(
    doc(db, "users", currentUser.uid),
    { points: points },
    { merge: true }
  );

  alert("+" + reward + " Points Added");
};

window.withdrawRequest = async function () {

  if (!currentUser) {
    alert("Please Login First");
    return;
  }

  if (points < 100) {
    alert("Minimum 100 Points Required");
    return;
  }

  const method =
    document.getElementById("method").value;

  const account =
    document.getElementById("account").value;

  await addDoc(collection(db, "withdrawals"), {
    uid: currentUser.uid,
    email: currentUser.email,
    method: method,
    account: account,
    points: points,
    createdAt: Date.now()
  });

  alert("Withdrawal Request Submitted");
};
```
