let members = [];
                
const memberHtmlTemplate = `
                <tr>
                <td><input type="checkbox" class="checkthis" /></td>
                <td>{{namePlaceholder}}</td>
                <td>{{statusPlaceHolder}}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                </tr>
`;
const statusDictionary = {"TEAM":"בצוות", "OUT": "יצאתי לכמה דקות", "VACATION": "בחופש", "DUTY": "בתורנות", "MEETING": "בפגישה"};

window.onload = () => {
    getMembers();


    document.getElementById('addMember').addEventListener('click', showAddMemberForm);
    document.getElementById('addMember').addEventListener('click', handleAddMember);
    
}

function getMembers() {
    getAllMembers()
    .then(members => {
        
        renderMembers(members);
    })
    .catch(error => console.error(error));
}


function handleAddMember(e) {

    //let name = document.getElementById('memberName').value;
    //let status = document.getElementById('memberStatus').value;
    document.getElementById('addMemberButton').addEventListener('click', addMemberButton(document.getElementById('memberName').value, document.getElementById('memberStatus').value));

  /*  if (name.length > 0) {
       addMember(name, status)
       .then(msg => {
           console.log('member added');
           getMembers();
       })
       .catch(err => console.error(error));
    }
    */
}

function addMemberButton(name, status){
    
}

function showAddMemberForm() {
    document.getElementById('addMember').style.display = 'none';
    
    document.getElementById('addMemberForm').style.display = 'block';
}

function renderMembers(members) {
    const membersContainer = document.getElementById('tBodyContainer');

    membersContainer.innerHTML = ''

    members.forEach(member => {
        membersContainer.innerHTML += memberHtmlTemplate.replace('{{namePlaceholder}}', member.name).replace('{{statusPlaceHolder}}', statusDictionary[member.status]);         
    });
}


//The acc sums all the members and after that it adds it into the table
const tableRowTemplate = members.reduce((acc, currMember) => {
    return acc += memberHtmlTemplate.replace('{{namePlaceholder}}', currMember.name).replace('{{statusPlaceHolder}}', statusDictionary[currMember.status]);
}, '');
document.getElementById('tBodyContainer').innerHTML = tableRowTemplate;
