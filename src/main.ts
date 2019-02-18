import {getAllMembers, addMemberToDb, updateMember} from './firebase';

let members = getAllMembers();

const memberHtmlTemplate = `
<tr class="normal member-row-{{idPlaceholder}}">
	<td>
		<span class="normal member-name-{{idPlaceholder}}">{{namePlaceholder}}</span>
		<span class="edit"><input id="placeholderName-{{idPlaceholder}}" type="text" value="{{namePlaceholder}}" /></span>
	</td>
	<td>
		<span data-status-value="{{statusValuePlaceHolder}}" class="normal member-status-value-{{idPlaceholder}}">{{statusPlaceHolder}}</span>
		<span class="edit">
			<select name="status" id="memberStatus-{{idPlaceholder}}" >
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
			<p class="normal" data-placement="top" data-toggle="tooltip" title="Edit"><button onclick="toggleEditMode('{{idPlaceholder}}')" class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></button></p>
		</span>
		<span class="edit edit-submit-{{idPlaceholder}}">
			<i class="clickable glyphicon glyphicon-check edit-element"></i>	
		</span>
	</td>
	<td>
		<p class="normal" data-placement="top" data-toggle="tooltip" title="Delete">
			<button onclick="findMemberName('{{idPlaceholder}}')" class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" >
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



export async function getMembers() {
	try {
		const members = await getAllMembers();
		renderMembers(members as any);
		return members;
		
	} catch (error) {
		console.error(`Error in getMembers: ${error}`)
		throw error;	
	}
		

}

export function handleAddMember(e) {

	const name = (document.getElementById('memberName') as any).value;
	const status = (document.getElementById('memberStatus') as any).value;

	if (name.length > 0) {
		addMemberToDb(name, status)
			.then(msg => {
				console.log('member added');
				getMembers();
				document.getElementById('addMemberForm').style.display = 'none';
				document.getElementById('addMember').style.display = 'block';
			})
			.catch(err => console.error(err));
	}
}

export function showAddMemberForm() {
	document.getElementById('addMember').style.display = 'none';
	document.getElementById('addMemberForm').style.display = 'block';
}

export function renderMembers(members = []) {
	const membersContainer = document.getElementById('tBodyContainer');

	membersContainer.innerHTML = '';

	for (let index = 0; index < members.length; index++) {
		const member = members[index];
		membersContainer.innerHTML += memberHtmlTemplate
			.replace(/{{namePlaceholder}}/g, member.name)
			.replace(/{{statusPlaceHolder}}/g, statusDictionary[member.status])
			.replace(/{{statusValuePlaceHolder}}/g, member.status)
			.replace(/{{idPlaceholder}}/g, member.id);
	}
}


function toggleEditMode(id) {
	document.querySelector('.member-row-' + id).classList.replace('normal', 'edit');
	
	document.querySelector('.edit-submit-' + id)
		.addEventListener('click', async () => {
			const status = (document.querySelector(`#memberStatus-${id}`) as any).value;
			const name = (document.querySelector(`#placeholderName-${id}`) as any).value;
			await updateMember({ id, name, status });
			document.querySelector('.member-row-' + id).classList.replace('edit', 'normal');
			renderMembers(await getMembers());

			
	});
}
window.toggleEditMode = toggleEditMode;

