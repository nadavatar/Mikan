let members = getAllMembers();

console.log(members);

const memberHtmlTemplate = `
                <tr>
                <td>{{namePlaceholder}}</td>
                <td>{{statusPlaceHolder}}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
				<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button onclick="findMemberName({{indexPlaceHolder}})" class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
				<div id="{{indexPlaceHolder}}"></div>
                </tr>
`;

const statusDictionary = {
	"TEAM": "בצוות",
	"OUT": "יצאתי לכמה דקות",
	"VACATION": "בחופש",
	"DUTY": "בתורנות",
	"MEETING": "בפגישה"
};

window.onload = () => {
	getMembers();
	document.getElementById('addMember').addEventListener('click', showAddMemberForm);
	document.getElementById('addMemberButton').addEventListener('click', handleAddMember);
}

function getMembers() {
	getAllMembers()
		.then(members => {
			renderMembers(members);
		})
		.then(members => {
			return members;
		})
		.catch(error => console.error(error));
}

function handleAddMember(e) {

	const name = document.getElementById('memberName').value;
	const status = document.getElementById('memberStatus').value;

	if (name.length > 0) {
		addMemberToDb(name, status)
			.then(msg => {
				console.log('member added');
				getMembers();
				document.getElementById('addMemberForm').style.display = 'none';
				document.getElementById('addMember').style.display = 'block';
			})
			.catch(err => console.error(error));
	}
}

function showAddMemberForm() {
	document.getElementById('addMember').style.display = 'none';
	document.getElementById('addMemberForm').style.display = 'block';
}

function renderMembers(members) {
	const membersContainer = document.getElementById('tBodyContainer');

	membersContainer.innerHTML = '';

	for (let index = 0; index < members.length; index++){
		member = members[index];
		membersContainer.innerHTML += memberHtmlTemplate.replace('{{namePlaceholder}}', member.name).replace('{{statusPlaceHolder}}', statusDictionary[member.status]).replace('{{indexPlaceHolder}}', index);
	}
}

