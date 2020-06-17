const usersURI = "http://localhost:8000/users";

function refreshTable() {
	let rows = getData(usersURI);
	rows.then(data => {
		let context = {users: data};
		const users_template = Handlebars.compile(document.getElementById("usertemplate").innerHTML);
		const compiledHTML = users_template(context);
		document.getElementById("userentries").innerHTML = compiledHTML;
	});
}

const add_button = document.getElementById("addtodb");
add_button.onclick = event => {
	const formEls = document.getElementsByClassName("formfield");
	postData(usersURI, formToJSON(formEls))
	.then(data => {
		refreshTable()
	});
}

const current_sort = {
	column: "name",
	direction: "Asc",
}
const sortByEl = document.getElementById("sortby");

function updateSortByEl(sort) {
	sortByEl.innerHTML = `Sorting by ${sort.column} ${sort.direction}`;
}

function setupSorting() {
	let sort_cols = document.getElementsByClassName("sortcol");
	for (var el of sort_cols) {
		el.onclick = event => {
			if (current_sort.column === event.target.id) {
				current_sort.direction = current_sort.direction === "Asc" ? "Desc": "Asc";
			} else {
				current_sort.direction = "Asc";
				current_sort.column = event.target.id;
			}
			updateSortByEl(current_sort);
			refreshTable();
		}
	};
}

function main() {
	setupSorting();
	updateSortByEl(current_sort);
	refreshTable();
}

let users_template = Handlebars.compile(document.getElementById("usertemplate").innerHTML);

main();
