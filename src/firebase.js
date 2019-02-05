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
      collectionRef = db.collection("members");
      collectionRef.where("name", "==", name)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            console.log("Document successfully deleted!");
            renderMembers(getMembers());
          }).catch(function(error) {
            console.error("Error removing document: ", error);
            renderMembers(getMembers());
          });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        renderMembers(getMembers());
      });
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
          member = {
            name: doc.data().name,
            status: doc.data().status
          }
          members.push(member);
        })
        resolve(members);

      })
      .catch(error => reject(error));

    // resolve(members);
  })
}

function findMemberName(index){
	db.collection("members").get()
      .then((querySnapshot) => {
        const members = [];
        querySnapshot.forEach((doc) => {
          member = {
            name: doc.data().name,
            status: doc.data().status
          }
          members.push(member);
        })
        name = members[index].name;
          removeMember(name);
        
      })
    }

function toggleEditMode(index) {
    let membersInHtml = document.getElementById('tBodyContainer');
    let row = membersInHtml.getElementsByTagName('tr')[index];
    let rowName = row.getElementsByTagName('td')[0];
    let rowNameValue = rowName.textContent;
    let rowStatus = row.getElementsByTagName('td')[1];
    let rowEditButton = row.getElementsByTagName('td')[2];
    let rowDeleteButton = row.getElementsByTagName('td')[3];
    
    let input = '<td><input class="sticky-content-input form-control edit-element" value="Enter the member`s name..." style="display:none"/></td>';
    let updatestatus = '<select name="status" id="memberStatus"><option value="TEAM">בצוות</option><option value="MEETING">בפגישה</option><option value="VACATION">בחופש</option><option value="VACATION">בחופש</option><option value="OUT">יצאתי לכמה דקות</option></select>';
		let updateButton = '<td><i class="clickable glyphicon glyphicon-check edit-element" style="display: none" onclick="updateMember()></i></td>';
    
    var tmpObj=document.createElement("input");
    tmpObj.innerHTML='<!--THIS DATA SHOULD BE REPLACED-->';
    ObjParent=rowName.parentNode; //Okey, element should be parented
    ObjParent.replaceChild(tmpObj,rowName); //here we placing our temporary data instead of our target, so we can find it then and replace it into whatever we want to replace to
    ObjParent.innerHTML=ObjParent.innerHTML.replace('<input><!--THIS DATA SHOULD BE REPLACED--></input>',input);
    
    //var tmpObj2=document.createElement("input");
    //tmpObj2.innerHTML='<!--THIS DATA SHOULD BE REPLACED-->';
    //ObjParent=rowName.parentNode; //Okey, element should be parented
    //ObjParent.replaceChild(tmpObj,rowName); //here we placing our temporary data instead of our target, so we can find it then and replace it into whatever we want to replace to
    //ObjParent.innerHTML=ObjParent.innerHTML.replace('<input><!--THIS DATA SHOULD BE REPLACED--></input>',input);
    
    rowEditButton.style.display = 'none';
    rowDeleteButton.style.display = 'none';


}
    
function updateMember() {

}