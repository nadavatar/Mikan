import './style.scss';
import { getMembers, handleAddMember, showAddMemberForm } from './main';


window.onload = () => {
	getMembers();
	document.getElementById('addMember').addEventListener('click', showAddMemberForm);
	document.getElementById('addMemberButton').addEventListener('click', handleAddMember);
}
