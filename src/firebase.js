// Initialize Firebase
var config = {
  apiKey: "AIzaSyCbQJDzonsTfgUz1IEwDxYSvfxMdw6PHGE",
  authDomain: "mikan-dev-d2b71.firebaseapp.com",
  databaseURL: "https://mikan-dev-d2b71.firebaseio.com",
  projectId: "mikan-dev-d2b71",
  storageBucket: "mikan-dev-d2b71.appspot.com",
  messagingSenderId: "789702102796"
};

firebase.initializeApp(config);

var db = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);


function removeMember(name) {
  let collectionRef = fs.collection(members);
      collectionRef.where("name", "==", name)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            console.log("Document successfully deleted!");
          }).catch(function(error) {
            console.error("Error removing document: ", error);
          });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    renderMembers(getAllMembers());

}


function addMemberToDb(name, status) {
  return new Promise((resolve, reject) => {
    db.collection("members").add({
        name,
        status,
      })
      .then(function (docRef) {
        resolve("Document written with ID: " + docRef.id);
        members = getMembers();
        renderMembers(members);
      })
      .catch(function (error) {
        reject("Error adding document: " + error);
      });
  });
}

function getAllMembers() {
  return new Promise((resolve, reject) => {

    db.collection("members").get()
      .then((querySnapshot) => {
        const members = [];
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data().status}`);
          member = {
            name: doc.data().name,
            status: doc.data().status
          }
          members.push(member);
        });
        resolve(members);

      })
      .catch(error => reject(error));

    // resolve(members);
  })
}