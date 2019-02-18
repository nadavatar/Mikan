import {initializeApp, firestore} from 'firebase';
import { renderMembers, getMembers } from './main';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCbQJDzonsTfgUz1IEwDxYSvfxMdw6PHGE",
  authDomain: "mikan-dev-d2b71.firebaseapp.com",
  databaseURL: "https://mikan-dev-d2b71.firebaseio.com",
  projectId: "mikan-dev-d2b71",
  storageBucket: "mikan-dev-d2b71.appspot.com",
  messagingSenderId: "789702102796"
};

initializeApp(config);

var db = firestore();


async function removeMember(name) {
  const collectionRef = db.collection("members");
  const querySnapshot = await collectionRef.where("name", "==", name)
    .get();
  
  querySnapshot.forEach(async doc => {
    try {
      await doc.ref.delete();
      console.log("Document successfully deleted!");
      renderMembers(await getAllMembers());
    } catch (error) {
      console.error("Error removing document: ", error);
      renderMembers(await getMembers());
    }
  });
  
}

export function addMemberToDb(name, status) {
  return new Promise((resolve, reject) => {
    db.collection("members").add({
        name,
        status,
      })
      .then(function (docRef) {
        resolve("Document written with ID: " + docRef.id);
        const members = getMembers();
        renderMembers(members as any);
      })
      .catch(function (error) {
        reject("Error adding document: " + error);
      });
  });
}

export async function getAllMembers() {
  try {
    const querySnapshot = await db.collection("members").get();
      
    const members = [];
    querySnapshot.forEach((doc) => {
      const member = {
        name: doc.data().name,
        status: doc.data().status
      }
      members.push(member);
    })
    return members;
  } catch (error) {
    throw error;
  }
}

function findMemberName(index) {
  db.collection("members").get()
    .then((querySnapshot) => {
      const members = [];
      querySnapshot.forEach((doc) => {
        const member = {
          name: doc.data().name,
          status: doc.data().status
        }
        members.push(member);
      })
      const name = members[index].name;
      removeMember(name);

    })
}

export function updateMember(name,status) {
  console.log(name, status);
}
