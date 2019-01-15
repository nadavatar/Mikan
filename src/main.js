let status = 'team';
let members = [];

let statusDictionary = {"team":"בצוות", "outForFewMinutes": "יצאתי לכמה דקות", "vacation": "בחופש", "duty": "בתורנות", "meeting": "בפגישה"};

const memberHtmlTemplate = `
<p><b>{{namePlaceholder}}: </b>  <small>{{statusPlaceholder}}</small></p>
`;

dummyMember = {
    "name" : "Nadav",
    "status": status
}

console.log(status);

function changeStatus() {
    let selection = document.getElementById('selection');
    selectionValue = selection.value;
    console.log(selectionValue);
    dummyMember.status = selectionValue;
    console.log(dummyMember);
    console.log(statusDictionary.outForFewMinutes);
}


window.onload = () => {
    getAllMembers()
    .then(members => {
        // renderMembers(members);
        console.log(members);
        renderMembers(members);
    })
    .catch(error => console.error(error))
}

function renderMembers(members) {
    const membersContainer = document.getElementById('members-container');

    membersContainer.innerHTML = ''

    members.forEach(member => {
        membersContainer.innerHTML += memberHtmlTemplate.replace('{{namePlaceholder}}', member.name).replace('{{statusPlaceholder}}', member.status);         
    });
}

