let members = getAllMembers();

const memberHtmlTemplate = `
                <tr class="normal">
					<td>
						<span class="normal">{{namePlaceholder}}</span>
						<span class="edit"><input id="placeholderName" type="text" value="" /></span>
					</td>
					<td>
						<span class="normal">{{statusPlaceHolder}}</span>
						<span class="edit">
							<select name="status" id="memberStatus-{{indexPlaceHolder}}">
								<option value="TEAM">בצוות</option>
								<option value="MEETING">בפגישה</option>
								<option value="VACATION">בחופש</option>
								<option value="DUTY">בתורנות</option>
								<option value="OUT">יצאתי לכמה דקות</option>
							</select>
						</span>
					</td>
					<td>
						<span class="normal">
							<p class="normal" data-placement="top" data-toggle="tooltip" title="Edit"><button onclick="toggleEditMode({{indexPlaceHolder}})" class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></button></p>
						</span>
						<span class="edit">
							<i class="clickable glyphicon glyphicon-check edit-element" onclick="updateMember()"></i>	
						</span>
					</td>
					<td>
						<p class="normal" data-placement="top" data-toggle="tooltip" title="Delete">
							<button onclick="findMemberName({{indexPlaceHolder}})" class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" >
								<span class="glyphicon glyphicon-trash">
								</span>
							</button>
						</p>
						<span class="edit">
						</span>
					</td>
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

function renderMembers(members = []) {
	const membersContainer = document.getElementById('tBodyContainer');

<<<<<<< HEAD
    members.forEach(member => {
        membersContainer.innerHTML += memberHtmlTemplate.replace('{{namePlaceholder}}', member.name).replace('{{statusPlaceholder}}', statusDictionary[member.status]);         
    });
}
=======
	membersContainer.innerHTML = '';

	for (let index = 0; index < members.length; index++) {
		member = members[index];
		membersContainer.innerHTML += memberHtmlTemplate
			.replace(/{{namePlaceholder}}/g, member.name)
			.replace(/{{statusPlaceHolder}}/g, statusDictionary[member.status])
			.replace(/{{indexPlaceHolder}}/g, index);
	}
}
>>>>>>> 6dbfaeb450b68e6e04a49ed5e7d00d498f91a035
