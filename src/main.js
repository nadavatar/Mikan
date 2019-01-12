let status = 'inTheTeam';
let members = [];

let statusDictionary = {"team":"בצוות", "outForFewMinutes": "יצאתי לכמה דקות", "vacation": "בחופש", "duty": "בתורנות", "meeting": "בפגישה"};

const memberHtmlTemplate = `
<p>Location of {{namePlaceholder}}</p>
<small>{{statusPlaceholder}}</small>
`;

function changeStatus(x) {
    status = x.value;
    console.log(status);
}