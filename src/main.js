
                
const memberHtmlTemplate = `
                <tr>
                <td><input type="checkbox" class="checkthis" /></td>
                <td>{{namePlaceholder}}</td>
                <td>{{statusPlaceHolder}}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
                </tr>
`;
let statusDictionary = {"TEAM":"בצוות", "OUT": "יצאתי לכמה דקות", "VACATION": "בחופש", "DUTY": "בתורנות", "MEETING": "בפגישה"};
let members = [{name: "nadav", status: "OUT"},{name: "Ron", status: "VACATION"},{name: "Salima", status: "DUTY"}];


// let tableBodyRef = document.getElementById('mytable').getElementsByTagName('tbody')[0];

const tableRowTemplate = members.reduce((acc, currMember) => {
    return acc += memberHtmlTemplate.replace('{{namePlaceholder}}', currMember.name).replace('{{statusPlaceHolder}}', statusDictionary[currMember.status]);
}, '');
document.getElementById('tBodyContainer').innerHTML = tableRowTemplate;
