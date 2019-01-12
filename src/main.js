let status = 'inTheTeam';
let member = {
    "name": "Nadav",
    "status": status
}

console.log(member);

function changeStatus(x) {
    status = x.value;
    console.log(status);
}