const usersURI = "http://localhost:8000/users";

function refreshTable() {
	let rows = getData(usersURI);
	rows.then(data => {
		let context = {users: data};
		const compiledHTML = users_template(context);
		document.getElementById("usertable").innerHTML = compiledHTML;
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
	column: "Name",
	direction: "Asc",
}
const sortByEl = document.getElementById("sortby");

function updateSortByEl(sort) {
	sortByEl.innerHTML = `Sorting by ${sort.column} ${sort.direction}`;
}

function setupSorting() {
	let sort_cols = document.getElementsByClassName("sortcol");
	// None of the following works
	for (var el of sort_cols) {
		console.log("off");
	};
	[].forEach.call(sort_cols, function(el) {
		console.log("out");
	});
	for (var i=0; i<sort_cols.length; i++) {
		console.log("over");
	};
}

function main() {
	refreshTable();
	setupSorting();
	updateSortByEl(current_sort);
}

let users_template = Handlebars.compile(document.getElementById("usertemplate").innerHTML);

main();
