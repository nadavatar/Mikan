let status = 'inTheTeam';
let members = []

const memberHtmlTemplate = `
<p>Location of {{namePlaceholder}}</p>
<small>{{statusPlaceholder}}</small>
`

console.log(member);

function changeStatus(x) {
    status = x.value;
    console.log(status);
}