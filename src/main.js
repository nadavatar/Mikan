let status = 'team';
let members = [];

let statusDictionary = {"team":"בצוות", "outForFewMinutes": "יצאתי לכמה דקות", "vacation": "בחופש", "duty": "בתורנות", "meeting": "בפגישה"};

const memberHtmlTemplate = `
<p>Location of {{namePlaceholder}}</p>
<small>{{statusPlaceholder}}</small>
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
}