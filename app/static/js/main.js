
const usersURI = "http://localhost:8000/users";

let data = [
 {
 	name: "Charlie",
 	birth: "01-01-1956",
 	email: "charlie@angels.com",
 	children: 0
 },
 {
 	name: "Jill",
 	birth: "02-02-1962",
 	email: "jill@angels.com",
 	children: 1
 }
];

function refreshTable() {
	let context = {users: data};
	const users_template = Handlebars.compile(document.getElementById("usertemplate").innerHTML);
	const compiledHTML = users_template(context);
	document.getElementById("userentries").innerHTML = compiledHTML;
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
		el.onclick = event => {
			console.log();
			if (current_sort.column === event.target.id) {
				current_sort.direction = current_sort.direction === "Asc" ? "Desc": "Asc";
				console.log(current_sort.direction);
			} else {
				current_sort.direction = "Asc";
				current_sort.column = event.target.id;
				console.log(current_sort.column);
			}
			updateSortByEl(current_sort);
			refreshTable();
		}
	};
	// [].forEach.call(sort_cols, function(el) {
	// 	console.log("out");
	// });
	// for (var i=0; i<sort_cols.length; i++) {
	// 	console.log("over");
	// };
}

function main() {
	refreshTable();
	setupSorting();
	updateSortByEl(current_sort);
}

main();
