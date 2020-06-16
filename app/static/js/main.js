const usersURI = "http://localhost:8000/users";

const add_button = document.getElementById("addtodb");
add_button.onclick = event => {
	const formEls = document.getElementsByClassName("formfield");
	// console.log(formToJSON(formEls));
	postData(usersURI, formToJSON(formEls))
	.then(data => {
		console.log(data); // JSON data parsed by `response.json()` call
	});
}

const current_sort = {
	column: "Name",
	direction: "Asc",
}
const sortByEl = document.getElementById("sortby");

function updateSortByEl(sort) {
	sortByEl.innerHTML = `Sorting by ${sort.column} ${sort.direction}`;
}

function refreshTable() {
	let users_template = Handlebars.compile(document.getElementById("usertemplate").innerHTML);
	let rows = getData(usersURI);
	console.log(rows);
	let context = {users: rows};
	const compiledHTML = users_template(context);
	console.log(compiledHTML);
	document.getElementById("usertable").innerHTML = compiledHTML;
}

function main() {
	updateSortByEl(current_sort);
	refreshTable();
}



main();
