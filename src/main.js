let status = 'team';
let members = [];

let statusDictionary = {"TEAM":"בצוות", "OUT": "יצאתי לכמה דקות", "VACATION": "בחופש", "DUTY": "בתורנות", "MEETING": "בפגישה"};

const memberHtmlTemplate = `
<p><b>{{namePlaceholder}}: </b>  <small>{{statusPlaceholder}}</small></p>
`;


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
    const name = document.getElementById('memberName').value;
    const status = document.getElementById('memberStatus').value
    
    addMember(name, status)
    .then(msg => {
        console.log('member added');
        getMembers();
    })
    .catch(err => console.error(error));
}


function showAddMemberForm() {
    document.getElementById('addMember').style.display = 'none';
    
    document.getElementById('addMemberForm').style.display = 'block';
}

function renderMembers(members) {
    const membersContainer = document.getElementById('members-container');

    membersContainer.innerHTML = ''

    members.forEach(member => {
        membersContainer.innerHTML += memberHtmlTemplate.replace('{{namePlaceholder}}', member.name).replace('{{statusPlaceholder}}', statusDictionary[member.status]);         
    });
}
